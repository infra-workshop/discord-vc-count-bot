import * as program from 'commander';

export default class Parameters {
  private _discordAppKey: string | undefined;

  constructor(args: string[]) {
    program
      .option('-k, --discord-app-key [value]', 'Discordのアプリケーションキー')
      .parse(args);
  }

  public analyzeArgs() {
    if (program.discordAppKey === undefined)
      throw new Error('パラメータ「Discordのアプリケーションキー」を指定してください。');
    this._discordAppKey = program.discordAppKey;
  }

  public get discordAppKey(): string {
    return this._discordAppKey as string;
  }
}
