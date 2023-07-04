export default async function (session) {
  await import('firebase/compat/database')

  const databaseService = session.database()

  return databaseService
}
