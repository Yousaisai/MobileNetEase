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
  ShareSheet,Popup
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
  Slider,
  
  Search,
  ShareSheet,Popup
];
map.forEach((e) => {
  Vue.use(e);
});

Vue.use(Notify)