# Instructions to run the scripts

 ### 1. Install selenium on your PC

```
$ pip install selenium
```
> Make sure it installs selenium for python 3 rather than python 2

### 2. Install geckodriver

```
$ wget https://github.com/mozilla/geckodriver/releases/download/v0.18.0/geckodriver-v0.18.0-linux64.tar.gz
$ tar -xvzf geckodriver*
$ export PATH=$PATH:/path-to-extracted-file/geckodriver
```
> path-to-extracted-file must be filled in manually

Gecko Driver is needed to run the firefox browser using selenium

### 3. Test selenium

caltest.py checks how long it takes to return the calorie value of a food item(by default it checks coffee) and
stores the calorie value in a json file.

```
python3 caltest.py
```

### 4. Scrapping the webpage

foodcal.py scraps the whole webpage and returns the calorie value of all food item and then stores it in a json file

```
python3 foodcal.py
```
> This program will stop working in-between because the webpage is poorly written and hence making it difficult for the program to get information properly.
