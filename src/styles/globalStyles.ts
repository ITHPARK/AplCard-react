import { colorPalette, colors } from './colorPalette'

import { css } from '@emotion/react'

export default css`
  ${colorPalette} // 색상을 추가

  : root {
    --dimmed-zindex: 10;
    --alert-zindex: 11;
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;

    background: transparent;

    color: inherit;
    font: inherit;

    line-height: normal;

    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;

    -webkit-appearance: none;
  }

  input {
    outline: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  html {
    height: 100%;
  }

  body {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.black};
  }

  #App-Wrap {
    margin: 0 auto;
    width: 100vw;
    height: 750px;
    max-width: 500px;
    position: relative;
    overflow-y: auto;
    background-color: #fff;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }

  #App-Wrap::-webkit-scrollbar {
    width: 10px;
    position: relative;
    z-index: 100;
  }

  #App-Wrap::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 10px;
  }

  #App-Wrap::-webkit-scrollbar-track {
    background-color: lightgrey;
  }

  #root {
    height: 100%;
  }

  #root-portal {
    width: 100%;
    position: sticky;
    left: 0;
    bottom: 0;
    z-index: 10;
  }
`
