const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('サバの情報'),
	async execute(interaction) {
		return interaction.reply(`サーバーの名前: ${interaction.guild.name}\n メンバー数:${interaction.guild.memberCount}`);
	},
};
