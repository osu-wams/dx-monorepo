/* eslint-disable no-unused-vars */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { cache } from '@osu-wams/lib';
import useAPICall from './useAPICall';
import { act, wait } from '@testing-library/react';

jest.mock('@osu-wams/lib');

interface APICall {
  api: jest.Mock<any, any>;
  query: string | undefined;
  dataTransform: jest.Mock<any, any>;
  initialState: {} | undefined;
  errorAPICall: jest.Mock<any, any>;
  useCache: boolean;
  errorCallback: jest.Mock<any, any>;
}
const testArgs: APICall = {
  api: jest.fn(),
  query: undefined,
  dataTransform: jest.fn(),
  initialState: {},
  errorAPICall: jest.fn(),
  useCache: false,
  errorCallback: jest.fn(),
};

const HookWrapper: React.FC = () => {
  const { data = {}, loading, error, setData } = useAPICall(
    testArgs.api,
    testArgs.query,
    testArgs.dataTransform,
    testArgs.initialState,
    testArgs.errorAPICall,
    testArgs.useCache,
    testArgs.errorCallback,
  );
  return (
    <div>
      {!loading && <span data-testid="data">{Object.values(data).join(',')}</span>}
      <span data-testid="loading">{loading.toString()}</span>
      <span data-testid="error">{error.toString()}</span>
    </div>
  );
};

beforeEach(() => {
  testArgs.api = jest.fn();
  testArgs.errorCallback = jest.fn();
  testArgs.dataTransform = jest.fn(d => d);
  testArgs.api.mockResolvedValue({ bob: 'ross' });
});

describe('useAPICall', () => {
  it('performs the call', async () => {
    const { getByTestId, queryByTestId } = render(<HookWrapper />);

    // Awaiting the initial call avoids act test warnings
    await wait(() => expect(testArgs.api).toHaveBeenCalled());
    expect(testArgs.errorCallback).not.toHaveBeenCalled();

    const isLoading = await getByTestId('loading');
    expect(isLoading).toHaveTextContent('false');

    const isError = await getByTestId('error');
    expect(isError).toHaveTextContent('false');

    const data = await queryByTestId('data');
    expect(data).toHaveTextContent('ross');
    expect(testArgs.dataTransform).toHaveBeenCalled();
    expect(cache.setItem).toHaveBeenCalled();
  });

  it('handles an HTTP 401', async () => {
    testArgs.api.mockRejectedValue({ response: { status: 401 } });
    render(<HookWrapper />);
    await wait(() => expect(testArgs.api).toHaveBeenCalled());
    expect(testArgs.errorCallback).not.toHaveBeenCalled();
    expect(window.location.assign).toHaveBeenCalled();
  });

  it('handles an HTTP 403', async () => {
    testArgs.api.mockRejectedValue({ response: { status: 403 } });
    const { getByTestId } = render(<HookWrapper />);
    await wait(() => expect(testArgs.api).toHaveBeenCalled());

    setTimeout(async () => {
      const isLoading = await getByTestId('loading');
      expect(isLoading).toHaveTextContent('false');

      const isError = await getByTestId('error');
      expect(isError).toHaveTextContent('true');

      expect(cache.removeItem).toHaveBeenCalled();

      expect(testArgs.errorCallback).toHaveBeenCalled();
    }, 50);
  });

  it('handles an HTTP 500', async () => {
    testArgs.api.mockRejectedValue({ response: { status: 500 } });
    const { getByTestId } = render(<HookWrapper />);
    await wait(() => expect(testArgs.api).toHaveBeenCalled());

    setTimeout(async () => {
      const isLoading = await getByTestId('loading');
      expect(isLoading).toHaveTextContent('false');

      const isError = await getByTestId('error');
      expect(isError).toHaveTextContent('true');

      expect(cache.removeItem).toHaveBeenCalled();
      expect(testArgs.errorCallback).toHaveBeenCalled();
    }, 50);
  });
});
