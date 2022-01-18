import json
import shutil
from pathlib import Path

import numpy as np
import pandas as pd
import svgpathtools as spt

from image_processing.svg_to_path_ordered import svg2paths

#%% Define constants
ASSETS_DIR = Path("assets")
VALISE_DIR = ASSETS_DIR / "VALISE_CHAIN_DREAMERS_TRAITS"
VALISE_COMPUTED_DIR = ASSETS_DIR / "VALISE_CHAIN_DREAMERS_COMPUTED"
shutil.rmtree(VALISE_COMPUTED_DIR, ignore_errors=True)
VALISE_COMPUTED_DIR.mkdir(exist_ok=True)
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


#%% Define functions
def round_path(p):
    if p.__class__.__name__ == "Arc":
        p = p.scaled(255 / 283.5, 255 / 283.5)
        p.start = np.round(np.array(p.start))
        p.start = np.clip(0, 255, p.start.real) + 1j * np.clip(0, 255, p.start.imag)
        p.end = np.round(np.array(p.end))
        p.end = np.clip(0, 255, p.end.real) + 1j * np.clip(0, 255, p.end.imag)
        p.center = np.round(np.array(p.center))
        p.center = np.clip(0, 255, p.center.real) + 1j * np.clip(0, 255, p.center.imag)
        p.radius = np.clip(0, 255, np.floor(p.radius.real)) + 1j * np.clip(
            0, 255, np.floor(p.radius.imag)
        )
        return p

    coordinates = np.round(np.array(p.bpoints()) * 255 / 283.5)
    return getattr(spt, p.__class__.__name__)(
        *(np.clip(coordinates.real, 0, 255) + 1j * np.clip(coordinates.imag, 0, 255))
    )


def get_fill(fill):
    if fill_palette[fill] == NONE_COLOR[1:]:
        return "none"
    return "#" + fill_palette[fill]


def generate_svg(codes):
    return (
        """<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 255 255\" width=\"500px\" height=\"500px\">"""
        + (
            "".join(
                [
                    f"""<path d="{d_palette[c['d']]}" fill="{get_fill(c['fill'])}" """
                    + f"""stroke="{'#000' if c['stroke'] else ''}" />"""
                    for c in codes
                ]
            )
        )
        + """<style>path{stroke-width:0.71}</style></svg>"""
    )


#%% Parse files
traits_list = []
for file in VALISE_DIR.glob("**/*.svg"):
    paths, attributes, _ = svg2paths(str(file), return_svg_attributes=True)
    for path, attribute in zip(paths, attributes):
        computed_path = spt.Path(*[round_path(path_element) for path_element in path])
        traits_list += [
            {
                "file": str(file),
                **attribute,
                "d": computed_path.d(),
            }
        ]

#%% Build dataframe and encode traits
traits_df = (
    pd.DataFrame(traits_list)
    .fillna({"fill": "#000000"})
    .replace({"fill": {"red": "#ff0000", "lime": "#00ff00", "none": NONE_COLOR}})
    .filter(items=["file", "d", "fill", "stroke"])
    .assign(
        fill=lambda df: df.fill.where(
            df.fill.map(len) == 7,
            df.fill.map(lambda c: f"{c[0]}{c[1]}{c[1]}{c[2]}{c[2]}{c[3]}{c[3]}"),
        ).str.replace("#", ""),
        stroke=lambda df: (~df.stroke.isna()).astype(int),
    )
    .astype({"d": "category", "fill": "category", "stroke": "category"})
    .assign(
        d_code=lambda df: df.d.cat.codes,
        fill_code=lambda df: df.fill.cat.codes,
    )
)

d_palette = traits_df.d.cat.categories
fill_palette = traits_df.fill.cat.categories

traits_codes = (
    traits_df.groupby("file")
    .apply(
        lambda group: group[["d_code", "fill_code", "stroke"]]
        .rename(columns=lambda c: c.replace("_code", ""))
        .to_dict("records")
    )
    .reset_index()
    .assign(
        trait_category=lambda df: pd.Categorical(
            df.file.str.split("/", expand=True)[2], categories=TRAITS_ORDERING
        )
    )
    .sort_values(["trait_category", "file"])
    .set_index("file")
    .drop(columns=["trait_category"])[0]
)

#%% Dump reconstructed SVG files for visual check
for file_name, codes in traits_codes.items():
    file_name_computed = VALISE_COMPUTED_DIR / Path(file_name).relative_to(VALISE_DIR)
    file_name_computed.parent.mkdir(exist_ok=True, parents=True)

    with open(file_name_computed, "w") as f:
        f.write(generate_svg(codes))


#%% Dump palettes and traits
with open("palettes.json", "w") as f:
    json.dump(
        {
            "d": d_palette.tolist(),
            "fill": fill_palette.tolist(),
            "trait": traits_codes.to_dict(),
            "layerIndexes": (
                traits_codes.index.to_frame()
                .file.str.split("/", expand=True)[2]
                .reset_index(drop=True)
            )
            .drop_duplicates()
            .index.tolist(),
        },
        f,
        indent=2,
    )

#%% Some stats
print(f"Number of traits: {len(traits_df)}")
print(f"Number of unique traits: {len(traits_df.d.cat.categories)}")
print(f"Number of unique colors: {len(traits_df.fill.cat.categories)}")