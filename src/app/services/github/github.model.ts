export type GithubLanguages = { [key: string]: number };

export interface GithubCommits {
  sha: string;
  node_id: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: Date;
    },
    committer: {
      name: string;
      email: string;
      date: Date;
    },
    message: string;
    tree: {
      sha: string;
      url: string;
    },
    url: string;
    comment_count: number;
    verification: {
      verified: boolean;
      reason: string;
      signature: string | null;
      payload: string | null;
    }
  },
  url: string;
  html_url: string;
  comments_url: string;
  author: string | null;
  committer: string | null;
  parents: [
    {
      sha: string;
      url: string;
      html_url: string;
    }
  ]
}
