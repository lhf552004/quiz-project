## Source submission process
Source control is based on Git. There is the tutorial of [git on VScode](https://code.visualstudio.com/docs/sourcecontrol/overview) 

Here is source submission process 

1. Create or select your task, and assign to yourself or other team member, assign the project "E-Team", assign the label

2. Create own branch from latest dev branch to develop
   
   You don't need to do it manually, you can create the branch for task
   !["create branch"](./images/create-branch.png)
   
   Confirm it:

   !["confirm create branch"](./images/create-branch-popup.png)

3. Get the repository from specific branch at first time

   `git clone -b dev https://github.com/MUN-COMP6905/project-eteam.git`

4. If you already download the project. You can fetch the branch firstly in VScode.

   !["fetch branch"](./images/fetch-branch.png)

5. Then pull your branch from remote in VScode

   !["pull branch"](./images/select-remote-branch-to-pull.png)

6. After your coding and testing, commit your code 

  !["commit changes"](./images/commit-changes.png)

2. Submit your own branch to repository

  !["push to server"](./images/push-to-server.png)

3. Create pull request to merge your branch to dev branch
  !["create pull request"](./images/create%20pull%20request.png)

4. At end of sprint, publish new version to master branch
   
   The same as your merge to dev branch