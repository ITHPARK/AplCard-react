import { useRecoilValue } from 'recoil'
import { userAtom } from '@atoms/user'

const useUser = () => {
  return useRecoilValue(userAtom)
}

export default useUser
