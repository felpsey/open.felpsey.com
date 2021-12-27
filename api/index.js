const router = require('./core/router');

const fs =     require('fs');
const env =    require('dotenv').config();

const app =    router();
const port =   process.env.WEBSITE_PORT;



app.get('/', (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify({ msg: 'API online' }));

  return true;
});

// app.get('/test-route', (request, response) => response.send('Testing testing'));
// app.get('/user/:username', (request, response) => {
//   const users = [
//     { username: 'johndoe', name: 'John Doe' },
//     { username: 'janesmith', name: 'Jane Smith' }
//   ];

//   const user = users.find(user => user.username === request.params.username);

//   if (user) {
//     response.send(`Hello, ${user.name}!`);
//   } else {
//     response.send('User not found')
//   }

// });

app.listen(port, () => {
  console.log(`Application running on port ${port}`);
  console.log(`Debug mode: ${process.env.APP_DEBUG}`);
});