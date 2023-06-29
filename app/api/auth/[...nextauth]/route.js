import NextAuth from 'next-auth';

import GoogleProvider from 'next-auth/providers/google';

import GithubProvider from 'next-auth/providers/github';
import { connectDB } from '@utils/db';
import User from '@models/user';

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: '',
      // process.env.GITHUB_ID
      clientSecret: '',
      // process.env.GITHUB_SECRET
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  async session({ session }) {
    try {
      // await connectDB();
      const userInSession = await User.findOne({ email: session.user.email });
      session.user.id = userInSession._id.toString();
      return session;
    } catch (error) {
      console.error(error);
      return session;
    }
  },
  async signIn({ profile }) {
    try {
      await connectDB();
      // check if a user already exist
      const userExists = await User.findOne({ email: profile.email });
      if (!userExists) {
        // if not, create a new user
        await User.create({
          username: profile.name.replace(' ', '').toLowerCase(),
          email: profile.email,
          image: profile.picture,
        });
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  // ...add more providers here
});

export { handler as GET, handler as POST };
