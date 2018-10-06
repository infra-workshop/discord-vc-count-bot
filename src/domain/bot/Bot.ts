import { Client } from 'discord.io';
import CountEvent from './CountEvent';

export default class Bot {
  private readonly discordClient: Client;

  constructor(discordClient: Client) {
    this.discordClient = discordClient;
  }

  public run() {
    const client = this.discordClient;
    const countEvent = new CountEvent(this.discordClient);
    client.on('ready', () => client.on('message',
      (user, userID, channelID, message, event) => countEvent.onEvent(user, userID, channelID, message, event)
    ));
  }
}