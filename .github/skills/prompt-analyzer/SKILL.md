---
name: prompt-analyzer
description: Use this skill when working with the Prompt Analyzer FastAPI (analyze prompts, process text, generate controlled responses). Enforce validation, safe defaults, risk-aware handling, separation of concerns, and keep OpenAPI docs clear.
---

# Skill: Prompt Analyzer API

## Purpose
This skill guides the agent to interact consistently with the pi-ia/ FastAPI project: analyze prompts, process text, and generate controlled responses. It enforces a predictable contract between agent and API.

## When to use
- Modifying, extending, testing, or consuming /api/prompts/analyze, /api/text/process, /api/responses/generate
- Adding new endpoints that follow the existing separation (outes -> services -> models -> config)
- Validating inputs/outputs or adjusting limits/tones/risk rules
- Writing documentation for the API or the skill
- Troubleshooting requests/responses against the current schemas

## Core principles
- Single source of truth: use pp/config.py for limits, defaults, tones, stopwords, risk thresholds.
- Strict validation: use pp/models.py Pydantic schemas. Never trust client-provided flags/values.
- Separation of concerns: keep HTTP in pp/routers/*, pure logic in pp/services.py, contracts in pp/models.py.
- Safety by design: risk analysis is advisory. Only block when explicitly intended (e.g. locked: true in controlled generation).
- Deterministic defaults: prefer safe defaults (professional tone, emove_stopwords=true, bounded 	op_keywords/summary_sentences).
- Clear errors: return meaningful 400/404 with detail and validate with field validators.
- Spanish/English aware: respect accents, ¿ ?, interrogatives and common markers.

## API contract (must follow)
| Endpoint | Method | Purpose | Notes |
|---|---|---|---|
| /api/health | GET | Health check | Returns { status:ok} |
| /api/prompts/analyze | POST | Analyze prompt: stats, language, intent, risk, keywords, recommendation | Enforce max_prompt_length. |
| /api/text/process | POST | Clean/tokenize, keywords, optional summary, stats | Controlled by flags and bounds. |
| /api/responses/generate | POST | Controlled response based on intent + tone | Returns locked, 	emplate, eply. Reject empty/whitespace prompts. |

## Rules for the agent
1. Read before editing: pi-ia/app/config.py, models.py, services.py, outers/*.py, main.py.
2. Validate inputs: never bypass Pydantic. Use Field constraints + @field_validator.
3. Compute server-side: all derived values come from services.py.
4. Bound everything: respect min_length/max_length, ge/le.
5. Risk awareness: include lags + ecommendation.message on medio/alto. Do not leak sensitive patterns to user-facing eply.
6. Controlled generation: only allow tones in settings.tones. Use 	emplate for traceability.
7. Keep docs in sync: update OpenAPI via FastAPI models.
8. Test via /docs or minimal curl.
9. Minimal deps: astapi, uvicorn[standard], pydantic>=2.
10. No side effects: services.py pure and deterministic.

## Examples
- Analyze: {\text\:\¿Cómo preparo un café V60?\,\top_keywords\:5}
- Process: {\text\:\Hola mundo prueba.\,\remove_stopwords\:true,\summary_sentences\:2}
- Generate: {\prompt\:\Necesito ayuda con FastAPI\,\tone\:\profesional\}

## Do / Don't
- DO: extend in services.py first, then wire to routers + models.
- DO: keep logic testable and framework-agnostic.
- DON'T: duplicate constants from settings.
- DON'T: increase limits without updating README and validators.
- DON'T: return raw exception strings.

## Success criteria
- Endpoints validate correctly (empty/oversized rejected)
- /docs shows clear schemas, descriptions, examples
- Separation preserved (routes <-> services <-> models)
- Skill used whenever agent modifies this API