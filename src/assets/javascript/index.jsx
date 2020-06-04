import '@styles/global'
import Post from '@components/Post'
import logo from '@images/logo.png'

import json from '@json/json'
import xml from '@xml/xml'

import React from 'react'
import {render} from 'react-dom'

const App = () => {
  return (
    <div className="container">
      <h1>Webpack React</h1>
      <hr/>
      <div className="logo"/>
      <hr/>
      <pre/>
    </div>
  )
}

render(<App/>, document.querySelector('#app'))

const post = new Post(
  'webpack post title',
  logo
)


const pre = document.querySelector('pre')
pre.classList.add('post')
pre.textContent = post.toString()

console.log('post to string', post.toString())
console.log('JSON', json)
console.log('XML', xml)

async function start(ms) {
  return await new Promise(resolve => {
    setTimeout(() => resolve('async works'), ms)
  })
}

start(1000).then(data => console.log(data))

class Util {
  static id = Date.now()
}

console.log('Util ID:', Util.id)