// import NextAuth from 'next-auth';

// import GoogleProvider from 'next-auth/providers/google';

// import GithubProvider from 'next-auth/providers/github';
// import { connectDB } from '@utils/db';

// import User from '@models/user';

// const handler = NextAuth({
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       secret: process.env.NEXTAUTH_SECRET,
//     }),
//     // GithubProvider({
//     //   clientId: '',

//     //   clientSecret: '',
//     // }),
//   ],

//   callbacks: {
//     async session({ session }) {
//       const userInSession = await User.findOne({ email: session.user.email });
//       session.user.id = userInSession._id.toString();
//       return session;
//     },
//   },
//   async signIn({ profile }) {
//     try {
//       await connectDB();
//       // check if a user already exist
//       const userExists = await User.findOne({ email: profile.email });
//       if (!userExists) {
//         // if not, create a new user
//         await User.create({
//           username: profile.name.replace(' ', '').toLowerCase(),
//           email: profile.email,
//           image: profile.picture,
//         });
//       }

//       return true;
//     } catch (error) {
//       console.error(error);
//       return false;
//     }
//   },

//   // ...add more providers here
// });

// export { handler as GET, handler as POST };

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/db';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log('Error checking if user exists: ', error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
