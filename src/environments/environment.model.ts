export interface EnvironmentModel {
  contact: {
    email: string;
    location: string;
    tel: string;
  },
  worldClockAPI: {
    headers: { [key: string]: string };
    url: string;
  };
}
