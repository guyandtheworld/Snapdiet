# This program scraps the calorie values of food items available in that website
# Variables have to be fed manually because the webpage was written by some lazy azz
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

profile = webdriver.FirefoxProfile()
profile.set_preference('permissions.default.image', 2)
profile.set_preference('dom.ipc.plugins.enabled.libflashplayer.so', 'false')

driver = webdriver.Firefox(firefox_profile=profile)
driver.get("http://www.medindia.net/patients/calculators/daily-calorie-counter-Indian-food.asp")

gender = "Male"
age = 18
height = 140
weight = 50
styleVal = 1.55

def initialDetails():

	wait = WebDriverWait(driver, 10).until(
		EC.presence_of_element_located((By.XPATH, "//input[@value='Male']"))
	)

	genderButton = driver.find_element_by_xpath("//input[@value='Male']")
	genderButton.click()

	ageDropDown = Select(driver.find_element_by_id('age'))
	ageDropDown.select_by_value(str(age))

	heightBox = driver.find_element_by_name("height")
	heightBox.clear() # clears the default value of 170
	heightBox.send_keys(str(height))

	weightBox = driver.find_element_by_name("weight")
	weightBox.clear()
	weightBox.send_keys(str(weight))

	lifeStyle = driver.find_element_by_xpath("//input[@value='" + str(styleVal) + "']")
	lifeStyle.click()

	mealTime = Select(driver.find_element_by_name("meal_time"))
	mealTime.select_by_value('-1')

	wait = WebDriverWait(driver, 10).until(
		EC.presence_of_element_located((By.XPATH, "//input[@value='" + str(foodVal) + "']"))
	) 

foodTypeName = ["Tea/Coffee/Milk Items","Cereals/Porridge","South Indian Dishes",
                  "Paratha/Roti","Chutney","Subzi","Salads","Fruits",
                  "Non-Alcoholic Beverages","Soup","Rice Varieties",
                  "Dhal Items","Vegetable Gravy/Curry","Subzi(Dry/Semi Gravy)",
                  "Egg Dishes","Chicken Dishes","Fish Varieties",
                  "Mutton/Meat Varieties","Salads/Chutney/Others",
                  "Desserts","Biscuits","Cakes/ Pasteries","Sweets",
                  "Savories","Chat Items"]
foodVal = 1
itemno = 0
FOOD = { }


for foodVal in range(1, 26):

	print("Checking " + str(foodVal) + " foodtype") # Debugging

	foodItems = { }

	while(True):

		initialDetails()

		foodType = driver.find_element_by_xpath("//input[@value='" + str(foodVal) + "']") 
		foodType.click()

		wait = WebDriverWait(driver, 10).until(
			EC.presence_of_element_located((By.ID, "select_food_title"))
		)

		itemno += 1

		checkBoxID = "chk" + str(itemno)

		if driver.find_elements_by_id(checkBoxID):			
			print("Got " + checkBoxID) # Debugging
		else:
			print("Didnt get " + checkBoxID + " in fooditem " + str(foodVal)) # Debugging
			itemno -= 1
			break

		foodNameID = "row" + str(itemno) + "food"
		foodName = driver.find_element_by_id(foodNameID).text 	

		foodCheck = driver.find_element_by_id(checkBoxID)
		foodCheck.click()

		qtyBoxID = "qty" + str(itemno)
		qtyBox = driver.find_element_by_id(qtyBoxID)
		qtyBox.send_keys("1")

		addButton = driver.find_element_by_id("btn_add")
		addButton.click()

		wait = WebDriverWait(driver, 10).until(
			EC.presence_of_element_located((By.ID, "cal_btn"))
		)

		calButton = driver.find_element_by_id("cal_btn")
		calButton.click()

		wait = WebDriverWait(driver, 10).until(
			EC.presence_of_element_located((By.ID, "food_added_list_id"))
		)

		calorieText = driver.find_elements_by_class_name("result_font_red")
		# 0 - is calorie of food item
		# 1 - is calorie needed according to height and weight
		foodCalorie = calorieText[0].text

		calAgain = driver.find_element_by_xpath("//div[@class='result']//a[@href='daily-calorie-counter-Indian-food.asp']")
		calAgain.click()

		foodItems[foodName] = foodCalorie

	FOOD[foodTypeName[foodVal - 1]] = foodItems

	print(FOOD) # Debugging

with open('soup.json', 'a') as f:
	json.dump(FOOD, f)

driver.close()