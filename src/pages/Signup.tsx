import React from 'react'
import Form from '@/components/signup/Form'
import { FormValuesProps } from '@/models/signup'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { auth, store } from '@remote/firebase'
import { COLLECTIONS } from '@/constants'
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {
  const navigate = useNavigate()

  const handleSubmit = async (formValues: FormValuesProps) => {
    const { email, password, name } = formValues

    //회원가입 유저 정보 인증
    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    //displayName을 설정
    await updateProfile(user, {
      displayName: name,
    })

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: name,
    }

    //유저정보를 저장하는데 doc함수에서  id를 직접 지정해서 넣어주고  setDoc로 db에 추가
    await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser)

    //로그인 처리
    navigate('/')
  }

  return <Form onSubmit={handleSubmit} />
}

export default SignupPage
