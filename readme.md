# 最初に
私が最初に作ったDiscordの翻訳botです。プログラミングを初めてまだまだなので汚い部分もあると思います。
開発環境は以下の通りです。
- VS2019 ver16.11.13
- node v16.13.0
- npm v8.3.1
- atom v1.60.0
- Windows11

# botのセットアップ
configフォルダ内にあるconfig.jsonの中に必要な部分を入力。
```
npm install
```
でモジュールのインストールをしてセットアップは終了です。

# Googleの翻訳を使用するための準備
https://qiita.com/tanabee/items/c79c5c28ba0537112922  
で翻訳のスクリプトを作成してconfig.jsonのgoogletransURLに入力

# 起動方法
```
npm start
```
では実行できません。（作ってないだけです）
```
node index.js
```
で起動してください。

# コマンド
すべてスラッシュコマンドとなっています。  
ping users serverはドキュメントみて作ったのを置いたままにしてあるだけですので気にしないでください。  
helpコマンドを追加しました。そちらをご確認ください。

# 使用時の注意
このbotはDeepLの無料APIで動作するように作られています。有料プランをご使用の場合はcommand/translate.jsの
```
https://api-free.deepl.com/v2/translate
```
を以下のように変更してください。
```
https://api.deepl.com/v2/translate
```
