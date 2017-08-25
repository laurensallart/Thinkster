import { Profile } from './profile.model';

export class Client {
  slug: string;
  firstName: string = '';
  lastName: string = '';
  telephone: string = '';
  street: string = '';
  postalCode: number = 0;
  city: string = '';
  birthday: string;
  createdAt: string;
  updatedAt: string;
  author: Profile;
}
