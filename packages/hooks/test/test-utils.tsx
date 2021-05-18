import { RecoilRoot } from 'recoil';
import React from 'react';
import { userState } from '../src/state/application';
import { User } from '@osu-wams/lib';
import { QueryClient, QueryClientProvider } from 'react-query';
import { updateQueryClientOptions } from '../src/queryClient';

export const mockUser = jest.fn(() => User.mockUser.user);

export const wrapperWithUser = ({ children }: any) => {
  const queryClient = new QueryClient();
  updateQueryClientOptions(queryClient, {
    baseUrl: '/',
    enabled: true,
    headers: {},
    retry: true,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot
        initializeState={snap => {
          snap.set(userState, mockUser());
        }}
      >
        {children}
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export const wrapper = ({ children }: any) => wrapperWithUser({ children });
