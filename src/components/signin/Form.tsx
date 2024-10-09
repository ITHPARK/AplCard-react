import { useState, ChangeEvent, useCallback, useMemo } from 'react'
import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import Button from '@shared/Button'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import Spacing from '../shared/Spacing'
import { FormValuesProps } from '@models/signin'
import validator from 'validator'
import { Link } from 'react-router-dom'
import { colors } from '@styles/colorPalette'

const Form = ({
  onSubmit,
}: {
  onSubmit: (fromValues: FormValuesProps) => void
}) => {
  const [formValues, setFormValues] = useState<FormValuesProps>({
    email: '',
    password: '',
  })

  //input들이 최초로 포커싱이 된적이 있는지의 상태를 관리하는 state
  const [dirty, setDirty] = useState<Partial<FormValuesProps>>({})

  //포커스가 떨어졌을 때 설정
  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: true,
    }))
  }, [])

  //input을 입력할 때 formValues state를 업데이트하는 함수
  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])

  const isSubmit = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        name="email"
        placeholder="Example@example.com"
        onChange={handleFormValues}
        value={formValues.email}
        onBlur={handleBlur}
        hasError={Boolean(dirty.email) && Boolean(errors.email)} // 객체의 키값이 존재하는지 Boolean값으로 확인
        helpMessage={Boolean(dirty.email) ? errors.email : ''}
      />
      <Spacing size={16} />
      <TextField
        label="패스워드"
        name="password"
        type="password"
        onChange={handleFormValues}
        value={formValues.password}
        onBlur={handleBlur}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty.password) ? errors.password : ''}
      />

      <Spacing size={16} />

      <Button
        size="medium"
        disabled={isSubmit === false}
        onClick={() => {
          onSubmit(formValues)
        }}
      >
        로그인
      </Button>
      <Spacing size={16} />

      <Link to="/signup" css={linkStyles}>
        <Text typography="t7">아직 계정이 없으신가요?</Text>
      </Link>
    </Flex>
  )
}

const formContainerStyles = css`
  padding: 24px;
`
//유효성 검사 함수
const validate = (formValues: FormValuesProps) => {
  let errors: Partial<FormValuesProps> = {}

  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요'
  }

  if (formValues.password.length < 8) {
    errors.password = '8자 이상의 비밀번호를 입력하세요'
  }

  return errors
}

const linkStyles = css`
  text-align: center;

  & > span:hover {
    color: ${colors.blue};
  }
`

export default Form
