import { Message, VoiceChannel } from 'discord.js';

export default class CountEvent {
  private static readonly COMMAND_HEAD = '/count';

  public onEvent(message: Message) {
    if (!message.content.startsWith(CountEvent.COMMAND_HEAD)) return;
    const consoleMessage = this.createMessageOfCount(message);
    message.channel.send(consoleMessage);
  }

  private createMessageOfCount(message: Message): string {
    const currentVc = this.currentChanelByUser(message);
    if (!currentVc) return 'VCにログインしていません.VCにログインの上コマンドを打ってください';
    const count = currentVc.members.array().length;
    return '参加中のVCの接続人数: ' + count;
  }

  private currentChanelByUser(message: Message): VoiceChannel | undefined {
    const vcOnly = message.client.channels
      .array()
      .filter(channel => channel.type === 'voice')
      .map(channel => channel as VoiceChannel);

      const currentUserId = message.author.id;
      const currentVcs = vcOnly
      .filter(vc => vc.members.has(currentUserId))
    
      return currentVcs.length === 0 ? undefined : currentVcs[0];
  }
}