import React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  ButtonColor,
  ButtonTranparent,
  ButtonSize,
  buttonColorMap,
  buttonTransparentMap,
  buttonSizeMap,
} from '@styles/button'
import Flex from './Flex'
import Text from './Text'
import Spacing from './Spacing'

//버튼 타입
interface ButtonProps {
  color?: ButtonColor
  transparent?: boolean
  size?: ButtonSize
  full?: boolean // 버튼 가로를 채울지
  disabled?: boolean //버튼 비활성화
}

const BaseButton = styled.button<ButtonProps>(
  {
    cursor: 'pointer',
    fontWeight: 'bold',
    borderRadius: '6px',
  },
  ({ color = 'primary', transparent }) =>
    transparent ? buttonTransparentMap[color] : buttonColorMap[color],
  ({ size = 'small' }) => buttonSizeMap[size],
  ({ full }) =>
    full
      ? css`
          display: block;
          width: 100%;
          border-radius: 0;
        `
      : undefined,
  ({ disabled }) =>
    disabled
      ? css`
          opacity: 0.26;
          cursor: initial;
        `
      : undefined,
)

const ButtonGroup = ({
  title,
  children,
}: {
  title?: string
  children: React.ReactNode
}) => {
  return (
    <Flex direction="column">
      {title != null ? (
        <>
          <Text typography="t6" bold={true}>
            {title}
          </Text>
          <Spacing size={8} />
        </>
      ) : null}
      <Flex css={buttonGroupStyles}>{children}</Flex>
    </Flex>
  )
}

const buttonGroupStyles = css`
  flex-wrap: wrap;
  gap: 18px;

  & button {
    flex: 1;
  }
`
const Button = BaseButton as typeof BaseButton & {
  //BaseButton을 Button이라는 이름으로 다시 선언, 원래 BaseButton 타입을 그대로 유지
  Group: typeof ButtonGroup //Button과 Button.Group을 하나의 컴포넌트처럼 사용하기 위해서 설정
}

Button.Group = ButtonGroup

export default Button
