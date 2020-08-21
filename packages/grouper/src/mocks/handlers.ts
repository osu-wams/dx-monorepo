import { rest } from 'msw';
import wsGetMemberResults from './wsGetMemberResults';

export const handlers = [
  rest.post(/\/groups$/, (req, res, ctx) => {
    const {
      WsRestGetMembersRequest: { wsGroupLookups },
    } = JSON.parse(JSON.stringify(req.body));
    const group = wsGetMemberResults.WsGetMembersResults.results.filter(r =>
      wsGroupLookups.some((gl: any) => gl.groupName === r.wsGroup.name),
    );
    return res(
      ctx.status(200),
      ctx.json({
        ...wsGetMemberResults,
        WsGetMembersResults: { results: group },
      }),
    );
  }),
];
