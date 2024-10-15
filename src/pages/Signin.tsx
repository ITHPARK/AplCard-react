import { useCallback } from 'react'
import Form from '@components/signin/Form'
import { FormValuesProps } from '@/models/signin'
import { auth } from '@remote/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { useAlertContext } from '@/context/AlertContext'
import { useNavigate } from 'react-router-dom'

const SigninPage = () => {
  const { open } = useAlertContext() //Alert을 띄우기 위한 함수
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    async (formValues: FormValuesProps) => {
      const { email, password } = formValues

      try {
        //입력된 이메일, 패스워드 검사
        await signInWithEmailAndPassword(auth, email, password)

        alert('로그인 성공')

        navigate('/')
      } catch (e) {
        // firebase 의 에러
        if (e instanceof FirebaseError) {
          if (e.code === 'auth/wrong-password') {
            open({
              title: '계정의 정보를 다시 확인해주세요',
              onButtonClick: () => {
                //
              },
            })

            return
          }
        }

        // 일반적인 에러
        open({
          title: '잠시 후 다시 시도해주세요.',
          onButtonClick: () => {
            //
          },
        })
      }
    },
    [open],
  )

  return <Form onSubmit={handleSubmit} />
}

export default SigninPage
