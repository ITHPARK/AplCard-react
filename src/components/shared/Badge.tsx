import styled from '@emotion/styled'
import { colors } from '@styles/colorPalette'
import Text from '@shared/Text'

interface BadgeProps {
  label: string
}

const Badge = ({ label }: BadgeProps) => {
  return (
    <Container>
      <Text typography="t7" color="white">
        {label}
      </Text>
    </Container>
  )
}

const Container = styled.div`
  margin-right: 5px;
  padding: 3px 8px;
  background-color: ${colors.blue};
  border-radius: 12px;
`

export default Badge
