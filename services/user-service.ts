import { User } from '@/models';
import { headers } from './util';

export const signUp = (user: User): Promise<any> => {
  return fetch('/api/users/signup', {
    method: 'POST',
    body: JSON.stringify(user),
    headers,
  }).then(async (res) => {
    if (res.ok) {
      return await res.json();
    }
    throw Error(await res.json());
  });
};

export const login = (user: User): Promise<any> => {
  return fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers,
  }).then((res) => res.json());
};
