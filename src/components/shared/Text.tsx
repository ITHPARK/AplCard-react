import { Typography, typographyMap } from '@/styles/typography'
import { Colors, colors } from '@/styles/colorPalette'
import { CSSProperties } from 'react'
import styled from '@emotion/styled'

//컴포넌트 타입 정의
interface TextProps {
  typography?: Typography
  color?: Colors
  display?: CSSProperties['display']
  textAlign?: CSSProperties['textAlign']
  fontWeight?: CSSProperties['fontWeight']
  bold?: boolean
}

//스타일을 적용시킬 Text컴포넌트 생성
const Text = styled.span<TextProps>(
  ({ color = 'black', display, textAlign, fontWeight, bold }) => ({
    color: colors[color],
    display,
    textAlign,
    fontWeight: bold ? 'bold' : fontWeight,
  }),
  ({ typography = 't5' }) => typographyMap[typography],
)

export default Text
