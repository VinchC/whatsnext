## Useful commands to manage project and packages

npm create vite@latest project_name :

- React with TypeScript+SWC
  then cd project_name
  then npm i

npm install package_name to install a package
npm audit to check the ability to use the package in a secure way

Packages :

- npm i dotenv --save => zero-dependency module that loads environment variables from a .env file into process.env

npm i everytime the package.json file is updated and after each pull from remote dev branch

## Git and GitHub repository management

create branch : git checkout -b branch_name

delete branch : git branch -D branch_name

push code on current remote branch on GitHub :

- git add .
- git commit -m "text of the message"
- git push --set-upstream origin branch_name

git branch to display the list of all existing local branches

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

create dev mode with build:watch and start:watch scripts to avoid restaring server

create Makefile to add shortened scripts

create .env file to use secret environment variables (needs 'dotenv' package to use process.env.VARIABLE_NAME)

Server Express :

- npm i express
- npm i @types/express
- index.ts => import express from "express" / const app = express() / const port = / app.get("/", (req, res) => { res.send('................');}); / app.listen(port, () => { console.log(`Server is listening on port ${port}`);});

## Create database

create sqlite database :

- sqlite3 db.sqlite => gives access to sqlite in terminal and creates an empty db.sqlite file
- sqlite > .databases => makes the db.sqlite file appear (!) in the root folder

create connection to database via VSCode

create db-queries folder with different files to execute sqlite queries

- create a create-table-table_name.sql file with attributes

- execute each file with the triangle in the upper right corner of VSCode

npm i sqlite3 to create a new object Database to access via server

update the existing routes to use the SQL queries

## Install ORM

npm i typeorm

npm i reflect-metadata

change tsconfig:
- uncomment experimentalDecorators
- uncomment emitDecoratorMetadata
