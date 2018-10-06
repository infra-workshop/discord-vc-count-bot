import { Client } from 'discord.io';
import ChannelWrapper from '../channel/ChannelWrapper';

export default class CountEvent {
  private readonly discordClient: Client;

  public constructor(discordClient: Client) {
    this.discordClient = discordClient;
  }

  public onEvent(user: string, userID: string, channelID: string, message: string, event: any) {
    if (!message.startsWith('/count')) return;
    const consoleMessage = this.createMessageOfCount(userID, user);
    this.discordClient.sendMessage({
      to: channelID,
      message: consoleMessage
    });
  }

  private createMessageOfCount(currentUserId: string , currentUserName: string): string {
    const currentVc = this.currentChanelOf(currentUserId);
    if (!currentVc) return `${currentUserName} さんはVC未参加です。VC参加後コマンドを実行下さい。`;
    const count = currentVc.members().length;
    return `${currentUserName} さんが参加中のVC "${currentVc.name}" の接続人数 : ${count}`;
  }

  private currentChanelOf(currentUserId: string): ChannelWrapper | undefined {
    const allCannels = Object.values(this.discordClient.channels)
      .map(channel => new ChannelWrapper(channel));
    const vcOnly = allCannels.filter(channel => channel.isVc());
    const currentVcs = vcOnly.filter(vc => vc.hasMember(currentUserId));
    return currentVcs.length === 0 ? undefined : currentVcs[0];
  }
}