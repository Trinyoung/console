import './public-path'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { unmountComponentAtNode } from 'react-dom'
import App from './App.tsx'
import './index.css'

function render(props: { container: any }) {
  const { container } = props
  ReactDOM.createRoot(container ? container.querySelector('#root') : document.querySelector('#root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,)
}
if (!window.__POWERED_BY_QIANKUN__) {
  mount({ container: null })
}

// 处于qiankun.js的子应用，需要导出三个方法, bootstrap, mount, unmount

export async function bootstrap() {
  console.log('react app bootstraped')
}
export async function mount(props: { container: any }) {
  console.log('react app mount', props)
  render(props)
}

export async function unmount(props: { container: any }) {
  const { container } = props
  unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'))
}