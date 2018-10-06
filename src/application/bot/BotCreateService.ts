import Bot from '../../domain/bot/Bot';
import { Client } from 'discord.io';

export default class BotCreateService {
  public createBot(discordAppKey: string): Bot {
    const client = new Client({
      token: discordAppKey,
      autorun: true
    });
    return new Bot(client);
  }
}