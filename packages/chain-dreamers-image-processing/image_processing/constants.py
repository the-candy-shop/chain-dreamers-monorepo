from pathlib import Path

ASSETS_DIR = Path("assets")
VALISE_DIR = ASSETS_DIR / "VALISE_CHAIN_DREAMERS_TRAITS"
VALISE_COMPUTED_DIR = ASSETS_DIR / "VALISE_CHAIN_DREAMERS_COMPUTED"
PALETTES_FILE = ASSETS_DIR / "palettes.json"
PALETTES_HV_FILE = ASSETS_DIR / "palettes-hv.json"
NONE_COLOR = "#000001"
# See ChainRunnersBaseRendering.sol contract
TRAITS_ORDERING = [
    "BACKGROUND",
    "RACE",
    "FACE",
    "MOUTH",
    "NOSE",
    "EYES",
    "EAR_ACCESSORIES",
    "FACE_ACCESSORIES",
    "MASK",
    "HEAD_BELOW",
    "EYES_ACCESSORIES",
    "HEAD_ABOVE",
    "MOUTH_ACCESSORIES",
]
