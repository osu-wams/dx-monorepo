import * as storageCache from './storageCache';

import { storageMock } from '../../../setupTests';

describe('getItem', () => {
  it('return null on error', () => {
    storageMock.getItem = jest.fn((): string | null => {
      throw new Error('bam');
    });

    expect(storageCache.getItem('test-set-item')).toBeNull();
  });
  it('return an object', () => {
    storageMock.getItem = jest.fn((): string | null => {
      return '{"bob":"ross"}';
    });

    expect(storageCache.getItem('test-set-item')).toStrictEqual({ bob: 'ross' });
  });
});

describe('setItem', () => {
  it('return undefined on error', () => {
    storageMock.setItem = jest.fn((): void => {
      throw new Error('bam');
    });

    expect(storageCache.setItem('test-set-item', 'test')).toBeUndefined();
  });
});

describe('removeItem', () => {
  it('return undefined on error', () => {
    storageMock.removeItem = jest.fn((): void => {
      throw new Error('bam');
    });

    expect(storageCache.removeItem('test-set-item')).toBeUndefined();
  });
});

describe('clear', () => {
  it('return undefined on error', () => {
    storageMock.clear = jest.fn((): void => {
      throw new Error('bam');
    });

    expect(storageCache.clear()).toBeUndefined();
  });
});
