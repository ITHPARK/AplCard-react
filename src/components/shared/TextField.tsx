import {
  forwardRef,
  InputHTMLAttributes,
  useState,
  FocusEventHandler,
} from 'react'
import Text from './Text'
import Input from './Input'

//input이 가지는 props들을 속성으로 추가
interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
  hasError?: boolean
  helpMessage?: React.ReactNode
}

//forwardRef: React에서 함수 컴포넌트가 부모 컴포넌트로부터 전달받은 ref를 내부의 DOM 요소나 자식 컴포넌트에 전달할 수 있도록 하는 함수
const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    { label, hasError, helpMessage, onFocus, onBlur, ...props },
    ref,
  ) {
    const [focused, setFocused] = useState(false)
    const labelColor = hasError ? 'red' : focused ? 'blue' : 'black'

    const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(true)
      onFocus?.(event)
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      setFocused(false)
      onBlur?.(event)
    }

    return (
      <div>
        {label ? (
          <Text typography="t7" color={labelColor} display="inline-block">
            {label}
          </Text>
        ) : null}

        <Input
          ref={ref}
          aria-invalid={hasError}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {helpMessage ? (
          <Text
            typography="t7"
            color={labelColor}
            display="inline-block"
            style={{ marginTop: 6, fontSize: 12 }}
          >
            {helpMessage}
          </Text>
        ) : null}
      </div>
    )
  },
)

export default TextField
