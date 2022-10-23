import { useQuery } from 'react-query'

export function useUserData(userId) {
  const userData = useQuery(['user', userId], () =>
    fetch(`/api/users/${userId}`).then((res) => res.json())
  )

  return userData
}
