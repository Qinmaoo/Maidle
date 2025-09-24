import requests, json
import random

data = requests.get('https://dp4p6x0xfi5o9.cloudfront.net/maimai/data.json').json().get("songs")
data = list(filter(lambda x: len(x["sheets"]) >= 4, data))
def hasRemas(chart):
    for sheet in chart["sheets"]:
        if sheet["difficulty"] == "remaster":
            return True
    return False

def chartTypes(chart):
    if len(chart["sheets"]) <= 5:
        return [chart["sheets"][0]["type"]]
    else:
        return ["std","dx"]

chart = random.choice(data)
category = chart.get("category")
bpm = chart.get("bpm")
title = chart.get("title")
cover_URL = chart.get("imageName")
artist = chart.get("artist")
version = chart.get("version")


if hasRemas(chart):
    diff = random.choice(["master","remaster"])
else:
    diff = "master"
    
chart_type = random.choice(chartTypes(chart))

sheet = list(filter(lambda x: x["type"] == chart_type and x["difficulty"] == diff, chart["sheets"]))[0]
cc = sheet["internalLevelValue"]

#Unused for now but can be useful
charter = sheet["noteDesigner"]
note_count = sheet["noteCounts"]["total"]

print(f"final choice:{title} [{chart_type} {diff} {cc}], by {artist}, BPM {bpm}, category {category}, released on {version}")