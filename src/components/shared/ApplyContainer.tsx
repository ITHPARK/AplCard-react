import React from 'react'
import { css } from '@emotion/react'

const ApplyContainer = ({ children }: { children: React.ReactNode }) => {
  return <div css={containerPadding}>{children}</div>
}

const containerPadding = css`
  padding: 18px;
`

export default ApplyContainer
