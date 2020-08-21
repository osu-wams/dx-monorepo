export default {
  WsGetMembersResults: {
    resultMetadata: {
      success: 'T',
      resultCode: 'success',
      resultMessage: 'success',
    },
    results: [
      {
        resultMetadata: {
          resultCode: 'success',
          success: 'T',
        },
        wsGroup: {
          description: 'group name',
          displayName: 'long group name',
          enabled: 'T',
          name: 'stem:name:group_name',
        },
        wsSubjects: [
          {
            id: 'useridone',
            memberId: 'memberid',
            name: 'User Name',
            resultCode: 'success',
            sourceId: 'ldap',
            success: 'T',
          },
          {
            id: 'useridtwo',
            memberId: 'memberid',
            name: 'User Name',
            resultCode: 'success',
            sourceId: 'ldap',
            success: 'T',
          },
        ],
      },
    ],
  },
};
