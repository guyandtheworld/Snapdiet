import json
data = json.load(open('FoodCalorieArrays.json'))
print(len(data["foodNames"]))
print(len(data["foodValues"]))