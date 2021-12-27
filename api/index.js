const router = require('./core/router');

const fs =     require('fs');
const env =    require('dotenv').config();

const app =    router();
const port =   process.env.APP_PORT;

app.get('/', (request, response) => {
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify({ msg: 'API online' }));

  return true;
});

const { Client, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commands = [{
  name: 'ping',
  description: 'Replies with Pong!'
}]; 

const rest = new REST({ version: '9' }).setToken(`${process.env.DISCORD_TOKEN}`);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(`${process.env.CLIENT_ID}`, `${process.env.GUILD_ID}`),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(`${process.env.DISCORD_TOKEN}`);


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