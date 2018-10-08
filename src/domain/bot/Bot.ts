import { Client } from 'discord.io';
import CountEvent from './CountEvent';

export default class Bot {
  private readonly discordClient: Client;

  constructor(discordClient: Client) {
    this.discordClient = discordClient;
  }

  public run() {
    const client = this.discordClient;
    client.on('ready', (evt) => {
      console.log('Connected');
      console.log(`Logged in as: ${client.username}(${client.id})`);
    });

    const countEvent = new CountEvent(this.discordClient);
    client.on('message',
      (user, userID, channelID, message, event) =>
      countEvent.onEvent(user, userID, channelID, message, event)
    );
  }
}