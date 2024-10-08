## Install server :

Server Express :

- npm i express
- npm i @types/express
- touch index.ts

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

## Install GraphQL and Apollo Server

npm i graphql

npm i @apollo/server graphql 

npm i type-graphql

npm i graphql-scalars
