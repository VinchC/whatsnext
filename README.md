## Useful commands

npm create vite@latest project_name :

- React with TypeScript+SWC
  then cd project_name
  then npm i

npm i everytime the package.json file is updated and after each pull from remote dev branch

npm install package_name to install a package
npm audit to check the ability to use the package in a secure way

push code on current remote branch on GitHub :

- git add .
- git commit -m "this is what I've done message"
- git push --set-upstream origin branch_name

git branch to get the list of all existing local branches

## Configure project

keep only files that are really needed in the context of the project

create .env file in root folder and add it to .gitignore

create "dev" branch with minimal configuration

create "configuration" branch with specific configuration (package.json, tsconfig.json)

npm run build to create/update dist folder which contains JavaScript files that will be compiled and executed

npm run start to execute the application via the main file defined in package.json
context : index.js
