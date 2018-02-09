# Stuff


## Ground rules on github.

* Always keep your fork (origin) updated with the master branch of the master (upstream).

    `git fetch upstream`

    `git rebase upstream/master`

    where upstream is https://github.com/isht3/stuff.

* Two people shouldn't work on the same file. Keep your work seperate and collaborate to avoid confusion.

* Don't push directly to the repository, always push to your own fork first and from there do a Pull request to the main repo.

* Write meaningful commit messages.

* Keep the frontend and backend in code separated.

* The master is always stable, you don't have access to edit the master branch directly.

* Don't work on master branch, whatever you're doing, make a feature branch, the master branch should always be stable.

#### Violation of the ground rules are punishable by death.
<br>
<br>
<br>

## Features To-Do.


- [ ] Add proper login screen and an sliding intro to our app.

<br>

- [ ] Adding food is too hectic, the drop-down menu looks like shit. I couldn't find the `+`, it is too hard to find (So make it more obvious and make it a hardcoded button. The food is hard to add. Add search option to food items, no of quantity for certain items like dosa, idli and multiply calorie. fix the pop-up food addition UI. (See how popular apps hands pop up UI) This is a big feature to be in a pop-up. So drop the pop up and take a whole view, sliding up and down like how Quality time handles it. (Claimed by Aswin G, Jan 29th 2018)
<br>


- [x] The database should be more clean, make the food item names more obvious to both North and South Indian users.(Claimed by Alfred, January 30, 2018)
<br>


-  [x] Drop the app drawer, make the notification permanent after the app is installed. Everytime I click on the persistent notification to add a food, it dissapears right after. Fix it. AND DROP THE DRAWER. (Claimed by Albin, January 25, 2018)
<br>


-  [ ] Show the daily progress of the current days diet in the persistent notification.
<br>


-  [ ] Do a UI overhaul, copy from popular apps, and make it visually pleasing and round the edges and fonts. JUST LOOK AT HOW POPULAR APPS HANDLES SIMILAR FEATURES.
<br>


-  [ ] Set up the initial user inputs to get user details (Weight, Height, Activity) and the default calorie goal should be the calculated value from that parameters.
<br>


-  [ ] In the Daily Calorie goal box, all the values shouldn't be allowed. Calculate an optimum calorie value for a person and then increment 200+ or 200- calorie to that and display as a drop down menu. (See how popular apps hands pop up UI and drop down boxes)
<br>


-  [ ] Everytime in the first screen, below the calorie goal meter, show a new health quote. (Claimed by Albin, January 25, 2018)
<br>


-  [ ] The food history of the user of each day should be shown. Along with the top five favourite user foods in a sliding view. (Look at Quality time)
<br>

## How to.
<br>
<br>

* From the first, the three of you can claim one issue at once, complete it as quick as possible, and do a PR along with the name of the issue/feature as the PR heading along with screenshots. Each time you claim an issue, add claimed by in brackets near to the issue/feature here, in the README.md along with the date you claimed it. E.G (Claimed by Adarsh S, January 23, 2018) just after the issue/featuer. If completed, and PR is merged, you can tick the checkbox.
<br>
<br>

* Some of the issues are big, some are small. Keep in mind that number of issues solved won't make a difference.
<br>
<br>

### Follow a UI first approach, the feature is secondary. Before working on one of the issue, look at similar apps and how they execute similar feature and try to mimick the UI here, color combinations are important too.
