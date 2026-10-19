"""Lógica reutilizable de análisis y procesamiento de texto.

- No depende de FastAPI: fácil de testear/ajustar.
- Devuelve objetos dict/list que mapeamos a los modelos Pydantic.
"""
import re
from collections import Counter
from dataclasses import dataclass
from typing import Literal

from app.config import settings


SPANISH_QUESTIONS = re.compile(r"¿\s*[^?]+\?\s*$")
WH_QUESTION = re.compile(r"^(qué|que|cuál|cual|cómo|como|cuándo|cuando|dónde|donde|por qué|por que|para qué|para que|quién|quien|cuanto|cuántos|cuantas)\b", re.IGNORECASE)


def tokenize(text: str) -> list[str]:
    # Separa por espacios, conserva palabras alfanuméricas y acentos
    tokens = re.findall(r"[^\W\d]+(?:['´-][^\W\d]+)*", text.lower(), re.UNICODE)
    return tokens


def stopwords_removed_tokens(text: str) -> list[str]:
    tokens = tokenize(text)
    return [t for t in tokens if t not in settings.stop_words]


def count_sentences(text: str) -> int:
    # Cuenta terminadores . ! ? respetando acentos y paréntesis
    parts = re.split(r"[.!?]+", text)
    count = 0
    for p in parts:
        if p.strip():
            count += 1
    return count or 1


def avg_word_length(text: str) -> float:
    tokens = tokenize(text)
    if not tokens:
        return 0.0
    total = sum(len(t) for t in tokens)
    return round(total / len(tokens), 2)


def detect_language(text: str) -> tuple[Literal["es", "en", "desconocido"], float]:
    tokens = tokenize(text)
    if not tokens:
        return "desconocido", 0.0

    es_hits = 0
    en_hits = 0
    for t in tokens[:30]:  # chequea primeras palabras
        if t in ES_MARKERS:
            es_hits += 1
        if t in EN_MARKERS:
            en_hits += 1

    if es_hits > en_hits and es_hits > 0:
        conf = round(min(1.0, es_hits / max(1, len(tokens[:30]))), 2)
        return "es", conf
    if en_hits > es_hits and en_hits > 0:
        conf = round(min(1.0, en_hits / max(1, len(tokens[:30]))), 2)
        return "en", conf
    return "desconocido", 0.0


ES_MARKERS = {"hola", "gracias", "por favor", "cafe", "café", "cómo", "como", "cuál", "donde", "dónde", "que", "qué", "ayuda"}
EN_MARKERS = {"hello", "thanks", "thank you", "coffee", "how", "what", "where", "which", "help", "please"}


def classify_intent(text: str) -> tuple[Literal["saludo", "pregunta", "comando", "agradecimiento", "despedida", "otro"], float, list[str]]:
    text_low = text.lower()
    signals: list[str] = []
    lang, _ = detect_language(text)

    # Despedida
    if any(w in text_low for w in ("adiós", "adios", "hasta luego", "nos vemos", "bye", "goodbye")):
        signals.append("despedida explícita")
        return "despedida", 0.95, signals

    # Agradecimiento
    if any(w in text_low for w in ("gracias", "muchas gracias", "thanks", "thank you")):
        signals.append("expresión de gratitud")
        return "agradecimiento", 0.95, signals

    # Saludo
    if any(w in text_low for w in ("hola", "buenos días", "buen dia", "buenas tardes", "buenas noches", "hello", "hi", "hey")):
        signals.append("saludo explícito")
        # puede ser también pregunta
        if SPANISH_QUESTIONS.search(text) or WH_QUESTION.search(text_low):
            signals.append("forma interrogativa")
            return "pregunta", 0.95, signals
        return "saludo", 0.95, signals

    # Comando (imperativo/verbos iniciales)
    if re.match(r"^(ayuda|explica|muestra|list|lista|dame|describe|compara|analiza|crea|genera|generar)\b", text_low):
        signals.append("verbo en forma imperativa/solicitante")
        return "comando", 0.95, signals

    # Pregunta
    if "?" in text:
        signals.append("contiene signo de interrogación")
        return "pregunta", 0.95, signals
    if SPANISH_QUESTIONS.search(text) or WH_QUESTION.search(text_low):
        signals.append("palabras interrogativas")
        return "pregunta", 0.9, signals

    signals.append("sin patrón claro")
    return "otro", 0.5, signals


def risk_analysis(text: str) -> tuple[Literal["bajo", "medio", "alto"], int, list[str]]:
    flags: list[str] = []
    score = 0
    low = text.lower()

    # Patrones sensibles (informativos, no bloqueantes — solo para evaluación)
    sensitive_patterns = {
        r"credenciales|password|contraseña|token|api key": 15,
        r"email privado|teléfono|telefono|dni|curp": 10,
        r"injec|prompt injection|role override|system:": 25,
        r"ignore previous|ignore all instructions|disregard": 25,
        r"sql|drop table|delete from|script|malware|virus": 20,
    }
    for pattern, pts in sensitive_patterns.items():
        if re.search(pattern, low):
            flags.append(f"Detectado patrón relacionado a '{pattern.split('|')[0]}'")
            score += pts

    # Longitud excesiva o vacía no aplica (ya validado)
    if score >= settings.risk_threshold_high:
        level = "alto"
    elif score >= settings.risk_threshold_medium:
        level = "medio"
    else:
        level = "bajo"
        if not flags:
            flags = []

    return level, min(100, score), flags


def top_keywords(text: str, n: int, remove_stopwords: bool = True) -> list[str]:
    tokens = stopwords_removed_tokens(text) if remove_stopwords else tokenize(text)
    if not tokens:
        return []
    counter = Counter(tokens)
    return [kw for kw, _ in counter.most_common(n)]


def extract_summary(text: str, n_sentences: int = 2) -> str | None:
    if n_sentences <= 0:
        return None
    parts = re.split(r"(?<=[.!?])\s+", text.strip())
    parts = [p.strip() for p in parts if p.strip()]
    if not parts:
        return None
    return ". ".join(parts[:n_sentences]).rstrip(" ") + ("." if parts[0][-1] not in ".!?" else "")


@dataclass(slots=True, frozen=True)
class TextStatsResult:
    characters: int
    words: int
    sentences: int
    avg_word_length: float
    stopwords_removed: int


def compute_text_stats(text: str, remove_stopwords: bool = False) -> TextStatsResult:
    chars = len(text)
    tokens_all = tokenize(text)
    tokens_clean = [t for t in tokens_all if t not in settings.stop_words]
    stop_removed = max(0, len(tokens_all) - len(tokens_clean)) if remove_stopwords else 0
    words = len(tokens_clean) if remove_stopwords else len(tokens_all)
    sentences = count_sentences(text)
    avg = avg_word_length(text)
    return TextStatsResult(
        characters=chars,
        words=words,
        sentences=sentences,
        avg_word_length=avg,
        stopwords_removed=stop_removed if remove_stopwords else 0,
    )
