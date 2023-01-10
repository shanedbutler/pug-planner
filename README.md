# Pick-Up Game Planner
Pick-Up Game Planner, also known as PUG Planner, or PUP is a web application to plan, organize and manage community pick-up game events. The application was designed specifically for soccer, but could easily be expanded to serve a wide variety of sports and activites, including tabletop and e-sports.

![](https://github.com/shanedbutler/pug-planner/blob/main/preview.gif)


## Getting Started with PUG Planner

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and CSS has been built with [Tailwind CSS](https://tailwindcss.com/). The backend service has been built with in C# with ASP.NET for Web API and ADO.NET for database access.

## Build and seed database with test data

From the SQL-Server-Database folder, run the queries 1 and 2 in order to create and seed the database.

## To run back-end services in development mode

Open the .sln file in the root directory in Visual Studio. Run to launch backend services. Swagger has been included for testing endpoints.

## To run front-end client in development mode

In the front-end project directory, you can run:

### `npm install`

### `npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch`

The built CSS is not included in this repository. Run this command to start the the Tailwind CLI build process. It will build the css file needed and continue to watch your template files for Tailwind classes.\
The output css will be rebuilt when a change is made.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
