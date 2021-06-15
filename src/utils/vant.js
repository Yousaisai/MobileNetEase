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
];
map.forEach((e) => {
  Vue.use(e);
});
