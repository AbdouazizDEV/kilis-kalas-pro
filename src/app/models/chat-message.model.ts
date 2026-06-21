export type ChatMessageType = 'text' | 'audio' | 'image';

export interface ChatMessage {
  id: string;
  type: ChatMessageType;
  sent: boolean;
  time: string;
  text?: string;
  imageUrl?: string;
  audioUrl?: string;
  audioDurationSec?: number;
}

export const CHAT_EMOJIS = [
  '😀', '😂', '😍', '🙂', '😉', '😎', '🥳', '😢',
  '😡', '👍', '👏', '🙏', '💪', '🔥', '❤️', '💚',
  '✅', '⭐', '🚗', '📍', '📦', '📞', '⏰', '🎉',
];
