import Bot from '../../domain/bot/Bot';
import {
  Client
} from 'discord.js';

export default class BotCreateService {

  constructor() {}

  public createBot(discordAppKey: string): Bot {
    // TODO DiscordClientを作る、キーを差し込む。
    const client = new Client();
    return new Bot(client);
  }
}