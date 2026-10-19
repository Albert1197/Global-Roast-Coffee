"""Endpoints para análisis de prompts: /api/prompts."""
from fastapi import APIRouter, status

from app.models import AnalyzePromptRequest, AnalyzePromptResponse, Intent, Language, Recommendation, Risk, Stats
from app.services import (
    classify_intent,
    compute_text_stats,
    detect_language,
    risk_analysis,
    top_keywords,
)

router = APIRouter(prefix="/api/prompts", tags=["prompts"])


@router.post(
    "/analyze",
    response_model=AnalyzePromptResponse,
    status_code=status.HTTP_200_OK,
)
def analyze_prompt(payload: AnalyzePromptRequest) -> AnalyzePromptResponse:
    text = payload.text
    stats_res = compute_text_stats(text, remove_stopwords=False)

    lang, conf = detect_language(text)
    lang_model = Language(detected=lang, confidence=conf)

    intent_label, intent_conf, signals = classify_intent(text)
    intent_model = Intent(label=intent_label, confidence=intent_conf, signals=signals)

    risk_level, risk_score, flags = risk_analysis(text)
    risk_model = Risk(level=risk_level, score=risk_score, flags=flags)

    safe = risk_level != "alto"
    recommendation = Recommendation(
        message=(
            "Procesable con precaución: revisar banderas."
            if risk_level == "medio"
            else (
                "Revisar banderas antes de procesar: alto riesgo detectado."
                if risk_level == "alto"
                else "Sin banderas relevantes. Procesable de forma segura."
            )
        ),
        safe_to_process=safe,
    )

    keywords = top_keywords(text, n=payload.top_keywords, remove_stopwords=True)

    return AnalyzePromptResponse(
        text=text,
        context=payload.context,
        stats=Stats(
            characters=stats_res.characters,
            words=stats_res.words,
            sentences=stats_res.sentences,
            avg_word_length=stats_res.avg_word_length,
        ),
        language=lang_model,
        intent=intent_model,
        risk=risk_model,
        keywords=keywords,
        recommendation=recommendation,
    )
