export function isAuthenticated({ req, user }: any): boolean {
  const resolvedUser = user ?? req?.user ?? req?.payload?.user ?? req?.context?.user
  return Boolean(resolvedUser)
}

export const publicRead = () => true
