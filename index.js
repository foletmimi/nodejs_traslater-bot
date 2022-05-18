const Discord = require('discord.js');
const fs = require('fs');
const { clientId, token } = require('./config/config.json');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

client = new Discord.Client({ intents: Discord.Intents.FLAGS.GUILDS| Discord.Intents.FLAGS.GUILDS_MESSAGES});
//botのアクティビティの設定
client.on("ready", () => client.user.setActivity('起動完了', { status: "online" }));
//コマンドフォルダの指定
client.commands = new Discord.Collection();
const commandsPath = path.join(__dirname,'command');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file); 
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}
//スラッシュコマンド追加の処理をコンソールに表示と参加の表示
client.on('guildCreate', guild => {
    console.log(guild.name + 'に参加しました')
    const commands = [];
    const commandFiles = fs.readdirSync('./command').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./command/${file}`);
        commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '9' }).setToken(token);

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            const guildId = guild.id

            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
})

client.on('interactionCreate', async interaction => {　//コマンド処理部分
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) retun;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'コマンドの実行中にエラーが発生しました', ephemeral: true });
    }
});
client
.login(token)
.then(console.log("bot started"))