const TelegramBot = require('node-telegram-bot-api');

const token = '7729915916:AAG8OXiGPL5nHpIuE-_I8yCs-rHi05Yk5pE';
const webAppUrl = 'https://golden-paletas-f053f6.netlify.app/';
const bot = new TelegramBot(token, {polling: true});




bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    if(text === '/start') {
        await bot.sendMessage(chatId, 'Заходи в наш интернет магазин по кнопке ниже', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Сделать заказ', web_app: {url: webAppUrl}}]
                ]
            }
        })
    } else {
        bot.sendMessage(chatId, 'Received your message');
    }
    
    
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