const express = require('express');

const login = require('./router/login');
const user = require('./router/user');
const categories = require('./router/categories');
const post = require('./router/post');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.use('/login', login);

app.use('/user', user);

app.use('/categories', categories);

app.use('/post', post);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
