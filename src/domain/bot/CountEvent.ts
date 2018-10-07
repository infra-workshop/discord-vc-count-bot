import { Client } from 'discord.io';
import ChannelWrapper from '../channel/ChannelWrapper';

export default class CountEvent {
  private readonly discordClient: Client;

  public constructor(discordClient: Client) {
    this.discordClient = discordClient;
  }

  public onEvent(user: string, userID: string, channelID: string, message: string, event: any) {
    if (!message.startsWith('/count')) return;
    const consoleMessage = this.messageOfCount(userID, user);
    this.discordClient.sendMessage({
      to: channelID,
      message: consoleMessage
    });
  }

  private messageOfCount(currentUserId: string , currentUserName: string): string {
    const currentVc = this.voiceChannelOf(currentUserId);
    if (!currentVc) return `${currentUserName} さんはVC未参加です。VC参加後コマンドを実行下さい。`;
    const count = currentVc.members().length;
    return `${currentUserName} さんが参加中のVC "${currentVc.name}" の接続人数 : ${count}`;
  }

  private voiceChannelOf(userId: string): ChannelWrapper | undefined {
    const allCannels = Object.values(this.discordClient.channels)
      .map(channel => new ChannelWrapper(channel));
    const vcsOnly = allCannels.filter(channel => channel.isVc());
    const liveVcs = vcsOnly.filter(vc => vc.hasMember(userId));
    return liveVcs.length === 0 ? undefined : liveVcs[0];
  }
}