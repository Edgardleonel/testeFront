export interface User {
  key: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string
  };
  address: {
    geo: {
      lat: string;
      lng: string;
    }
  };
  favorite: boolean;
}
