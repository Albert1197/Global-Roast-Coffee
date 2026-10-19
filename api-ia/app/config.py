"""Configuración central de la API.

Todo parámetro ajustable (límites, tonos, títulos) vive acá, para que
los routers y servicios no tengan valores mágicos dispersos.
"""
from dataclasses import dataclass, field


@dataclass(frozen=True)
class Settings:
    api_title: str = "Prompt Analyzer API"
    api_version: str = "1.0.0"
    api_description: str = (
        "API para analizar prompts, procesar texto y generar respuestas "
        "controladas. Pensada como base para integrar un agente de IA."
    )

    # Límites de entrada (validados con Pydantic en app/models.py)
    max_prompt_length: int = 2000
    max_text_length: int = 8000

    # Parámetros por defecto
    default_top_keywords: int = 5
    max_top_keywords: int = 20
    default_summary_sentences: int = 2
    max_summary_sentences: int = 5

    # Tones aceptados por el generador de respuestas
    tones: tuple[str, ...] = ("profesional", "amigable", "tecnico")

    # Umbrales del nivel de riesgo de un prompt
    risk_threshold_medium: int = 30
    risk_threshold_high: int = 60

    stop_words: frozenset[str] = field(
        default_factory=lambda: frozenset(
            # Español
            "el la los las un una unos unas de del y o u en con por para para sin sobre "
            "que como cuando donde quien cual cuales es son era eran ser estar estoy "
            "está están está muy más menos tambien también pero mas si no ni ya "
            "me te se nos os le les mi tu su nuestro sus este esta estos estas ese esa "
            "eso aquel al lo cual cuyo desde hasta entre ante segun según durante "
            "hay han ha he hemos habeis tienen tiene tener puedo puede puedan seré "
            "sera será sería son todo toda todos todas otro otra otros otras"
            .split()
            # English
            + "the a an and or but if then else of in on at to from by with for without "
            "is are was were be been being do does did doing have has had having i you "
            "he she it we they me him her them my your his its our their this that "
            "these those what which who whom when where why how not no yes can could "
            "should would will shall may might must about into over under again more "
            "most other some such only own same very s t don now"
            .split()
        )
    )


settings = Settings()
