import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

const googleUrlAuth = 'https://www.googleapis.com/auth'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          scope: `${googleUrlAuth}/userinfo.email ${googleUrlAuth}/userinfo.profile ${googleUrlAuth}/calendar`,
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (!account?.scope?.includes(`${googleUrlAuth}/calendar`)) {
        return '/register/connect-calendar/?error=permissions'
      }
      return true
    },
  },
}

export default NextAuth(authOptions)
