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
} from "vant";

[Button, RadioGroup, Radio, Tabbar, TabbarItem, Tab, Tabs, Progress].forEach(
  (e) => {
    Vue.use(e);
  }
);
