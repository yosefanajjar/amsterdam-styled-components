import express from 'express'
import path from 'path'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Button, StyledComponents, Theme, ThemeProvider } from '@amsterdam/asc-ui'

const app = express()

app.use(express.static(path.resolve(__dirname, '../dist')))

const sheet = new StyledComponents.ServerStyleSheet()
const jsx = sheet.collectStyles(
  <ThemeProvider>
    <Button text="Hello" color={Theme.TypeLevel.primary} />
  </ThemeProvider>,
)

app.get('/*', (req, res) => {
  const reactDom = renderToString(jsx)
  const styleTags = sheet.getStyleTags()

  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(htmlTemplate(reactDom, styleTags))
})

app.listen(1337)

function htmlTemplate(reactDom, styleTags) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>React SSR</title>
            ${styleTags}
        </head>
        
        <body>
            <div id="app">${reactDom}</div>
            <!--<script src="./app.bundle.js"></script>-->
        </body>
        </html>
    `
}
