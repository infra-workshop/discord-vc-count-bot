import { Channel } from 'discord.io';
import ChannelMember from './ChannelMember';

export default class ChannelWrapper {
  private readonly source : Channel;

  constructor(source : Channel) {
    this.source = source;
  }

  public isVc(): boolean {
    return parseInt(this.source.type) === 2;
  }

  public members() : ChannelMember[] {
    return Object.values(this.source.members);
  }

  public hasMember(userId: string) : boolean {
    return this.members()
      .filter(member => member.user_id === userId)
      .length > 0;
  }
}