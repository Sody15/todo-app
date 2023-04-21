import { comparePassword } from '@/lib/auth';
import MongoUtil from '@/lib/mongo-util';
import { User as UserModel } from '@/models';
import NextAuth, { AuthOptions, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

interface ExtendedUserType extends User {
  id: string;
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    // Set session id from token
    async session({ session, token }) {
      (session.user as ExtendedUserType).id = (token as ExtendedJWTType).user.id;
      return session;
    },
    // Set token
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
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

            console.log(user._id);
            return { id: user._id?.toString(), name: user.userName };
          }
        } catch (err) {
          return null;
        }
      },
    }),
    // ...add more providers here
  ],
};

// Get userId from session
export const getUserId = (session: Session) => {
  const { id: userId } = session.user as ExtendedUserType;
  return userId;
};

export default NextAuth(authOptions);
