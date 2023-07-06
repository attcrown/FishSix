export default async function (session) {
  await import('firebase/compat/firestore')

  const firestoreService = session.firestore()

  return firestoreService
}
