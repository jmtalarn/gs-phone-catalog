# Phone catalog

This is an app compound by a backend server and a frontend application.


## Backend
A backend built with Node.js and the Express library in order to provide an API REST for a collection of phones. Phones are read from a JSON file and exposed throught the ```/phones``` route.
* POST */phones* to create a new one 
* GET  */phones* to gets all items
* GET  */phones/:id* providing an id on the url path gets an specific item
* PATCH  */phones/:id* providing an id on the url path updates an specific item, adding or modifying existing properties of the item.
* PUT *//phones:id* providing an id on the url path updates an specific item, replacing entirely the item.
* DELETE  */phones/:id* providing an id on the url to delete the resource

There is an ephemeral persitence during the life of the server. Once it is restarted the items will be loaded again from the JSON file. 

### How to run
1. run ```npm install``` to install package dependencies.
2. start server with ```npm start```. Optionally you can pass a ```PORT``` environment variable to change the listening PORT.
   
3. By default the application will be up, running and listening on port 3001

### Tests
Some kind of integration tests testing the endpoints can be run with ```npm run test```. Cypress framework was chosen due its versatility. 
Whilst ```npm run test``` runs the tests in a headless mode, you can also run ```npm run precypress:open``` to open the Cypress UI.

**THERE IS NO NEED TO RUN PREVIOUSLY THE SERVER** The own test tasks will start a server on port 4694 in order to perform the tests.

## Frontend

The Phone catalog application built with ReactJs using Typescript. 

* Typescript adds maybe a layer of complexity but also gives a better stability and maintanability by defining types and function parameters.
* Any specific additional library was added for the implementation. 
* Due the 'simplicity' of the project I went with simple objects defining the styles of the components and I've just added an ```index.css``` file where the common classes can be placed. Additional `theming` using the defined CSS custom properties there (just to define primary color, secondary color and error color ) and animations.
* Avoiding Redux to manage the state of the application and reduce the complexity. Instead I used the Context API and the useContext hook together with other React hooks like useState and useEffect.
  
### How to run
1. run ```npm install``` to install package dependencies.
2. Start the applicataion with ```npm start```. 
   1. Optionally you can pass a ```REACT_APP_PORT``` environment variable to change the listening PORT. *By default 3000.*
   2. Also you can pass a ```REACT_APP_SERVER``` where it can be defined the URL of the backend to be proxied. *By default http://localhost:3001.*
   
3. By default the application will be up, running and listening on port 3000

### Tests
There are some Unit tests that can be run with ```npm run test``` using the ```testing-library``` provided with the ```create-react-app``` scripts.
Additionally there are some Storybook UI tests that can be run with the task ```npm run storybook```. Storybook will start and open a browser with the app in the port 6006.


## Docker
Both applications contain a ```Dockerfile``` in order to run both of them in their respective Docker containers.
Also in the root of the project there is a ```docker-compose.yml` file to run both of them together in just one command.

Run the following command to build the docker containers and start them together. 
```APP_SERVER_PORT=3001 REACT_APP_PORT=3000 REACT_APP_SERVER_URL=http://server:3001 docker-compose up --build```

Where you can use the following environment variables to configure it:
* **APP_SERVER_PORT** the port for the backend, it will be translated in to the *PORT* environment variable for the backend app.
*  **REACT_APP_PORT** the port for the React frontend application
*  **REACT_APP_SERVER** the URL of the backend to pass it to the React application in order to be proxied.

**ONLY THE FRONTEND APPLICATION WILL BE EXPOSED**

## E2E tests
An additional project was set where a collection of E2E tests can be executed. It is on a separate project as it can be used to run them on any existing environment. Again Cypress was used here.
* ```npm test``` to run it in headless mode.
* ```npm start``` to open the Cypress UI interface.

By default it will try to test it against ```http://localhost:3001``` if another server want to be tested you can run the above commands with the environment variable ```CYPRESS_BASE_URL```

Like
```CYPRESS_BASE_URL=http://localhost:3000 npm run start```

