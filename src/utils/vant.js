import Vue from 'vue'
import {Button,RadioGroup, Radio,Tabbar, TabbarItem }  from 'vant'

[Button,RadioGroup,Radio,Tabbar, TabbarItem].forEach(e=>{
  Vue.use(e)
})