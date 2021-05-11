import { canvasUrl } from '../src/canvas';

describe('canvasUrl', () => {
  it('returns the main url', () => {
    expect(canvasUrl('')).toBe('https://canvas.oregonstate.edu');
  });
  it('returns the old url replaced with new one', () => {
    expect(canvasUrl('https://oregonstate.instructure.com/blah')).toBe('https://canvas.oregonstate.edu/blah');
  });
  it('returns the supported url', () => {
    expect(canvasUrl('https://canvas.oregonstate.edu/blah')).toBe('https://canvas.oregonstate.edu/blah');
    expect(canvasUrl('https://oregonstate.beta.instructure.com/blah')).toBe(
      'https://oregonstate.beta.instructure.com/blah',
    );
    expect(canvasUrl('https://oregonstate.test.instructure.com/blah')).toBe(
      'https://oregonstate.test.instructure.com/blah',
    );
  });
  it('returns the a relative url concatenated to the main url', () => {
    expect(canvasUrl('/blah')).toBe('https://canvas.oregonstate.edu/blah');
  });
});
