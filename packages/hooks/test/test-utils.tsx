import { RecoilRoot } from 'recoil';
import React from 'react';

export const wrapper = ({ children }: any) => <RecoilRoot>{children}</RecoilRoot>;
