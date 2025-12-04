
require("dotenv");
const express = require("express");
const app = express();
const {v4: uuidv4} = require('uuid');
//above is a use case of naming an import library

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let users = {
    1: {
      id: '1',
      username: 'Robin Wieruch',
    },
    2: {
      id: '2',
      username: 'Dave Davids',
    },
  };
  
  let messages = {
    1: {
      id: '1',
      text: 'Hello World',
      userId: '1',
    },
    2: {
      id: '2',
      text: 'By World',
      userId: '2',
    },
  };


//Below is utilizing URI (Uniform Resource Identifier)
/*
app.get('/users', (req,res) => {
    return res.send('Received a GET HTTP method on user resource');
});

app.post('/users', (req,res) => {
    return res.send('Received a POST HTTP method on user resource');
});
app.put('/users/:userId', (req,res) => {
    return res.send(`PUT HTTP method on user/${req.params.userId}`);
});
app.delete('/users/:userId', (req,res) => {
    return res.send(`DELETE HTTP method on user/${req.params.userId}`);
});

*/

//Below is actually using data (users & messages) that is hardcoded for now
app.get('/users', (req,res) => {
    return res.send(Object.values(users));
});
app.get('/users/:userId', (req,res) => {
    return res.send(users[req.params.userId]);
});

//messages
app.get('/messages', (req,res) => {
    return res.send(Object.values(messages));
});
app.get('/messages/:messageId', (req,res) => {
    return res.send(messages[req.params.messageId]);
});

//below is a custom built express middleware
app.use((req,res,next) => {
    req.me = users[1];
    next();
});

//using uuid which wil generate unique id's for us
//since we are not using an actual database
app.post('/messages', (req,res) => {
    const id = uuidv4();
    const message = {
        id,
        text: req.body.text,
        userId: req.me.id,
    };
    messages[id] = message;
    return res.send(message);
});
//deletion of a message
app.delete('/messages/:messageId', (req,res) => {
    const {
        [req.params.messageId]: message,
        ...otherMessages
    } = messages;

    messages = otherMessages;
    return res.send(message);
});
// The ...otherMessages is the dynamic object property
//and is used to exclude the message we want to delete
//from the rest of the messages object

//this is a dedicated route for our custom middlewar
app.get('/session', (req,rs) => {
    return res.send(users[req.me.id]);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});

/*
//below is what it would look like if we moved the two arrays
//(messages & users) to its own file
app.get('/session', (req, res) => {
  return res.send(req.context.models.users[req.context.me.id]);
});

app.get('/users', (req, res) => {
  return res.send(Object.values(req.context.models.users));
});

app.get('/users/:userId', (req, res) => {
  return res.send(req.context.models.users[req.params.userId]);
});

app.get('/messages', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

app.get('/messages/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

app.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});

app.delete('/messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});


*/