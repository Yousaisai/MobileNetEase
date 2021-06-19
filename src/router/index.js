import Vue from "vue";
import VueRouter from "vue-router";

//下面两行是解决刷新当前路由会出重复路由的方法
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/toplist",
    component: () => import("@/views/Home/index.vue"),
    children: [
      {
        path: "/isplay",
        name: "isplay",
        component: () => import("@/views/isPlay/index.vue"),
      },
      {
        path: "/playlist",
        name: "playlist",
        component: () => import("@/views/playList/index.vue"),
      },
      {
        path: "/toplist",
        name: "toplist",
        component: () => import("@/views/topList/index.vue"),
      },
      {
        path: "/search",
        name: "search",
        component: () => import("@/views/search/index.vue"),
      },  {
        path: "/toplistitem",
        name: "toplistitem",
        component: () => import("@/views/topList/topItem/index.vue"),
      }, {
        path: "/album",
        name: "album",
        component: () => import("@/views/album/index.vue"),
      },{
        path: "/singer",
        name: "singer",
        component: () => import("@/views/singer/index.vue"),
      }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
