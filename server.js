const express = require("express");
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

const database = {
  users: [
    {
      id: "flap2038",
      name: 'Nicu',
      email : 'i',
      password: "b",
      entries: 0,
      joined: new Date()
    },
    {
      id: "bb119",
      name: 'Denisa',
      email : 'denisaiorga@gmail.com',
      password: "caca1234",
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: "333",
      hash: '',
      email: "ioghistudio2038@gmail.com"
    }
  ]
}

app.get('/' , (req , res) => {
  res.json(database.users)
})

app.post('/signin', (req ,res) => {
  if(req.body.email === database.users[0].email 
    && req.body.password === database.users[0].password) {
      res.json(database.users[0]);
    } else {
      res.status(400).json("error loggin in")
    }
})

app.post('/register', (req , res) => {
  const { name , email} = req.body;
  database.users.push(
    {
      id: 'guessId',
      name: name,
      email : email,
      entries: 0,
      joined: new Date()
    })
  res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req , res) => {
  const { id } = req.params;
  let found = false;

  database.users.forEach(user => {
    if(user.id === id) {
      found = true;
      return res.json(user);
    }
  })

  if(!found) {
    res.status(404).json("no such user");
  }
})

app.put('/image', (req , res) => {
  const { id } = req.body;
  let found = false;

  database.users.forEach(user => {
    if(user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  })

  if(!found) {
    res.status(404).json("no such user");
  }
})



app.listen(3000 , () => {
  console.log("app running on port 3000 ")
});
