# This program tests the selenium code on your PC and returns the time 
# taken for it to scrap calorie values for a single food item.
# This value is then stored in caltest.json

import json
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class CaloriePageTest(unittest.TestCase):

    def setUp(self):
    	# profile disables images
        profile = webdriver.FirefoxProfile()
        profile.set_preference('permissions.default.image', 2)
        profile.set_preference('dom.ipc.plugins.enabled.libflashplayer.so', 'false')

        self.driver = webdriver.Firefox(firefox_profile=profile)

    def test_single_result(self):
        driver = self.driver        
        driver.get("http://www.medindia.net/patients/calculators/daily-calorie-counter-Indian-food.asp")

        gender = "Male"

        # Clicks on gender
        genderButton = driver.find_element_by_xpath("//input[@value='" + gender + "']")
        genderButton.click()
        
        age = 19

        # Selects age from drop down
        ageDropDown = Select(driver.find_element_by_id('age'))
        ageDropDown.select_by_value(str(age))

        height = 140

        # Enters height
        heightBox = driver.find_element_by_name("height")
        heightBox.clear() # clears the default value of 170
        heightBox.send_keys(str(height))

        weight = 50

        # Enters weight
        weightBox = driver.find_element_by_name("weight")
        weightBox.clear()
        weightBox.send_keys(str(weight))

        styleVal = 1.55

        # Lifestyle
        lifeStyle = driver.find_element_by_xpath("//input[@value='" + str(styleVal) + "']")
        lifeStyle.click()

        # Selects meal time - All option
        mealTime = Select(driver.find_element_by_name("meal_time"))
        mealTime.select_by_value('-1')

        # 
        foodVal = 1 # There are 25 food types

        wait = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//input[@value='" + str(foodVal) + "']"))
        )        
        
        foodType = driver.find_element_by_xpath("//input[@value='" + str(foodVal) + "']")
        foodType.click()

        foodNameID = "row" + str(foodVal) + "food"
        foodName = driver.find_element_by_id(foodNameID).text 

        wait = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "select_food_title"))
        )

        itemno = 2
        checkBoxID = "chk" + str(itemno)

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

        data = {}
        data[foodName] = foodCalorie
        print(data)
        
        with open('caltest.json', 'w') as f:
            json.dump(data, f)


    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()