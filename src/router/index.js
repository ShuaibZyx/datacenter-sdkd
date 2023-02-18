import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

//引入组件
const Home = () => import("../components/Home.vue");

//data相关组件
const DataCart = () => import("../views/data/DataCart.vue");
const MeteData = () => import("../views/data/MeteData.vue");
const AddData = () => import("../views/data/AddData.vue");
const ApplyData = () => import("../views/data/ApplyData.vue");
const DownloadData = () => import("../views/data/DownloadData.vue");
const StarData = () => import("../views/data/StarData.vue");
const MyApply = () => import("../views/data/MyApply.vue");
const DataTable = () => import("../views/data/DataTable.vue");

//user相关组件
const UserInfo = () => import("../views/user/UserInfo.vue");
const ProjectInfo = () => import("../views/user/ProjectInfo.vue");
const AddProject = () => import("../views/user/AddProject.vue");
const UserSafe = () => import("../views/user/UserSafe.vue");

const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      component: Home,
      redirect: "/datatable",
      meta: { title: "首页" },
      children: [
        //数据台
        {
          path: "/datatable",
          name: "DataTable",
          component: DataTable,
          meta: { title: "数据台" },
        },
        //数据篮
        {
          path: "/cart",
          name: "cart",
          component: DataCart,
          meta: { title: "数据篮" },
          children: [
            //申请数据
            {
              path: "/apply",
              name: "apply-data",
              component: ApplyData,
              meta: { title: "申请数据" },
            },
          ],
        },
        //发布数据
        {
          path: "/metedata",
          name: "mete-data",
          component: MeteData,
          meta: { title: "发布数据" },
          children: [
            //添加元数据
            {
              path: "/adddata",
              name: "add-data",
              component: AddData,
              meta: { title: "添加元数据" },
            },
          ],
        },
        //数据下载
        {
          path: "/download",
          name: "download-data",
          component: DownloadData,
          meta: { title: "数据下载" },
        },
        //收藏数据
        {
          path: "/star",
          name: "star-data",
          component: StarData,
          meta: { title: "我的收藏" },
        },
        //我的数据申请
        {
          path: "/myapply",
          name: "my-apply",
          component: MyApply,
          meta: { title: "我的数据申请" },
        },
        {
          path: "/userInfo",
          name: "UserInfo",
          component: UserInfo,
          meta: { title: "个人信息" },
          children: [
            {
              path: "/userSafe",
              name: "UserSafe",
              component: UserSafe,
              meta: { title: "账户安全" },
            },
          ],
        },
        {
          path: "/projectInfo",
          name: "ProjectInfo",
          component: ProjectInfo,
          meta: { title: "项目信息" },
          children: [
            {
              path: "/addProject",
              name: "ProjectInfo",
              component: AddProject,
              meta: { title: "添加项目" },
            },
          ],
        },
      ],
    },
  ],
});

export default router;
