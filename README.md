# ArtMap

## Dependencies

- NodeJS: this is the framework for the server. You can  I used node version 4.2.6, though newer versions might also work.

- MySQL: the database platform. This reads our database file and presents an interface for the server to use.

## Files

- `README.md`: this file.

- `package.json`: the install file for this project. This file has a list of all the dependencies the project needs (like other programs and libraries it needs to function). If you want to run the server on your own computer, before running the server for the first time, run `npm install` in the same direction as `package.json`. This should install all the necessary packages we need. `npm` is a command that should install when you install `node`.

- `server.js`: the server itself. It's a Javascript file that expects to be run by node. It will present a web interface on `http://localhost:8000`, so if you're running the program on your own computer that's the URL you'll want to use. To run the server type `node server.js` in a command line. The server uses the Express framework, which is a really common choice for simple Node servers.

- `views/...`: page templates. Some pages on the site have a kind of 'fill in the blank structure'. These files contain the structure of what those pages should look like, and then the server fills in the real information.

- `static/...`: all the HTML, CSS, JavaScript, and image files that make up the website. Any new images, web pages, or other documents should go in here.

- `static/map.html`: the ArtMap webpage. This has got all the controls and displays for the ArtMap.

- `static/artmap.js`: the code that runs the ArtMap web page. This JavaScript file reads the inputs on the page, sends requests to the server, and then displays the response in different ways.

## Remote Server Stuff

- The server is running on a Google Compute Engine instance right now. It's a tiny virtual computer that is free to use. 
