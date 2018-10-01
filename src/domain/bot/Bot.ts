import { Client } from 'discord.js';
import CountEvent from './CountEvent';

export default class Bot {
  private readonly discordClient: Client;

  constructor(discordClient: Client) {
    this.discordClient = discordClient;
  }

  public run() {
    const client = this.discordClient;
    const countEvent = new CountEvent();
    client.on('ready', () => client.on('message', countEvent.onEvent));
  }
}