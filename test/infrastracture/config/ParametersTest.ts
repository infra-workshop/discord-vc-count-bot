import Parameters from '../../../src/infrastracture/config/Parameters';

describe('Parameeters のテスト', () => {
  it('パラメータ指定を解析し、DiscordのAppKeyを取得することが出来る', () => {
    const args = ['current/dir', 'current.js', '--discord-app-key', 'AbC'];
    const sut = new Parameters(args);

    sut.analyzeArgs();

    expect(sut.discordAppKey).toEqual('AbC');
  });

  it('パラメータ指定を解析し、省略名でもDiscordのAppKeyを取得することが出来る', () => {
    const args = ['current/dir', 'current.js', '-k', 'DeF'];
    const sut = new Parameters(args);

    sut.analyzeArgs();

    expect(sut.discordAppKey).toEqual('DeF');
  });

});