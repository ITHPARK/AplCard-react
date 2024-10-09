import { atom } from 'recoil'
import { User } from '@models/user'

//recoil 유저정보 저장
export const userAtom = atom<User | null>({
  key: 'auth/User',
  default: null,
})
