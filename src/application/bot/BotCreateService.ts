import Bot from '../../domain/bot/Bot';
import { Client } from 'discord.js';

export default class BotCreateService {

  constructor() {}

  public createBot(discordAppKey: string): Bot {
    const client = new Client();
    client.login(discordAppKey);
    return new Bot(client);
  }
}