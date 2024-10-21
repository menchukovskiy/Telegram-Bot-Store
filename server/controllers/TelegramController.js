const TelegramBot = require('node-telegram-bot-api');
const token = '7729915916:AAG8OXiGPL5nHpIuE-_I8yCs-rHi05Yk5pE';

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received your message111131231');
  });


 class TelegramStore {

    async getStore(req, res, next){
        bot.on('message', (msg) => {
            const chatId = msg.chat.id;
            bot.sendMessage(chatId, 'Received your message');
          });
    }

 }


 module.exports = new TelegramStore()