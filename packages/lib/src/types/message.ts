export type MessageType = 'success' | 'info' | 'warn' | 'error';

// Application message (toast-style pop up message)
export interface Message {
  type: MessageType;
  body?: string;
  title: string;
}
