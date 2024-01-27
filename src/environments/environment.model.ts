export interface EnvironmentModel {
  contact: {
    email: string;
    location: string;
    tel: string;
  },
  github: {
    apiUrl: string;
    languagesEndpoint: string;
    commitsEndpoint: string;
    repoUrl: string;
  },
  worldClockAPI: {
    headers: { [key: string]: string };
    url: string;
  };
}
