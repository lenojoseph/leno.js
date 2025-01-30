<div align="center">
    <br />
    <p>
        <a href="https://lenobot.xyz"><img src="https://lenobot.xyz/app_asset/packageimg.png" width="546" alt="discord.js" /></a>
    </p>
    <br />
    <p>
        <a href="https://discord.gg/PNpVAp2vwP"><img src="https://img.shields.io/discord/1298533911869128725?logo=Discord&logoColor=white&color=5865F2" alt="Discord server" /></a>
        <a href="https://www.npmjs.com/package/leno.js"><img src="https://img.shields.io/npm/dw/leno.js?logo=npm&label=Downloads" alt="npm version" /></a>
        <a href="https://www.npmjs.com/package/leno.js"><img src="https://img.shields.io/npm/v/leno.js?logo=npm" alt="npm version" /></a>
        <a href="https://github.com/discordjs/leno.js/actions"><img src="https://img.shields.io/github/actions/workflow/status/lenojoseph/leno.js/build.yml?logo=Github&label=Tests" alt="Tests status" /></a>
    </p>
</div>

# Discord Pagination and Embed Utility

A flexible and feature-rich utility for handling paginated content in Discord bots. This package supports both message commands and slash commands, allowing developers to easily create custom embeds and paginate through content with interactive buttons.

## Update & Maintained

<div align="center">
  <br />
    <p>
        <a href="#"><img src="https://img.shields.io/npm/last-update/leno.js?label=Last%20Update" alt="last update" /></a>
        <a href="#"><img src="https://img.shields.io/maintenance/yes/2025?label=Maintained" alt="maintained" /></a>
    </p>
  <br />
    <p>
        <a href="#"><img src="https://img.shields.io/badge/Developed%20%26%20Maintained%20By-Joseph.J.M-Green" alt="maintained by" /></a>
    </p>
</div>

## Features

- **Custom Embeds**: Build professional, branded embeds with custom titles, descriptions, colors, and more.
- **Pagination**: Paginate through large amounts of content using interactive buttons (`◀`, `▶`, `❌`).
- **Dual Compatibility**: Works with both message commands and slash commands.
- **Error Handling**: Gracefully handles errors like deleted messages and ensures smooth pagination operations.

---

## Installation

Ensure you have `discord.js` & `leno.js` installed:

```bash
npm install discord.js
```

```bash
npm install leno.js
```

Include the package in your project:

```javascript
const { CustomEmbed, handlePagination } = require('leno.js');
```

---

## Buttons

- `◀`: Go to the previous page.
- `▶`: Go to the next page.
- `❌`: Delete the message and stop the pagination.

---

## Example Command

- The package includes an example command to demonstrate its usage:

```javascript
exampleCommand.execute(interaction); // For slash commands
exampleCommand.messageCommand(message); // For message commands
```

---

## API

### CustomEmbed

The `CustomEmbed` class allows you to build custom Discord embeds with various configurable properties.

| Method                 | Description                                  |
| ---------------------- | -------------------------------------------- |
| `setTitle(title: string): CustomEmbed`      | Set the title of the embed.                      |
| `setDescription(description: string): CustomEmbed` | Set the description of the embed.                |
| `setColor(color: string = '#F4C2C2'): CustomEmbed`      | Set the color of the embed. Default: baby pink. |
| `setAuthor(author: { name: string, iconURL?: string }): CustomEmbed`    | Set the author field of the embed.                     |
| `setThumbnail(url: string): CustomEmbed`    | Set the thumbnail image of the embed.          |
| `setFields(fields: Array<{ name: string, value: string, inline?: boolean }>): CustomEmbed`    | Add fields to the embed.           |
| `setImage(url: string): CustomEmbed`        | Set the main image of the embed.                 |
| `setTimestamp(): CustomEmbed`       | Add a timestamp to the embed.              |
| `setFooter(text: string, iconURL?: string): CustomEmbed`           | Set the footer of the embed.              |
| `getEmbed(): EmbedBuilder`           | Returns the final embed object.              |

### Customization

- **`Colors`**: You can change the default color by passing a different color to `setColor()` method.
- **`Footer`**: Customize the footer by modifying the `CustomEmbed` class or setting a custom footer for each embed.

## Usage

### Setup the Bot

You can use this package to build paginated embeds and handle interactions in your bot. Here's an example of how to set it up:

### Custom Embed

```javascript
const { CustomEmbed } = require('leno.js');

const customEmbed = new CustomEmbed()
  .setTitle('Sample Title')
  .setDescription('This is a sample description.')
  .setColor('#FF5733')
  .setImage('https://example.com/sample-image.jpg')
  .setTimestamp();

message.channel.send({ embeds: [customEmbed.getEmbed()] });
```

### handlePagination

The `handlePagination` function is used to handle pagination for large content with interactive buttons.

```javascript
handlePagination(interactionOrMessage, contentArray, perPage = 1);
```

#### Parameters

| Parameter      | Type   | Description                                             |
| -------------- | ------ | ------------------------------------------------------- |
| `interactionOrMessage`      | Object | The message or interaction to reply to     |
| `contentArray` | Array  | An array of strings, where each item represents a page of content. |
| `perPage`      | Number | The number of items to show per page (default is 1).     |
| `customEmbed` *(optional)*     | Object | A `CustomEmbed` instance for styled pagination.     |

#### Message Command

Define a message command and use `handlePagination` within its handler.

```javascript
const contentArray = ['Content for page 1', 'Content for page 2', 'Content for page 3'];

client.on('messageCreate', async (message) => {
  if(message.content === `!description`){
    await handlePagination(message, contentArray, 1); // 1 item per page
  }else{
    console.log(`Not a valid input`);
    return;
  }
});
```

#### Slash Command

Define a slash command and use `handlePagination` within its handler.

```javascript
const { SlashCommandBuilder } = require('discord.js');
const { CustomEmbed, handlePagination } = require('leno.js');

const paginateCommand = {
    data: new SlashCommandBuilder()
        .setName('paginate')
        .setDescription('Test pagination'),
    async execute(interaction) {

      //Option 1 Providing Default Content
      const content = ['Content for page 1', 'Content for page 2', 'Content for page 3', 'Content for page 4', 'Content for page 5', 'Content for page 6', 'Content for page 7', 'Content for page 8', 'Content for page 9', 'Content for page 10'];

      //Optional Embed Option
      // Creating a custom embed (Should Not Add Description as it will auto populate based on content)
      //Only below parameters are allowed
      const ShopEmbed = new CustomEmbed()
        .setAuthor({ name: 'Leno Shop',iconURL :'https://lenobot.xyz/asset/Leno_Logo_New.png'  })
        .setColor() 
        .setFields({name : 'Leno', value : 'Pagination & Custom Package'})
        .setImage('https://lenobot.xyz/asset/Leno_Logo_New.png')
        .setTimestamp();

      await handlePagination(interaction, content, 5, ShopEmbed); // Paginate with 5 items per page

      //Without Optional Embed
      await handlePagination(interaction, content, 5); // Paginate with 5 items per page
    }
};

// Register the command with your bot
client.on('interactionCreate', async (interaction) => {
    if (interaction.commandName === 'paginate') {
        await paginateCommand.execute(interaction);
    }
});
```

## Example Bot Implementation

```javascript
const { Client, GatewayIntentBits,SlashCommandBuilder } = require('discord.js');
const { CustomEmbed, handlePagination } = require('leno.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.on('messageCreate', async (message) => {

  if(message.content === `!shop`){
      const contentArray = [
        'Shop Item 1 content',
        'Shop Item 2 content',
        'Shop Item 3 content',
        'Shop Item 4 content',
        'Shop Item 5 content',
        'Shop Item 6 content',
        'Shop Item 7 content',
        'Shop Item 8 content',
      ];

      //Optional Embed Option
      // Creating a custom embed (Should Not Add Description as it will auto populate based on content)
      //Only below parameters are allowed
      const ShopEmbed = new CustomEmbed()
        .setAuthor({ name: 'Leno Shop',iconURL :'https://lenobot.xyz/asset/Leno_Logo_New.png'  })
        .setColor() 
        .setFields({name : 'Leno', value : 'Pagination & Custom Package'})
        .setImage('https://lenobot.xyz/asset/Leno_Logo_New.png')
        .setTimestamp();

      await handlePagination(message, contentArray, 5, ShopEmbed); // Paginate with 5 items per page

      //Without Optional EMbed Option
      await handlePagination(message, contentArray, 5); // Display 5 item per page
  }else{
    console.log(`Not a valid command`);
    return;
  }
});

const paginateCommand = {
    data: new SlashCommandBuilder()
        .setName('paginate')
        .setDescription('Test pagination'),
    async execute(interaction) {

      //Option 1 Providing Default Content
      const content = ['Content for page 1', 'Content for page 2', 'Content for page 3', 'Content for page 4', 'Content for page 5', 'Content for page 6', 'Content for page 7', 'Content for page 8', 'Content for page 9', 'Content for page 10'];

      //Optional Embed Option
      // Creating a custom embed (Should Not Add Description as it will auto populate based on content)
      //Only below parameters are allowed
      const ShopEmbed = new CustomEmbed()
        .setAuthor({ name: 'Leno Shop',iconURL :'https://lenobot.xyz/asset/Leno_Logo_New.png'  })
        .setColor() 
        .setFields({name : 'Leno', value : 'Pagination & Custom Package'})
        .setImage('https://lenobot.xyz/asset/Leno_Logo_New.png')
        .setTimestamp();

      await handlePagination(interaction, content, 5, ShopEmbed); // Paginate with 5 items per page

      //Without Optional Embed
      await handlePagination(interaction, content, 5); // Paginate with 5 items per page
    }
};

// Register the command with your bot
client.on('interactionCreate', async (interaction) => {
    if (interaction.commandName === 'paginate') {
        await paginateCommand.execute(interaction);
    }
});

client.login('YOUR_BOT_TOKEN');
```

## License

This package is proprietary software. All rights reserved. Unauthorized copying, distribution, or modification is prohibited without prior permission.

## Contributions

We welcome contributions! Whether it's fixing bugs, adding features, or improving documentation, feel free to open a pull request or issue.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/P5P6JLCNY)

---

## Support

If you find this package useful, please give it a star ⭐ on GitHub! Your support helps keep the project alive and thriving.

---

## Acknowledgments

Special thanks to the amazing `discord.js` community for their continuous support and contributions to the ecosystem. 💖

---

## Contact Details

- [Discord Server](https://discord.gg/PNpVAp2vwP)
- [Our Site](https://lenobot.xyz)
- [Developer e-Mail](mailto:developer@lenobot.xyz)
- [Email Me](mailto:support@lenobot.xyz)
