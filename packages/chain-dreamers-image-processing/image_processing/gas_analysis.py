import json

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

plt.interactive(False)

#%% Load palette
palettes = json.load(open("palettes-hv.json", "r"))

#%%
pd.Series(palettes["d"]).map(len).plot(kind="hist", bins=200)
plt.show()

plt.scatter(range(len(palettes["d"])), pd.Series(palettes["d"]).map(len))
plt.show()

pd.Series(
    [(pd.Series(palettes["d"]).map(len) > (i * 100)).sum() for i in range(15)],
    index=np.arange(15) * 100,
).plot()
plt.show()

#%% Update palette
MAX_LENGTH = 750
d = pd.Series(palettes["d"]).loc[lambda s: s.map(len) > MAX_LENGTH]
print(
    pd.concat(
        [
            pd.DataFrame(values).assign(trait_name=trait_name.split("/")[-1])
            for trait_name, values in palettes["trait"].items()
        ]
    ).loc[lambda df: df.d.isin(d.index)]
)

#%% Load traits gas
traits_gas = json.load(open("get-traits-gas.json", "r"))
pd.Series(traits_gas).astype(int).sort_values(ascending=False).loc[
    lambda s: s > 50000000
]

traits_svg_gas = json.load(open("get-traits-svg-gas.json", "r"))
pd.Series(traits_svg_gas).astype(int).sort_values(ascending=False).loc[
    lambda s: s > 50000000
]

dreamers_gas = json.load(open("dreamers-gas.json", "r"))
pd.Series(dreamers_gas).astype(int).sort_values(ascending=False).loc[
    lambda s: s > 50000000
]
