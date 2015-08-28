bidonvullen
===========
![Travis-ci build status](https://travis-ci.org/TuvokVersatileKolinahr/bidonvullen.svg)

'Where can I fill my flask?' In a ride of several hours this question might pop up. You need a drink, and you are in unfamiliar terrain. Open this app and you see the locations in a radius.

### Installation ###

    git clone git@github.com:TuvokVersatileKolinahr/bidonvullen.git

    cd bidonvullen

### Running Production ###

Install dependencies

    npm install
    
Generate frontend

    gulp
    
Start the server

	export NODE_ENV=production
    npm start

Go to [`http://localhost:7192/`](http://localhost:7192/) to view the application.

### Running Development ###
    
Generate frontend

    gulp

Start one of the servers

    gulp browser-sync
  
or

	npm start

Go to [`http://localhost:4000/`](http://localhost:4000/) to view the application. You can start the browser-syn server on a different port like this:

	gulp browser-sync --port 3000

### Running tests ###

    npm test

Open the app on a mobile.

if you have an issue, please file one at [the GitHub issue tracker](https://github.com/TuvokVersatileKolinahr/bidonvullen/issues).

Have fun. Ride safe!
