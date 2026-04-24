export function isAuthenticated({ req }: any): boolean {
  const user = req?.user ?? req?.payload?.user ?? req?.context?.user
  return Boolean(user)
}

export const publicRead = () => true
