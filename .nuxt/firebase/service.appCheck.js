export default async function (session) {
  // Can only be initiated on client side
  if (!process.client) {
    return
  }

    await import(/* webpackChunkName: 'firebase-app-check' */'firebase/compat/app-check')

  const appCheckService = session.appCheck()

  return appCheckService
}
