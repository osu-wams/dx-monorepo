export default {
  data: {
    items: [
      {
        channelId: 'dashboard',
        content: 'content',
        contentShort: 'contentShort',
        deliveredAt: '2020-01-01T16:20:00.000Z',
        imageUrl: 'https://blah.png',
        messageId: 'message-id-01',
        osuId: '111111111',
        sendAt: '2020-01-01T16:20:00.000Z',
        status: 'SENT',
        title: 'Title',
      },
    ],
    lastKey: undefined,
  },
  loading: false,
  error: false,
};

export const readMessage = {
  data: {
    items: [
      {
        channelId: 'dashboard',
        content: 'content',
        contentShort: 'contentShort',
        deliveredAt: '2020-01-01T16:20:00.000Z',
        imageUrl: 'https://blah.png',
        messageId: 'message-id-01',
        osuId: '111111111',
        sendAt: '2020-01-01T16:20:00.000Z',
        status: 'READ',
        title: 'Title',
      },
    ],
    lastKey: undefined,
  },
  loading: false,
  error: false,
};

export const threeMessages = {
  data: {
    items: [
      {
        channelId: 'dashboard',
        content: 'first message body content',
        contentShort: '1contentShort',
        deliveredAt: '2020-01-01T16:20:00.000Z',
        imageUrl: 'https://blah.png',
        messageId: 'message-id-01',
        osuId: '111111111',
        sendAt: '2020-01-01T16:20:00.000Z',
        status: 'SENT',
        title: 'First Message Title',
      },
      {
        channelId: 'dashboard',
        content: 'second message body content',
        contentShort: '2contentShort',
        deliveredAt: '2020-01-01T16:20:00.000Z',
        imageUrl: 'https://blah.png',
        messageId: 'message-id-01',
        osuId: '111111111',
        sendAt: '2020-01-01T16:20:00.000Z',
        status: 'READ',
        title: 'Second Message Title',
      },
      {
        channelId: 'dashboard',
        content: 'third message content',
        contentShort: '3contentShort',
        deliveredAt: '2020-01-01T16:20:00.000Z',
        imageUrl: 'https://blah.png',
        messageId: 'message-id-01',
        osuId: '111111111',
        sendAt: '2020-01-01T16:20:00.000Z',
        status: 'SENT',
        title: 'Third Message Title',
      },
    ],
    lastKey: undefined,
  },
  loading: false,
  error: false,
};
