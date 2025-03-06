export function splitUserLogin(req: UserLoginResponse): [UserLoginResponse, string] {
  const cleanObject = Object.assign({}, req)
  delete cleanObject.token
  return [cleanObject, req.token as string]
}