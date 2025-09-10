import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Simple hardcoded admin authentication for MVP
        if (credentials?.email === process.env.ADMIN_EMAIL && 
            credentials?.password === process.env.ADMIN_PASSWORD) {
          return {
            id: '1',
            email: process.env.ADMIN_EMAIL,
            name: 'Admin User',
            role: 'admin'
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as 'admin' | 'user'
      }
      return session
    }
  },
  pages: {
    signIn: '/admin/login'
  }
}