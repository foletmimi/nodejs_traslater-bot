const { SlashCommandBuilder } = require('@discordjs/builders');
const { deepl } = require('../config/config.json');
const axios = require('axios');
const { MessageEmbed, message } = require('discord.js');

//以下翻訳部分処理
module.exports = {
	data: new SlashCommandBuilder()
		.setName('retranslate')
		.setDescription('翻訳')
		.addStringOption(option => option.setName('文章').setDescription('翻訳する言葉を入力').setRequired(true)) //翻訳文章
		.addStringOption(option => option.setName('言語').setDescription('何語に翻訳するか選択').setRequired(true) //翻訳言語
			.addChoices({
				name: '日本語',
				value: 'JA'
			}).addChoices({
				name: 'アメリカ英語',
				value: 'EN-US'
			}).addChoices({
				name: 'イギリス英語',
				value: 'EN-GB'
			}).addChoices({
				name: 'ブルガリア語',
				value: 'BG'
			}).addChoices({
				name: 'チェコ語',
				value: 'CS'
			}).addChoices({
				name: 'デンマーク語',
				value: 'DA'
			}).addChoices({
				name: 'ドイツ語',
				value: 'DE'
			}).addChoices({
				name: 'ギリシャ語',
				value: 'EL'
			}).addChoices({
				name: 'スペイン語',
				value: 'ES'
			}).addChoices({
				name: 'フィンランド語',
				value: 'FI'
			}).addChoices({
				name: 'フランス語',
				value: 'FR'
			}).addChoices({
				name: 'イタリア語',
				value: 'IT'
			}).addChoices({
				name: 'オランダ語',
				value: 'NL'
			}).addChoices({
				name: 'ポーランド語',
				value: 'PL'
			}).addChoices({
				name: 'ポルトガル語(ブラジルポルトガル語以外）',
				value: 'PT-PT'
			}).addChoices({
				name: 'ポルトガル語',
				value: 'PT-BR'
			}).addChoices({
				name: 'ルーマニア語',
				value: 'RO'
			}).addChoices({
				name: 'ロシア語',
				value: 'RU'
			}).addChoices({
				name: 'スロバキア語',
				value: 'SK'
			}).addChoices({
				name: 'スロベニア語',
				value: 'SL'
			}).addChoices({
				name: 'スウェーデン語',
				value: 'SV'
			}).addChoices({
				name: '中国語',
				value: 'ZH'
			}))
	  .addStringOption(option => option.setName('再翻訳言語').setDescription('再翻訳で使う言語').setRequired(true).addChoices({
      name: '日本語',
      value: 'JA'
    }).addChoices({
      name: 'アメリカ英語',
      value: 'EN-US'
    }).addChoices({
      name: 'イギリス英語',
      value: 'EN-GB'
    }).addChoices({
      name: 'ブルガリア語',
      value: 'BG'
    }).addChoices({
      name: 'チェコ語',
      value: 'CS'
    }).addChoices({
      name: 'デンマーク語',
      value: 'DA'
    }).addChoices({
      name: 'ドイツ語',
      value: 'DE'
    }).addChoices({
      name: 'ギリシャ語',
      value: 'EL'
    }).addChoices({
      name: 'スペイン語',
      value: 'ES'
    }).addChoices({
      name: 'フィンランド語',
      value: 'FI'
    }).addChoices({
      name: 'フランス語',
      value: 'FR'
    }).addChoices({
      name: 'イタリア語',
      value: 'IT'
    }).addChoices({
      name: 'オランダ語',
      value: 'NL'
    }).addChoices({
      name: 'ポーランド語',
      value: 'PL'
    }).addChoices({
      name: 'ポルトガル語(ブラジルポルトガル語以外）',
      value: 'PT-PT'
    }).addChoices({
      name: 'ポルトガル語',
      value: 'PT-BR'
    }).addChoices({
      name: 'ルーマニア語',
      value: 'RO'
    }).addChoices({
      name: 'ロシア語',
      value: 'RU'
    }).addChoices({
      name: 'スロバキア語',
      value: 'SK'
    }).addChoices({
      name: 'スロベニア語',
      value: 'SL'
    }).addChoices({
      name: 'スウェーデン語',
      value: 'SV'
    }).addChoices({
      name: '中国語',
      value: 'ZH'
    })),
	async execute(interaction) {
		const text = interaction.options.getString('文章')
		const target = interaction.options.getString('言語')
		const relang = interaction.options.getString('再翻訳言語')
		axios.post('https://api-free.deepl.com/v2/translate?' +
			 'auth_key=' + `${deepl}` + '&' +
			 'text=' + encodeURIComponent(`${text}`) + '&' +
			 'target_lang=' + `${target}`)
			 .then(response => {
				 const lang = response.data.translations[0].detected_source_language
				 const trans = response.data.translations[0].text
					//応答部分||埋め込み
					 interaction.reply({
						embeds: [new MessageEmbed()
							.setColor('#FFFFFF')
							.setTitle('翻訳')
							.setAuthor({ name: client.user.username , iconURL: client.user.avatarURL() })
							.setDescription(`原文:${text}\n原文の言語:${lang}\n翻訳文章:${trans}\n翻訳言語${target}`)]
            })})
            axios.post('https://api-free.deepl.com/v2/translate?' +
               'auth_key=' + `${deepl}` + '&' +
               'text=' + encodeURIComponent(`${text}`) + '&' +
               'target_lang=' + `${target}`)
               .then(response => {
                 const lang = response.data.translations[0].detected_source_language
                 const trans = response.data.translations[0].text
              axios.post('https://api-free.deepl.com/v2/translate?' +
          			 'auth_key=' + `${deepl}` + '&' +
          			 'text=' + encodeURIComponent(`${trans}`) + '&' +
          			 'target_lang=' + `${relang}`)
                 .then(response => {
                   const retrans = response.data.translations[0].text
                    interaction.followUp({
                     embeds: [new MessageEmbed()
                       .setColor('#FFFFFF')
                       .setTitle('再翻訳')
                       .setAuthor({ name: client.user.username , iconURL: client.user.avatarURL() })
                       .setDescription(`文章:${retrans}\n言語${relang}`)]
                 })
              })
				})
		}
}
