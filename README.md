# inf165-webdev-project



- Our project consists of 4 html, 4 javascript, 1 server (index.js) and 1 css file
- All data is fetched from the wiki-ads website and dynamically generated in the html files.
- Full client-server architecture has been developed. Server sends to the client the html files, provides LS, AFS, FRS Services, and maintains lists of favorites per user . The lists of favorites are not category dependent, i.e. favorites can include ads for houses as well as cars
- To start the server, the node index.js command in the terminal is sufficient. There is no other dependency.
 

The libraries we used are express, node, fs, path, body-parser, uuid

## Login Passwords

username: 'dimitris', password: '123'\
username: 'elpida', password: '1111'\
username: 'user3', password: '3333'\
username: 'user4', password: '4444'\
username: 'yoda', password: 'theforce777'

The necessary dependencies already exist in package.json.
You can install them using the command
```
npm install
```

To test your application you can start it with the command
```
node index.js
```

Of course, after every change in the server code you will have to restart the application. For your convenience you can start the application with the help of the nodemon tool as follows:
```
nodemon index.js
```

Whenever you change the server code, nodemon automatically restarts the server.
