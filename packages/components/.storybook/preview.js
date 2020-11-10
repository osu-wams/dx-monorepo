import { withTheme, paddedContainer } from '../src/stories/decorators';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [withTheme, paddedContainer];
