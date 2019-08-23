export default function isUserCredential(user: any): user is firebase.auth.UserCredential {
  return user && user.user !== undefined;
}
