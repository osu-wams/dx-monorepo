export interface Subject {
  id: string;
  memberId: string;
  name: string;
  resultCode: string;
  sourceId: string;
  success: 'T' | 'F';
}

export interface Group {
  description: string;
  displayName: string;
  enabled: 'T' | 'F';
  name: string;
}

export interface GetMembersResults {
  WsGetMembersResults: {
    resultMetadata: {
      success: 'T' | 'F';
      resultCode: string;
      resultMessage: string;
    };
    results: {
      resultMetadata: {
        resultCode: string;
        success: 'T' | 'F';
      };
      wsGroup?: Group;
      wsSubjects?: Subject[];
    }[];
  };
}

export interface isMemberResult {
  WsHasMemberLiteResult: {
    resultMetadata: {
      success: 'T' | 'F';
      resultCode: string;
      resultMessage: string;
    };
    wsGroup: {
      extension: string;
      displayName: string;
      description: string;
      uuid: string;
      enabled: 'T' | 'F';
      displayExtension: string;
      name: string;
      typeOfGroup: string;
      idIndex: string;
    };
    wsSubject: Subject;
    resonseMetaData: {
      serverVersion: string;
      millis: string;
    };
  };
}
