import Vue from "vue";
import {
  Button,
  RadioGroup,
  Radio,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  Progress,
  Slider,
  Search,
  Notify,
  ShareSheet,Popup,Lazyload
} from "vant";
let map = [
  Button,
  RadioGroup,
  Radio,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  Progress,
  Slider,Lazyload,
  
  Search,
  ShareSheet,Popup
];
map.forEach((e) => {
  Vue.use(e);
});
import { Image as VanImage ,} from 'vant';
Vue.use(Notify)
Vue.use(VanImage)