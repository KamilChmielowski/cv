import { GithubCommits, GithubLanguages } from './github.model';

export const githubLanguagesMock: GithubLanguages = {
  'TypeScript': 85168,
  'SCSS': 14675,
  'HTML': 10308,
};

export const githubCommitsMock: GithubCommits = {
  sha: 'b7285123b03e7831412fc1d343e94d5a2d914510',
  node_id: 'C_kwDOKhi0LdoAKGI3Mjg1MTIzYjAzZTc4MzE0MTJmYzFkMzQzZTk0ZDVhMmQ5MTQ1MTA',
  commit: {
    author: {
      name: 'Kamil Chmielowski',
        email: 'kamil.chmielowski@comarch.com',
        date: new Date('2024-01-30T07:13:10Z')
    },
    committer: {
      name: 'Kamil Chmielowski',
        email: 'kamil.chmielowski@comarch.com',
        date: new Date('2024-01-30T07:13:10Z')
    },
    message: 'feat: projects gallery',
      tree: {
      sha: 'eca2da16eb5999b80a3e9c5a101b4733921a4573',
      url: 'https://api.github.com/repos/KamilChmielowski/cv/git/trees/eca2da16eb5999b80a3e9c5a101b4733921a4573'
    },
    url: 'https://api.github.com/repos/KamilChmielowski/cv/git/commits/b7285123b03e7831412fc1d343e94d5a2d914510',
      comment_count: 0,
      verification: {
        verified: false,
        reason: 'unsigned',
        signature: null,
        payload: null
    }
  },
  url: 'https://api.github.com/repos/KamilChmielowski/cv/commits/b7285123b03e7831412fc1d343e94d5a2d914510',
  html_url: 'https://github.com/KamilChmielowski/cv/commit/b7285123b03e7831412fc1d343e94d5a2d914510',
  comments_url: 'https://api.github.com/repos/KamilChmielowski/cv/commits/b7285123b03e7831412fc1d343e94d5a2d914510/comments',
  author: null,
  committer: null,
  parents: [
    {
      sha: '9cc4c1e20c660dcc9c0d097f7a2123b11f7de11b',
      url: 'https://api.github.com/repos/KamilChmielowski/cv/commits/9cc4c1e20c660dcc9c0d097f7a2123b11f7de11b',
      html_url: 'https://github.com/KamilChmielowski/cv/commit/9cc4c1e20c660dcc9c0d097f7a2123b11f7de11b'
    }
  ]
};
