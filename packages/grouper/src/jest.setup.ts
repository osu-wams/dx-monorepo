import { server } from './mocks/server';
beforeAll(() => server.listen());

afterEach(() => {
  server.restoreHandlers();
  jest.clearAllMocks();
});

afterAll(() => server.close());
