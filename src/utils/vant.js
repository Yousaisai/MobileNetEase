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
  Icon,
  Popup,
  Lazyload,
  Overlay,
} from "vant";
let map = [
  Button,
  RadioGroup,
  Radio,
  Tabbar,
  Icon,
  TabbarItem,
  Tab,
  Tabs,
  Progress,
  Loading,
  Slider,
  Overlay,
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
