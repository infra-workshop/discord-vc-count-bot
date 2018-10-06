import { Client, Channel } from 'discord.io';
import ChannelMember from './ChannelMember';

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
    const count = this.memmbersOf(currentVc).length;
    return `${currentUserName} さんが参加中のVC "${currentVc.name}" の接続人数 : ${count}`;
  }

  private currentChanelOf(currentUserId: string): Channel | undefined {
    const allCannels = Object.values(this.discordClient.channels);
    const vcOnly = allCannels.filter(channel => this.isVc(channel));
    const currentVcs = vcOnly.filter(vc => this.hasMember(vc, currentUserId));
    return currentVcs.length === 0 ? undefined : currentVcs[0];
  }

  private hasMember(channel: Channel, currentUserId: string): boolean {
    const members = this.memmbersOf(channel);
    return members.filter(member => member.user_id === currentUserId).length > 0;
  }

  private memmbersOf(channel: Channel): ChannelMember[] {
    return Object.values(channel.members);
  }

  private isVc(channel: Channel): boolean {
    return parseInt(channel.type) === 2;
  }
}