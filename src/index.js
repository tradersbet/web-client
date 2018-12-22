import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './modules/app'
import WebFontLoader from 'webfontloader'
import './index.css'

WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
})

render(
  (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root')
)
