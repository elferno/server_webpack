import '@styles/global'
import Post from '@components/Post'
import logo from '@images/logo.png'

import json from '../json/json'
import xml from '../xml/xml.xml'

const post = new Post(
  'webpack post title',
  logo
)

console.log('post to string', post.toString())
console.log('JSON', json)
console.log('XML', xml)
