<template>
  <div id="app">
    <navTop></navTop>
    <router-view/>
    <musicPlay></musicPlay>
    <loading></loading>
  </div>
</template>

<script>
import qs from 'qs'
import navTop from './components/Nav_top'
import musicPlay from './components/music_play'
export default {
  name: 'App',
  data(){
    return {
    }
  },
  components:{
    navTop,
    musicPlay
  }
}
</script>

<style>
body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, textarea, p, blockquote, th, td, figure { margin: 0; padding: 0; border: 0; font-size: 100%; vertical-align: baseline; }
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { display: block; }
ol, ul { list-style: none; }
body { -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100% !important; -webkit-touch-callout: none; -webkit-user-select: text; -webkit-touch-callout: none; word-break: break-all; word-wrap: break-word;}
h1, h2, h3, h4, h5, h6 { font-weight: normal; }
h1 a, h2 a, h3 a, h4 a, h5 a, h6 a { font-weight: inherit; }
strong, i, em { font-weight: normal; font-style: normal; }
input, select, form { vertical-align: middle; outline: none; }
img { border: none; vertical-align: top; }
a, button, input, select, textarea, a:focus, button:focus, input:focus, select:focus, textarea:focus, [onclick] { outline: 0; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); }
a { -webkit-touch-callout: none; text-decoration: none; color: #666666; outline: 0; }
table { border-collapse: collapse; }
.hidden { width: 0; height: 0; line-height: 0; font-size: 0; visibility: hidden; text-indent: -9999px; display: block; }
.clearfix:after { content: "."; display: block; height: 0; clear: both; visibility: hidden; }
</style>
