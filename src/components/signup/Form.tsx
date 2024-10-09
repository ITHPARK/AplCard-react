import { useState, ChangeEvent, useCallback, useMemo } from 'react'
import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import FixedBottomButton from '@shared/FixedBottomButton'
import { css } from '@emotion/react'
import Spacing from '../shared/Spacing'
import { FormValuesProps } from '@models/signup'
import validator from 'validator'

const Form = ({
  onSubmit,
}: {
  onSubmit: (formValues: FormValuesProps) => void
}) => {
  //input 입력값 객체
  const [formValues, setFormValues] = useState<FormValuesProps>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })

  //input이 최초로 포커싱 또는 입력된 이후의 상태
  const [dirty, setDirty] = useState<Partial<FormValuesProps>>({})

  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: 'true',
    }))
  }, [])

  //input을 입력할 때 formValues state를 업데이트하는 함수
  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues, // 바뀐 값만 수정해야하므로 복사해서 변경
      [e.target.name]: e.target.value,
    }))
  }, [])

  //formValues가 바뀌면 데이터를 다시 검사
  const errors = useMemo(() => validate(formValues), [formValues])

  //제출가능한 상태 에러객체의 키가 없으면 제출 가능한 상태
  const isSubmit = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="Example@example.com"
        value={formValues.email}
        onChange={handleFormValues}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={Boolean(dirty.email) ? errors.email : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        name="password"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty.password) ? errors.password : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드 재입력"
        name="rePassword"
        type="password"
        value={formValues.rePassword}
        onChange={handleFormValues}
        hasError={Boolean(dirty.rePassword) && Boolean(errors.rePassword)}
        helpMessage={Boolean(dirty.rePassword) ? errors.rePassword : ''}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        name="name"
        placeholder="Example"
        value={formValues.name}
        onChange={handleFormValues}
        hasError={Boolean(dirty.name) && Boolean(errors.name)}
        helpMessage={Boolean(dirty.name) ? errors.name : ''}
        onBlur={handleBlur}
      />

      <FixedBottomButton
        label="회원가입"
        disabled={isSubmit === false}
        onClick={() => {
          onSubmit(formValues)
        }}
      />
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`
//input에 입력된 데이터 유효성 검사를 위한 함수
const validate = (formValues: FormValuesProps) => {
  //에러 리턴문
  let errors: Partial<FormValuesProps> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요'
  }

  if (formValues.password.length < 8) {
    errors.password = '8자 이상의 비밀번호를 입력하세요'
  }

  if (formValues.rePassword.length < 8) {
    errors.rePassword = '8자 이상의 비밀번호를 입력하세요'
  } else if (
    validator.equals(formValues.rePassword, formValues.password) === false
  ) {
    errors.rePassword = '비밀번호를 확인해주세요'
  }

  if (formValues.name.length < 2) {
    errors.name = '2자 이상의 이름을 입력하세요'
  }

  return errors
}

export default Form
