const {
  Client,
  GatewayIntentBits,
  PermissionsBitField,
} = require("discord.js");
require("dotenv").config();
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildIntegrations],
});

// Replace this with your bot token
console.log(process.env.TOKEN);
const TOKEN = process.env.TOKEN;
// Replace this with the path to your image file or a URL
const DEFAULT_ICON =
  "https://cdn.discordapp.com/icons/1094730877138907218/523c6c21a348782aa9159582260e03f6.webp"; // or 'https://example.com/image.png'

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("guildUpdate", async (oldGuild, newGuild) => {
  try {
    // Check if the icon has changed
    if (oldGuild.iconURL() !== newGuild.iconURL()) {
      // Check if bot has permission to manage server
      const botMember = newGuild.members.me;
      if (!botMember.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
        console.log(`Bot lacks Manage Server permission in ${newGuild.name}`);
        return;
      }

      // Reset the icon to the default image
      await newGuild.setIcon(DEFAULT_ICON);
      console.log(`Server icon reset to default in ${newGuild.name}`);
    }
  } catch (error) {
    console.error("Error resetting server icon:", error);
  }
});

client.login(TOKEN);
