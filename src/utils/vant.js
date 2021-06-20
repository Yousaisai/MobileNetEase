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
  Loading,
  ShareSheet,
  Popup,
  Lazyload,
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
  Loading,
  Slider,
  Lazyload,
  Search,
  ShareSheet,
  Popup,
];
import { Image as VanImage } from "vant";
Vue.use(Notify);
Vue.use(VanImage);
map.forEach((e) => {
  Vue.use(e);
});
