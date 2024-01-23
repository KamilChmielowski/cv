import { EnvironmentModel } from './environment.model';

export const environment: EnvironmentModel = {
  contact: {
    email: 'kamilchmielowski94@gmail.com',
    location: 'PL, Gliwice',
    tel: '48 459 413 344',
  },
  worldClockAPI: {
    headers: {
      'X-RapidAPI-Key': '5342b1c5bbmshed6f38ea124fc16p1bb353jsnfa4eb77a9c57',
      'X-RapidAPI-Host': 'world-clock.p.rapidapi.com',
    },
    url: 'https://world-clock.p.rapidapi.com/json/utc/now',
  }
};
