import Parameters from './infrastracture/config/Parameters';
import BotCreateService from './application/bot/BotCreateService';

export default class ConsoleApplication {
  public async run(argv: string[]) {
    const parameters = new Parameters(argv);
    parameters.analyzeArgs();
    const key = parameters.discordAppKey;

    const service = new BotCreateService();
    const bot = service.createBot(key);
    
    bot.run();
  }
}
