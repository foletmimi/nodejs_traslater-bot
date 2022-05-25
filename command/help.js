const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, message } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('ヘルプを表示'),
	async execute(interaction) {
		interaction.reply({
      embeds: [new MessageEmbed()
        .setColor('#00ff00')
        .setTitle("翻訳botの使い方")
        .setAuthor({ name: client.user.username , iconURL: client.user.avatarURL() })
        .setDescription('すべてのコマンドはスラッシュコマンドで動きます。\n頭に`g`とつくものはグーグル翻訳を用いています。ない場合はDeepLを用いります。')
        .addFields(
          { name: "user,server,ping", value: "これらのコマンドはすべて動作確認用です。pingコマンドはpingコマンドとしての役割を果たしません" },
          { name: "translate,gtransコマンド", value: "これらのコマンドは通常翻訳をします。\n見方としましては、原文は入力された文章を、原文の言語は原文に使用されている言語コードです(gtransの場合は元言語で指定された言語)\n翻訳文章は入力された文章の翻訳文を、翻訳言語は指定された言語の言語コードです。\nまた、埋め込みが2000文字に到達した場合投稿ができないため、翻訳結果のみ表示できる設定もあります。\n使用例:`/translate 文章:test 言語:日本語 (翻訳結果のみ:有効)`\n`/gtrans 文章:test 翻訳言語:日本語 元言語:英語`" },
          { name: "retranslate,gretransコマンド", value: "これらのコマンドは一度翻訳した内容を再度翻訳して返します。一度使用されてみるとわかると思われます。\n見方は基本的にtranslateと一緒です。\n使用例`/retranslate 文章:こんにちは 言語:アメリカ英語 再翻訳言語:日本語`\n`/gretrans 文章:こんにちは 翻訳言語:英語 元言語:日本語`"}
        )]
    });
	},
};
