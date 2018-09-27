import Bot from '../../domain/bot/Bot';

export default class BotCreateService {

  constructor() {}

  public createBot(discordAppKey: string): Bot {
    return new Bot();
  }
}