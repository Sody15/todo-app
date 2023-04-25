import NextAuth, { AuthOptions, DefaultSession, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

import { comparePassword } from '@/lib/auth';
import MongoUtil from '@/lib/mongo-util';
import { User as UserModel } from '@/models';

interface ExtendedSessionType extends DefaultSession {
  user: {
    id: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

interface ExtendedJWTType extends JWT {
  user: {
    id: string;
  };
}

export const authOptions: AuthOptions = {
  secret: <string>process.env.JWT_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    // Set token
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    // Set session id from token
    async session({ session, token }) {
      (session as ExtendedSessionType).user!.id = (token as ExtendedJWTType).user.id;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      // @ts-ignore
      async authorize(credentials) {
        try {
          if (credentials) {
            const { userName, password } = credentials;

            const db = await MongoUtil.getDb();
            const col = db.collection('users');

            // Check if user exists
            const user = await col.findOne<UserModel>({ userName });

            if (!user) {
              throw Error('No user found!');
            }

            // Compare password
            const isValid = await comparePassword(password, user.password!);

            if (!isValid) {
              throw Error('Could not log you in!');
            }

            return { id: user._id?.toString(), name: user.userName };
          }
        } catch (err) {
          return null;
        }
      },
    }),
  ],
};

// Get userId from session
export const getUserId = (session: Session): string | null => {
  const { id: userId } = (session as ExtendedSessionType).user;
  return userId;
};

export default NextAuth(authOptions);
