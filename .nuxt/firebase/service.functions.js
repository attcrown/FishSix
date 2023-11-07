export default async function (session) {
  await import('firebase/compat/functions')

  const functionsService = session.functions()

  return functionsService
}
