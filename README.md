## Useful commands to manage project and packages

npm create vite@latest project_name :

- React with TypeScript+SWC
  then cd project_name
  then npm i

npm i everytime the package.json file is updated and after each pull from remote dev branch

npm install package_name to install a package
npm audit to check the ability to use the package in a secure way

## GitHub repository management

push code on current remote branch on GitHub :

- git add .
- git commit -m "this is what I've done message"
- git push --set-upstream origin branch_name

git branch to get the list of all existing local branches

git checkout -b branch_name to create a local branch

creation of branch dev which will be used to merge pull requests

naming branches : US_XX/US_name/subtask_name (+ /fix)

GitHub repository > Settings :

- General > Default branch : switch to dev instead of main
- General > Pull requests : add if any
- Collaborators : add if any
- Rules > Rulesets : define "no push on dev and main" ruleset
- Secrets and variables > add if any

## Configure project

keep only files that are really needed in the context of the project

create .env file in root folder and add it to .gitignore

create "dev" branch with minimal configuration

create "configuration" branch with specific configuration (package.json, tsconfig.json)

npm run build to create/update dist folder which contains JavaScript files that will be compiled and executed

create index.ts file to check that the build (from ./src to ./dist) works correctly

npm run start to execute the application via the "main" entrypoint defined in package.json

configure Prettier on a common model to avoid different formatting implementations

## Configure production environment

create Makefile to add shortened scripts
