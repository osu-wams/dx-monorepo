import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { wrapper } from '../test-utils';
import {
  useTrainings,
  useTrainingsState,
  getTrainings,
  getTrainingAudiences,
  useTrainingAudiences,
  getTrainingTags,
  useTrainingTags,
  mockTrainings,
  mockTrainingAudiences,
  mockTrainingTags,
} from '../../src/api/trainings';

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

describe('getTrainings', () => {
  it('gets trainings on successful returns', async () => {
    mock.onGet('/api/trainings').replyOnce(200, mockTrainings.data);
    const result = await getTrainings();
    expect(result).toEqual(mockTrainings.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/trainings').replyOnce(500);
    await getTrainings().catch(err => expect(err.message).toEqual('Request failed with status code 500'));
  });
});

describe('useTrainings', () => {
  it('performs the call', async () => {
    mock.onGet('/api/trainings').replyOnce(200, mockTrainings.data);
    const { result, waitForNextUpdate } = renderHook(() => useTrainings(), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
  });

  it('handles an error', async () => {
    mock.onGet('/api/trainings').replyOnce(500, '');
    const { result, waitForNextUpdate } = renderHook(() => useTrainings(), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(1);
  });
});

describe('useTrainingsState', () => {
  it('performs the call', async () => {
    mock.onGet('/api/trainings').replyOnce(200, mockTrainings.data);
    const { result, waitForNextUpdate } = renderHook(() => useTrainingsState(), { wrapper });
    expect(result.current.trainings.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.trainings.isLoading).toBeFalsy();
    expect(result.current.trainings.data).toEqual(mockTrainings.data);
  });

  it('handles an error', async () => {
    mock.onGet('/api/trainings').replyOnce(500, '');
    const { result, waitForNextUpdate } = renderHook(() => useTrainingsState(), { wrapper });
    expect(result.current.trainings.isLoading).toBeTruthy();
    expect(result.current.trainings.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.trainings.data).toEqual([]);
    expect(result.current.trainings.isLoading).toBeTruthy();
    expect(result.current.trainings.isSuccess).toBeFalsy();
  });
});

describe('getTrainingTags', () => {
  it('gets training types on successful returns', async () => {
    mock.onGet('/api/trainings/tags').replyOnce(200, mockTrainingTags.data);
    const result = await getTrainingTags();
    expect(result).toEqual(mockTrainingTags.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/trainings/tags').replyOnce(500);
    await getTrainingTags().catch(err => expect(err.message).toEqual('Request failed with status code 500'));
  });
});

describe('useTrainingTags', () => {
  it('performs the call', async () => {
    mock.onGet('/api/trainings/tags').replyOnce(200, mockTrainingTags.data);
    const { result, waitForNextUpdate } = renderHook(() => useTrainingTags(), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
  });

  it('handles an error', async () => {
    mock.onGet('/api/trainings/tags').replyOnce(500, '');
    const { result, waitForNextUpdate } = renderHook(() => useTrainingTags(), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(1);
  });
});

describe('getTrainingAudiences', () => {
  it('gets training audiences on successful returns', async () => {
    mock.onGet('/api/trainings/audiences').replyOnce(200, mockTrainingAudiences.data);
    const result = await getTrainingAudiences();
    expect(result).toEqual(mockTrainingAudiences.data);
  });
  it('handles api error', async () => {
    mock.onGet('/api/trainings/audiences').replyOnce(500);
    await getTrainingAudiences().catch(err => expect(err.message).toEqual('Request failed with status code 500'));
  });
});

describe('useTrainingAudiences', () => {
  it('performs the call', async () => {
    mock.onGet('/api/trainings/audiences').replyOnce(200, mockTrainingAudiences.data);
    const { result, waitForNextUpdate } = renderHook(() => useTrainingAudiences(), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
  });

  it('handles an error', async () => {
    mock.onGet('/api/trainings/audiences').replyOnce(500, '');
    const { result, waitForNextUpdate } = renderHook(() => useTrainingAudiences(), { wrapper });
    expect(result.current.isLoading).toBeTruthy();
    expect(result.current.isError).toBeFalsy();
    await waitForNextUpdate();
    expect(result.current.failureCount).toBe(1);
  });
});
