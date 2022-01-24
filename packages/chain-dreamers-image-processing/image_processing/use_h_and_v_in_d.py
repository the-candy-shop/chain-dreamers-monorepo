import json
import re
from image_processing.constants import PALETTES_FILE, PALETTES_HV_FILE


#%% Define functions
def use_h_and_v_in_d(d):
    """
    Replace L with h and v when possible.
    """
    commands = re.findall(r"[MLQCAHVZ][\d ,.]+", d)
    x = []
    y = []
    for i, command in enumerate(commands):
        attribute = command[0]
        if attribute == "H":
            end_point = command.strip().split(" ")[-1]
            x += [end_point.split(",")[0]]
            y += [y[-1]]
            continue
        if attribute == "V":
            end_point = command.strip().split(" ")[-1]
            x += [x[-1]]
            y += [end_point.split(",")[0]]
            continue
        end_point = command.strip().split(" ")[-1]
        x += [end_point.split(",")[0]]
        y += [end_point.split(",")[1]]
        if i == 0:
            continue
        if attribute == "L":
            if len(set(x[-2:])) == 1:
                # no horizontal movement, use V instead
                commands[i] = "V " + y[-1] + " "
            elif len(set(y[-2:])) == 1:
                # no vertical movement, use H instead
                commands[i] = "H " + x[-1] + " "
    return "".join(commands).strip()


#%% Update palette
palettes = json.load(open(PALETTES_FILE, "r"))
palettes["d"] = [use_h_and_v_in_d(d) for d in palettes["d"]]
json.dump(palettes, open(PALETTES_HV_FILE, "w"), indent=2)
