const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('users')
		.setDescription('ユーザー'),
	async execute(interaction) {
		return interaction.reply(`タグ: ${interaction.user.tag}\nID:${interaction.user.id}`);
	},
};