export default function isDocumentReference(ref: any): ref is firebase.firestore.DocumentReference {
  return ref && ref !== null;
}
