const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const app = express()
const port = 8080

app.listen(port)

app.use(express.static('public'))

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.get('/', function(req, res){

  var options = {
    root: path.join(__dirname, 'public')
  }

  res.sendFile('index.html', options, function(err){
    console.log(err)
  })

})

app.get('/category.html', (req, res) => {
   
  const categoryId = req.query.id;
  if (!categoryId) {
    return res.status(400).send('Missing category ID');
  }
  const filePath = path.join(__dirname, 'public', 'category.html');
  res.sendFile(filePath);
  res.send(categoryId);

});

app.get('/subcategory.html', (req, res) => {

  const subcategoryId = req.query.id;
  if (!subcategoryId) {
    return res.status(400).send('Missing category ID');
  }

  const filePath = path.join(__dirname, 'public', 'subcategory.html');

  console.log(subcategoryId);
  res.sendFile(filePath);
  res.send(subcategoryId);
});


const users = [
  { username: 'dimitris', password: '123', sessionId: null, favorites: []  },
  { username: 'elpida', password: '1111', sessionId: null, favorites: [] },
  { username: 'user3', password: '3333', sessionId: null, favorites: []  },
  { username: 'user4', password: '4444', sessionId: null, favorites: [] },
  { username: 'yoda', password: 'theforce777', sessionId: null, favorites: [] },
];


app.post('/login', (req, res) => {
  
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    //Generates unique session ID
    const sessionId = uuidv4();
    user.sessionId = sessionId;

    res.status(200).json({ sessionId });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});




app.post('/add-to-favorites', (req, res) => {

  const { adCode, title, description, cost, imgUrl, username, sessionId } = req.body;
  //Checks if user is logged in
  const user = users.find(u => u.username === username && u.sessionId === sessionId);

  if (!user) {
    return res.status(401).json({ error: 'Please log in to add to favorites list' });
  }
  //Checks if the ad is already ins users favorites
  if (user.favorites.find(ad => ad.adCode === adCode)) {
    return res.status(400).json({ error: 'Ad is already in favorites list' });
  }
  //Adds ad to users favorites
  user.favorites.push({ adCode, title, description, cost, imgUrl });

  res.status(200).json({ success: 'Ad added to favorites successfully' });

});





app.get('/favorite-ads.html', (req, res) => {
  const sessionId = req.query.sessionId;
  const username = req.query.username;

  if (!sessionId) {
    return res.status(400).send('Missing session ID');
  }
  if (!username) {
    return res.status(400).send('Missing username');
  }

  const filePath = path.join(__dirname, 'public', 'favorite-ads.html');

  res.sendFile(filePath);

});


app.get('/favorites-retrieval', (req, res) => {
  const sessionId = req.query.sessionId;
  const username = req.query.username;
  const user = users.find(u => u.username === username && u.sessionId === sessionId);

  if (user) {
      //Send the user's favorites data as JSON
      res.json({ favorites: user.favorites });
  }else {
      res.status(401).json({ error: 'Unauthorized' });
  }

})
