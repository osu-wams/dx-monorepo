import { rest } from 'msw';
import { getMembers } from '../src/index';
import { server, GROUPER_CLIENT } from '../src/mocks/server';

it('queries members from groups', async () => {
  const results = await getMembers(GROUPER_CLIENT, ['stem:name:group_name'], ['id']);
  expect(results).toHaveLength(1);
  expect(results.flatMap(r => r.subjects?.map(s => s.id))).toStrictEqual(['useridone', 'useridtwo']);
});

it('does not find members in an invalid group', async () => {
  const results = await getMembers(GROUPER_CLIENT, ['non-existent-group'], ['id']);
  expect(results).toHaveLength(0);
});

it('handles an error', async () => {
  server.use(
    rest.post(/\/groups$/, (_req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: 'Internal Server Error' }));
    }),
  );
  try {
    await getMembers(GROUPER_CLIENT, ['stem:name:group_name'], ['id']);
  } catch (err) {
    expect(err.message).toBe('Request failed with status code 500');
  }
});
