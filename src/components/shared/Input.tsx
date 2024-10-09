import styled from '@emotion/styled'
import { colors } from '@styles/colorPalette'

//input 스타일
const Input = styled.input`
  padding: 0 16px;
  width: 100%;
  height: 48px;
  font-size: 15px;
  font-weight: 500;
  border: 1px solid ${colors.grey};
  box-sizing: border-box;

  &:focus {
    ouline: none;
    border-color: ${colors.blue};
  }

  &[aria-invalid='true'] {
    border-color: ${colors.red};
  }
`

export default Input
