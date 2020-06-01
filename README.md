# NC-News API project

This project was completed as part of the Northcoders' course back-end module. The purpose of the API is to create, read, update and delete information relating to a news website. There is also a hosted version which you can view by accessing https://hosted-be-nc-news.herokuapp.com/api.

## Running the API on your local machine

To use this API on your computer, you must first fork it then clone it down by using the command `git clone https://github.com/petruS92/be-nc-news.git`.

Once you have a copy of the folder on your computer, make sure to install the necessary dependancies needed in order for the API to run. A quick command to do this is `npm install`.

To start the API use the command `npm start` which will start it listening by default on port 9090. If you need to reset the database it at any point you can use the command `npm run setup-dbs` and to re-seed it you should use the command `npm run seed-dev`.

## Using the test suites

This project comes with pre-written tests written using the Jest testing framework. If you wish to run these then you can type in the command `npm t` which will bring the option of test suites to run or alternatively you can run all of them.

## Accessing the available endpoints

A list of the available endpoints which the API responds to is available on the path https://hosted-be-nc-news.herokuapp.com/api. This will provide the paths for each endpoint as well as examples of the responses which are served by the server.

## Frameworks used in the project

The following frameworks were used in this project:

- [Express](https://expressjs.com/) - API framework;
- [Knex](http://knexjs.org/) - SQL query builder;
- [PostgreSQL](https://www.postgresql.org/) - database;
- [Jest](https://jestjs.io/) - testing framework;
