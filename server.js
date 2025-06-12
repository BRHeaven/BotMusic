import { Client, GatewayIntentBits, Collection } from "discord.js";
import fs from 'fs';
import path from "path";
import { config } from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { setupDistube } from "./distubeClient.js";
config();
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});
setupDistube(client)
client.commands = new Collection();
//Load tất cả command trong folder Commands
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pathFolders = path.join(__dirname, 'Commands');
const commandFolder = fs.readdirSync(pathFolders);
for (const folder of commandFolder) {
    const commandPath = path.join(pathFolders, folder);
    const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = await import(`file://${path.join(commandPath, file)}`);
        client.commands.set(command.name, command);
        if (command.aliases && Array.isArray(command.aliases)) {
            for (const alias of command.aliases) {
                client.commands.set(alias, command);
            };
        };
        console.log( client.commands, `load Commands line 28`);
    };
}
client.on('ready', () => { console.log(`Server online ${client.user.tag}`) });
client.on('messageCreate', async message => {
    //console.log(message)
    if (!message.guild || message.author.bot) return;
    const prefix = process.env.PREFIX || '7';
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    console.log(commandName);
    const command = client.commands.get(commandName);
    if (!command) {
        console.log(command);
        command = [...client.commands.values()].find( cmd => cmd.aliases?.includes(commandName));
    };
    console.log(command, `command line 39`);
    if (command) {
        try {
            //console.log(command);
            await command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            message.reply('❌ Có lỗi xảy ra khi thực thi lệnh.');
        };
    };
});
client.login(process.env.DISCORD_TOKEN);