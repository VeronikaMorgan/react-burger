# React/Redux TK based pet project
see the project: https://veronikamorgan.github.io/react-burger/
The App represents a web-simulator of our space burger bar. You can make your own space burger, study our droll ingredients and see burgers of others in real time. To make an order you should be logged in first, so sign up beforehand. If you want to show others your burgers or need to change profile data, go to profile page. 

Used Stack and tools:
React.js, ReactRouter, React DnD<br>
Redux Toolkit as a state manager
Websockets for two-way communication session used to create orders tapes

Typescript as main language
Css modules, grid/flex for template

Jest for unit testing
Cypress.io for e2e testing
Available Scripts
to perform the following steps you should have pre-installed Node.js/npm/Git

to clone the project run 
git clone https://github.com/VeronikaMorgan/react-burger.git

to go to the project directory run cd react-burger

In the project directory, you can run:

npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.
The page will reload once you made edits.

npm run test
Launches the jest test runner 

npm run cypress:open
Launches the cypress test runner in a browser. Click e2e testing and choose any browser, then click on any test and to see the tests running in real time

Note! want to deploy the app? Go to npm run deploy right away

npm run build
Builds the app for production to the build folder.
The build is minified and the filenames include the hashes.

npm run deploy
Builds the app for production to the build folder. Deploys the app to gitHub pages.
