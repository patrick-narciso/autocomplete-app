import { AxiosError } from 'axios';
import client from './config';

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const getUsers = (): Promise<User[]> => {
  return new Promise<User[]>((resolve, reject) => {
    client.get<User[]>('/users')
    .then((response) => resolve(response.data))
    .catch((error: AxiosError<string>) => reject(error));
  });
};

export { getUsers };