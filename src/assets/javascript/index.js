import * as $ from 'jquery'
import '@styles/global'
import Post from '@components/Post'
import logo from '@images/logo.png'

import json from '@json/json'
import xml from '@xml/xml'

const post = new Post(
  'webpack post title',
  logo
)

$('pre').addClass('post').html(post.toString())

console.log('post to string', post.toString())
console.log('JSON', json)
console.log('XML', xml)
