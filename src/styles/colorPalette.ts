import { css } from '@emotion/react'

//사용할 color를 미리 변수로 설정
export const colorPalette = css`
  :root {
    --red: #f44336;
    --blue: #1a237e;
    --green: #4caf50;
    --white: #fff;
    --black: #212121;
    --grey: #f0efef;
  }
`

export const colors = {
  red: 'var(--red)',
  blue: 'var(--blue)',
  green: 'var(--green)',
  white: 'var(--white)',
  black: 'var(--black)',
  grey: 'var(--grey)',
}

//color의 타입을 정의 키값만 사용하면 되기때문에 keyof 를 사용
export type Colors = keyof typeof colors
