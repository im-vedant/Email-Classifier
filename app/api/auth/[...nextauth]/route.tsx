import NextAuth, { getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret : process.env.NEXTAUTH_SECRET,
  providers: [
    //Google provider for authentication with google
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization:{
            params:{
                scope :'profile email openid https://www.googleapis.com/auth/gmail.readonly',//scopes for authentication
                access_type: "offline"
            }
        }
      })
    
  ],
  callbacks: {
    async jwt({token,user, account}:{token : any,user:any, account : any}) {
      if (account) {
        token = Object.assign({}, token, { access_token: account.access_token ,refresh_token:account.refresh_token});//saving the access token and refresh token in the token object
      }//This is done because google provider sends access token and refresh token in the account object
      return token
    },
    async session({session, token}:{session : any, token : any}) {
   
    if(session) {
      session = Object.assign({}, session, {access_token: token.access_token,refresh_token: token.refresh_token});//saving the access token and refresh token in the session object
   
      }
//now the session contains access token and google refresh token which can be used to access the google api
    return session
    }
  }
}

const handler=NextAuth(authOptions)


export {handler as GET , handler as POST}
export const getAuthSession = () => getServerSession(authOptions)