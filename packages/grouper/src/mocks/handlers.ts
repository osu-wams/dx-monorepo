import { http, HttpResponse } from 'msw';
import wsGetMemberResults from './wsGetMemberResults';

export const handlers = [
  http.post(/\/groups$/, async ({ request }) => {
    const {
      WsRestGetMembersRequest: { wsGroupLookups },
    } = (await request.json()) as any;
    const group = wsGetMemberResults.WsGetMembersResults.results.filter(r =>
      wsGroupLookups.some((gl: any) => gl.groupName === r.wsGroup.name),
    );
    return HttpResponse.json(
      {
        ...wsGetMemberResults,
        WsGetMembersResults: { results: group },
      },
      { status: 200 },
    );
  }),
  http.get(/\/groups\/.+\/members/, () => {
    return HttpResponse.json(
      {
        WsHasMemberLiteResult: {
          resultMetadata: {
            resultCode: 'IS_MEMBER',
          },
        },
      },
      { status: 200 },
    );
  }),
];
