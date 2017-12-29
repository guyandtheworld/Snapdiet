import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select

class CaloriePageTest(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.set_window_size(480, 320)

    def test_search_in_python_org(self):
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

        # Selects meal time
        mealTime = Select(driver.find_element_by_name("meal_time"))
        mealTime.select_by_value('-1')

        time.sleep(5)


    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()