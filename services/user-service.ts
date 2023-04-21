import { User } from '@/models';
import { headers } from './util';

export const signUp = (user: User): Promise<any> => {
  return fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify(user),
    headers,
  }).then(async (res) => {
    const response = await res.json();
    if (!res.ok) {
      console.log(response.message);
      throw Error(response.message);
      return;
    }
    return response;

    // return await res.json();
  });
};
