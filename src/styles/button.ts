import { css } from '@emotion/react'
import { colors } from './colorPalette'

//기본 버튼 스타일
export const buttonColorMap = {
  primary: css`
    background-color: ${colors.blue};
    color: ${colors.white};
  `,
  success: css`
    background-color: ${colors.green};
    color: ${colors.white};
  `,
  error: css`
    background-color: ${colors.red};
    color: ${colors.white};
  `,
}

// 배경이 투명색인 버튼 스타일
export const buttonTransparentMap = {
  primary: css`
    background-color: ${colors.white};
    color: ${colors.blue};
    border: 1px solid ${colors.blue};
  `,
  success: css`
    background-color: ${colors.white};
    color: ${colors.green};
    border: 1px solid ${colors.green};
  `,
  error: css`
    background-color: ${colors.white};
    color: ${colors.red};
    border: 1px solid ${colors.red};
  `,
}

export const buttonSizeMap = {
  small: css`
    padding: 8px 9px;
    font-size: 13px;
  `,
  medium: css`
    padding: 10px 15px;
    font-size: 15px;
  `,
  large: css`
    padding: 12px 10px;
    font-size: 18px;
  `,
}

//타입 exprot
export type ButtonColor = keyof typeof buttonColorMap
export type ButtonTranparent = keyof typeof buttonTransparentMap
export type ButtonSize = keyof typeof buttonSizeMap
