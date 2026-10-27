import { http, HttpResponse } from 'msw';
import { getMembers, isMember } from '../src/index';
import { server, GROUPER_CLIENT } from '../src/mocks/server';

it('queries members from groups', async () => {
  const results = await getMembers(GROUPER_CLIENT, ['stem:name:group_name'], ['id'], { pageNumber: 1, pageSize: 10 });
  expect(results).toHaveLength(1);
  expect(results.map(r => r.subjects?.map(s => s.id))).toStrictEqual([['useridone', 'useridtwo']]);
});

it('does not find members in an invalid group', async () => {
  const results = await getMembers(GROUPER_CLIENT, ['non-existent-group'], ['id']);
  expect(results).toHaveLength(0);
});

it('finds member in group', async () => {
  const results = await isMember(GROUPER_CLIENT, 'stem:name:group_name', 'test');
  expect(results === true);
});

it('handles an error', async () => {
  server.use(
    http.post(/\/groups$/, () => {
      return HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }),
  );
  try {
    await getMembers(GROUPER_CLIENT, ['stem:name:group_name'], ['id']);
  } catch (err) {
    expect((err as Error).message).toBe('Request failed with status code 500');
  }
});
