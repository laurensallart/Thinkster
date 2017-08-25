import { Profile } from './profile.model';
import { Client } from './client.model';

export class Session {
  slug: string;
  title: string = '';
  description: string = '';
  date: string = '';
  durationInMinutes: number = 0;
  client: Client;
  createdAt: string;
  updatedAt: string;
  author: Profile;
}
