# Pick-Up Game Planner
Pick-Up Game Planner, also known as PUG Planner, or PUP is a web application to plan, organize and manage community pick-up game events. The application was designed specifically for soccer, but could easily be expanded to serve a wide variety of sports and activites, including tabletop and e-sports.

![](https://github.com/shanedbutler/pug-planner/blob/main/preview.gif)

There is a recorded demo of the app available:
[Loom Demo of Pick-UP Game Planner](https://www.loom.com/share/3d06a0a110cf495ea404cc1eabec8ea5)

## Getting Started with PUG Planner

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). The CSS has been built with [Tailwind CSS](https://tailwindcss.com/). Backend services have been built with in C# with ASP.NET for Web API and ADO.NET for database access.

## Build and seed database with test data

From the SQL-Server-Database folder, run the queries 1 and 2 in order to create and seed the database necessary to use application. 

## To run full-stack app in development mote

### `npm install`
From the ClientApp directory to install packages

### `npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch`
To update and watch for TailwindCSS style changes


Open the project root in Visual Studio. Launch application with debugging using the keyboard shortcut `F5` or without debugging using `Ctrl+F5`. Both backend services and front-end server will be started and the browser should launch automatically.
Navigate to [https://localhost:7066/swagger](https://localhost:7066/swagger) to access the Swagger API tools.

## To run front-end client alone in development mode

### `npm start`
From the ClientApp directory

Runs the app in the development mode.\
Open [https://localhost:44477](https://localhost:44477) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
