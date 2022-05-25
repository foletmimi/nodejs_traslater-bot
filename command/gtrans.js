const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const { MessageEmbed, message } = require('discord.js');

//以下翻訳部分処理
module.exports = {
	data: new SlashCommandBuilder()
		.setName('gtrans')
		.setDescription('google翻訳')
    .addStringOption( option => option.setName("文章").setDescription("翻訳する文章").setRequired(true))
    .addStringOption( option => option.setName("翻訳言語").setDescription("翻訳先の言語").setRequired(true).addChoices({
    				name: '日本語',
    				value: 'ja'
    			}).addChoices({
    				name: '英語',
    				value: 'en'
    			}).addChoices({
    				name: 'ブルガリア語',
    				value: 'bg'
    			}).addChoices({
    				name: 'チェコ語',
    				value: 'cs'
    			}).addChoices({
    				name: 'デンマーク語',
    				value: 'da'
    			}).addChoices({
    				name: 'ドイツ語',
    				value: 'de'
    			}).addChoices({
    				name: 'ギリシャ語',
    				value: 'el'
    			}).addChoices({
    				name: 'スペイン語',
    				value: 'es'
    			}).addChoices({
    				name: 'フィンランド語',
    				value: 'fi'
    			}).addChoices({
    				name: 'フランス語',
    				value: 'fr'
    			}).addChoices({
    				name: 'イタリア語',
    				value: 'it'
    			}).addChoices({
    				name: 'オランダ語',
    				value: 'nl'
    			}).addChoices({
    				name: 'ポーランド語',
    				value: 'pl'
    			}).addChoices({
    				name: 'ポルトガル語',
    				value: 'pt'
    			}).addChoices({
    				name: 'ルーマニア語',
    				value: 'ro'
    			}).addChoices({
    				name: 'ロシア語',
    				value: 'ru'
    			}).addChoices({
    				name: 'スロバキア語',
    				value: 'sk'
    			}).addChoices({
    				name: 'スロベニア語',
    				value: 'sl'
    			}).addChoices({
    				name: 'スウェーデン語',
    				value: 'sv'
    			}).addChoices({
    				name: '中国語(簡体)',
    				value: 'zh-CN'
          }).addChoices({
            name: '中国語(繁体)',
            value: 'zh-TW'
    			}))
    .addStringOption( option => option.setName("元言語").setDescription("元の文章の言語").setRequired(true).addChoices({
        		name: '日本語',
      			value: 'ja'
      			}).addChoices({
    				name: 'アメリカ英語',
    				value: 'en'
      			}).addChoices({
    				name: 'ブルガリア語',
    				value: 'bg'
    			}).addChoices({
    				name: 'チェコ語',
    				value: 'cs'
    			}).addChoices({
    				name: 'デンマーク語',
    				value: 'da'
    			}).addChoices({
    				name: 'ドイツ語',
    				value: 'de'
    			}).addChoices({
    				name: 'ギリシャ語',
    				value: 'el'
    			}).addChoices({
    				name: 'スペイン語',
    				value: 'es'
    			}).addChoices({
    				name: 'フィンランド語',
    				value: 'fi'
    			}).addChoices({
    				name: 'フランス語',
    				value: 'fr'
    			}).addChoices({
    				name: 'イタリア語',
    				value: 'it'
    			}).addChoices({
    				name: 'オランダ語',
    				value: 'nl'
    			}).addChoices({
    				name: 'ポーランド語',
    				value: 'pl'
    			}).addChoices({
    				name: 'ポルトガル語',
    				value: 'pt'
    			}).addChoices({
    				name: 'ルーマニア語',
    				value: 'ro'
    			}).addChoices({
    				name: 'ロシア語',
    				value: 'ru'
    			}).addChoices({
    				name: 'スロバキア語',
    				value: 'sk'
    			}).addChoices({
    				name: 'スロベニア語',
    				value: 'sl'
    			}).addChoices({
    				name: 'スウェーデン語',
    				value: 'sv'
    			}).addChoices({
    				name: '中国語(簡体)',
    				value: 'zh-CN'
          }).addChoices({
            name: '中国語(繁体)',
            value: 'zh-TW'
    			}))
					.addStringOption( option => option.setName("翻訳結果のみ").setDescription("翻訳結果のみほしい場合(2000文字超える際にも使用)")),
  async execute(interaction) {
    const text = interaction.options.getString('文章')
    const target = interaction.options.getString('翻訳言語')
    const source = interaction.options.getString('元言語')
    const result = interaction.options.getString('翻訳結果のみ')
    fetch(`?text=${text}&source=${source}&target=${target}`)
    .then( res => res.text() )
    .then( body => {
      const trans = body
      if ( result === null ) {
        interaction.reply({
          embeds: [new MessageEmbed()
          .setColor('#000000')
          .setTitle("翻訳")
          .setAuthor({ name: client.user.username , iconURL: client.user.avatarURL() })
          .setDescription(`原文:${text}\n原文の言語:${source}\n翻訳文章:${trans}\n翻訳言語${target}`)]
        })} else interaction.reply({
          embeds: [new MessageEmbed()
          .setColor('#000000')
          .setTitle("翻訳結果")
          .setAuthor({ name: client.user.username , iconURL: client.user.avatarURL() })
          .setDescription(`翻訳文章:${trans}\n翻訳言語${target}`)]
          })
      })
    }
}
