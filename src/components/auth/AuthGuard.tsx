//인증 컴포넌트
import { onAuthStateChanged } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '@remote/firebase'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@atoms/user'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  //로그인 인증처리가 되었는지의 상태
  const [initialize, setInitialize] = useState(false)

  const setUser = useSetRecoilState(userAtom)

  //인증처리
  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
      })
    } else {
      setUser(null)
    }

    setInitialize(true)
  })
  if (initialize === false) {
    return null
  }

  return <div>{children}</div>
}

export default AuthGuard
