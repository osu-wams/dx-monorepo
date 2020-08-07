export interface Subject {
  id: string;
  memberId: string;
  name: string;
  resultCode: string;
  sourceId: string;
  success: "T" | "F";
}

export interface Group {
  description: string;
  displayName: string;
  enabled: "T" | "F";
  name: string;
}

export interface GetMembersResults {
  WsGetMembersResults: {
    resultMetadata: {
      success: "T" | "F";
      resultCode: string;
      resultMessage: string;
    };
    results: {
      resultMetadata: {
        resultCode: string;
        success: "T" | "F";
      };
      wsGroup?: Group;
      wsSubjects?: Subject[];
    }[];
  };
}

export interface Stem {
  name: string;
  description: string;
  idIndex: string;
  uuid: string;
}
export interface FindStemsResults {
  WsFindStemsResults: {
    resultMetadata: {
      success: "T" | "F";
      resultCode: string;
      resultMessage: string;
    };
    stemResults: Stem[];
  };
}
