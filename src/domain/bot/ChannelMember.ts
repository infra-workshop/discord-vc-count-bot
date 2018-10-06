export default interface ChannelMember {
  user_id: string;
  suppress: boolean;
  session_id: string;
  self_video: boolean;
  self_mute: boolean;
  self_deaf: boolean;
  mute: boolean;
  deaf: boolean;
  channel_id: string
}