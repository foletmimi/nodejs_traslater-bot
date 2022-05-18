﻿const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('ポング！ぽんぐ！ﾎﾟﾝｸﾞ！'),
	async execute(interaction) {
		return interaction.reply("ピングー！？");
	},
};