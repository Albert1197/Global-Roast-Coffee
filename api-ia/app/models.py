"""Esquemas Pydantic: entradas validadas y salidas documentadas de la API."""
from typing import Literal

from pydantic import BaseModel, Field, field_validator

from app.config import settings


# ---------------------------------------------------------------------------
# Salidas compartidas
# ---------------------------------------------------------------------------
class Stats(BaseModel):
    characters: int = Field(description="Cantidad de caracteres del texto")
    words: int = Field(description="Cantidad de palabras")
    sentences: int = Field(description="Cantidad de oraciones")
    avg_word_length: float = Field(description="Longitud promedio de las palabras")


class Language(BaseModel):
    detected: Literal["es", "en", "desconocido"]
    confidence: float = Field(ge=0, le=1, description="Confianza de la detección (0 a 1)")


class Intent(BaseModel):
    label: Literal["saludo", "pregunta", "comando", "agradecimiento", "despedida", "otro"]
    confidence: float = Field(ge=0, le=1)
    signals: list[str] = Field(description="Señales que dispararon la clasificación")


class Risk(BaseModel):
    level: Literal["bajo", "medio", "alto"]
    score: int = Field(ge=0, le=100)
    flags: list[str] = Field(description="Banderas de riesgo detectadas, vacías si no hay ninguna")


class Recommendation(BaseModel):
    message: str
    safe_to_process: bool


# ---------------------------------------------------------------------------
# POST /api/prompts/analyze
# ---------------------------------------------------------------------------
class AnalyzePromptRequest(BaseModel):
    text: str = Field(
        min_length=1,
        max_length=settings.max_prompt_length,
        description="Prompt o mensaje de usuario a analizar",
        examples=["¿Cómo preparo un café V60?"],
    )
    context: str | None = Field(
        default=None,
        max_length=100,
        description="Contexto opcional donde se usará el prompt (ej. 'chat', 'soporte')",
    )
    top_keywords: int = Field(
        default=settings.default_top_keywords,
        ge=1,
        le=settings.max_top_keywords,
        description="Cuántas palabras clave devolver",
    )

    @field_validator("text")
    @classmethod
    def text_no_vacio(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("El prompt no puede estar vacío o ser solo espacios")
        return value


class AnalyzePromptResponse(BaseModel):
    text: str
    context: str | None
    stats: Stats
    language: Language
    intent: Intent
    risk: Risk
    keywords: list[str]
    recommendation: Recommendation


# ---------------------------------------------------------------------------
# POST /api/text/process
# ---------------------------------------------------------------------------
class ProcessTextRequest(BaseModel):
    text: str = Field(
        min_length=1,
        max_length=settings.max_text_length,
        description="Texto a procesar",
    )
    remove_stopwords: bool = Field(default=True, description="¿Eliminar palabras vacías?")
    lowercase: bool = Field(default=False, description="¿Convertir a minúsculas?")
    top_keywords: int = Field(default=settings.default_top_keywords, ge=1, le=settings.max_top_keywords)
    summary_sentences: int = Field(
        default=settings.default_summary_sentences,
        ge=0,
        le=settings.max_summary_sentences,
        description="Oraciones del resumen extraído (0 = sin resumen)",
    )

    @field_validator("text")
    @classmethod
    def text_no_vacio(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("El texto no puede estar vacío o ser solo espacios")
        return value


class TextStats(BaseModel):
    characters: int
    words: int
    sentences: int
    stopwords_removed: int


class ProcessTextResponse(BaseModel):
    cleaned_text: str
    tokens: list[str]
    keywords: list[str]
    summary: str | None
    stats: TextStats


# ---------------------------------------------------------------------------
# POST /api/responses/generate
# ---------------------------------------------------------------------------
class GenerateResponseRequest(BaseModel):
    prompt: str = Field(
        min_length=1,
        max_length=settings.max_prompt_length,
        description="Pedido del usuario que el agente debe responder",
    )
    tone: Literal["profesional", "amigable", "tecnico"] = Field(
        default="profesional",
        description="Tono de la respuesta controlada",
    )

    @field_validator("prompt")
    @classmethod
    def prompt_no_vacio(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("El prompt no puede estar vacío o ser solo espacios")
        return value


class GenerateResponseResponse(BaseModel):
    intent: Intent
    tone: str
    template: str = Field(description="Identificador de la plantilla utilizada")
    blocked: bool = Field(description="True si la respuesta fue un rechazo controlado")
    reply: str
