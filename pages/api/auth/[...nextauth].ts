
import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
      ],
	
		secret: process.env.NEXTAUTH_SECRET,

	pages: {
		signIn: '/auth/signin',
	},
		callbacks: {
		async session({ session, token, user}) {
			session.user.username = session.user.name
			.split(" ")
			.join("")
			.toLocaleLowerCase()
			session.user.uid = session.sub
			return session
		}

	},

}


export default NextAuth(authOptions)



// 	callbacks: {
// 		async session({ session, token, user}) {
// 			session.user.username = session.user.name
// 			.split(" ")
// 			.join("")
// 			.toLocaleLowerCase()
// 			session.user.uid = session.sub
// 			return session
// 		}

// 	},
// }