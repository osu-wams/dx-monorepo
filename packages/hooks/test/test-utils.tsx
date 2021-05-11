import { RecoilRoot } from 'recoil';
import React from 'react';
import { userState } from '../src/state/application';
import { User } from '@osu-wams/lib';

export const wrapper = ({ children }: any) => <RecoilRoot>{children}</RecoilRoot>;

export const wrapperWithUser = ({ children }: any) => (
  <RecoilRoot
    initializeState={snap => {
      snap.set(userState, User.mockUser.user);
    }}
  >
    {children}
  </RecoilRoot>
);
