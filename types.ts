export type Repository = {
  name: string;
  id: string;
  url: string;
  object: {
    history: {
      totalCount: number;
    };
  };
  stargazers: {
    totalCount: number;
  };
};

export type ListRepositoriesResponse = {
  viewer: {
    name: string;
    repositories: {
      nodes: Repository[];
    };
  };
};

export type CreateRepositoryVariables = {
  repositoryId: string;
  title: string;
  body: string;
};

export type Issue = {
  number: number;
  body: string;
  title: string;
};

export type CreateIssueResponse = {
  createIssue: {
    issue: Issue;
  };
};
