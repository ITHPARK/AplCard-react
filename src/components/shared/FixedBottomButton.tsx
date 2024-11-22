import { createPortal } from 'react-dom'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import Button from '@shared/Button'
import { colors } from '@styles/colorPalette'

interface FixedBottomButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
}

const FixedBottomButton = ({
  label,
  onClick,
  disabled,
}: FixedBottomButtonProps) => {
  const $portalRoot = document.getElementById('root-portal')

  if ($portalRoot == null) {
    return null
  }

  return createPortal(
    // portal이 있다면 아래 레이아웃을 추가해준다.
    <Container>
      <Button
        size="medium"
        onClick={onClick}
        full={true}
        css={buttonStyles}
        disabled={disabled}
      >
        {label}
      </Button>
    </Container>,
    $portalRoot,
  )
}

const slideup = keyframes`
  to {
    transform: translateY(0);
  }
  
`

const Container = styled.div`
  padding: 20px 18px 8px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  transform: translateY(100%);
  animation: ${slideup} 0.5s ease-in-out forwards;
`
//forwards는 애니메이션 유지

const buttonStyles = css`
  border-radius: 8px;
`

export default FixedBottomButton
