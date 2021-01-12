export type MessageType = 'success' | 'info' | 'warn' | 'error';

// Application message (toast-style pop up message)
export interface Message {
  body: string;
  id?: string;
  title: string;
  type: MessageType;
  visible: boolean;
}
