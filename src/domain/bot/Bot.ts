import { Client, Message } from 'discord.js';

export default class Bot {
  private readonly discordClient: Client;

  constructor(discordClient: Client) {
    this.discordClient = discordClient;
  }

  public run() {
    const client = this.discordClient;
    client.on('ready', () => {
      client.on('message',  (message: Message) => {
        if (message.content.startsWith('/count')) {
          let exists = false;
          let num = 0;
          client.channels.forEach((channel, id) => {
            if (channel.type === 'voice') {
              if (channel.members.has(message.author.id)) {
                exists = true;
                channel.members.forEach(function () {
                  num = num + 1;
                })
              }
            }
          })
          if (exists) {
            var msg = '参加中のVCの接続人数: ' +  num;
            message.channel.send(msg);
          } else {
            message.channel.send('VCにログインしていません.VCにログインの上コマンドを打ってください');
          }
        }
      })
    })
  }


}