import styled from '@emotion/styled'
import { colors } from '@styles/colorPalette'
import Dimmed from '@shared/Dimmed'
import Text from '@shared/Text'
import Flex from '@shared/Flex'
import Button from '@shared/Button'

interface AlertProps {
  open?: boolean
  title: React.ReactNode
  description?: React.ReactNode
  buttonLabel?: string
  onButtonClick: () => void
}

const Alert = ({
  open,
  title,
  description,
  buttonLabel = '확인',
  onButtonClick,
}: AlertProps) => {
  if (open === false) {
    return null
  }

  return (
    <Dimmed>
      <AlertContiner>
        <Text
          typography="t4"
          bold={true}
          display="block"
          style={{ marginBottom: 6 }}
        >
          {title}
        </Text>
        {description ? <Text typography="t7">{description}</Text> : null}
        <Flex justify="flex-end">
          <Button
            onClick={onButtonClick}
            transparent={true}
            style={{ marginTop: 12, border: 'none' }}
          >
            {buttonLabel}
          </Button>
        </Flex>
      </AlertContiner>
    </Dimmed>
  )
}

const AlertContiner = styled.div`
  padding: 24px;
  width: 320px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: ${colors.white};
  border-radius: 8px;
  overflow: hidden;
  z-index: var-(--alert-zindex);
  box-sizing: border-box;
`

export default Alert
