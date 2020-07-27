import Vue from "vue";
import Router from "vue-router";
import Index from "@/views/main/Index";
const Login = resolve => require(["@/views/main/Login"], resolve);
const SignUp = resolve => require(["@/views/main/SignUp"], resolve);
const Categroy = resolve => require(["@/views/main/Categroy"], resolve);
const GoodsList = resolve => require(["@/views/main/GoodsList"], resolve);
const GoodsDetail = resolve => require(["@/views/main/GoodsDetail"], resolve);
const CheckPhone = resolve =>
  require(["@/components/signUp/CheckPhone"], resolve);
const InputInfo = resolve =>
  require(["@/components/signUp/InputInfo"], resolve);
const SignUpDone = resolve =>
  require(["@/components/signUp/SignUpDone"], resolve);
const ShoppingCart = resolve =>
  require(["@/views/order/ShoppingCart"], resolve);
const addCart = resolve => require(["@/views/order/addCart"], resolve);
const Order = resolve => require(["@/views/order/Order"], resolve);
const Pay = resolve => require(["@/views/order/Pay"], resolve);
const PayDone = resolve => require(["@/views/order/PayDone"], resolve);
const Freeback = resolve => require(["@/components/Freeback"], resolve);
const Home = resolve => require(["@/views/user/Home"], resolve);
const MyAddress = resolve => require(["@/views/user/home/MyAddress"], resolve);
const AddAddress = resolve =>
  require(["@/views/user/home/AddAddress"], resolve);
const MyOrder = resolve => require(["@/views/user/home/MyOrder"], resolve);
const MyShoppingCart = resolve =>
  require(["@/views/user/home/MyShoppingCart"], resolve);
const Merchant = resolve => require(["@/views/main/Merchant"], resolve);

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/", // 首页
      name: "Index",
      component: Index
    },
    {
      path: "/Login", // 登录
      name: "Login",
      component: Login
    },
    {
      path: "/SignUp", // 注册
      name: "SignUp",
      component: SignUp,
      children: [
        {
          path: "/",
          name: "index",
          component: CheckPhone
        },
        {
          path: "checkPhone",
          name: "CheckPhone",
          component: CheckPhone
        },
        {
          path: "inputInfo",
          name: "InputInfo",
          component: InputInfo
        },
        {
          path: "signUpDone",
          name: "SignUpDone",
          component: SignUpDone
        }
      ]
    },
    {
      path: "/Categroy", // 类目
      name: "Categroy",
      component: Categroy
    },
    {
      path: "/goodsList", // 商品列表
      name: "GoodsList",
      component: GoodsList
    },
    {
      path: "/goodsDetail", // 商品详情
      name: "GoodsDetail",
      component: GoodsDetail
    },
    {
      path: "/shoppingCart", // 购物车
      name: "ShoppingCart",
      component: ShoppingCart
    },
    {
      path: "/addCart", // 加入购物车成功
      name: "addCart",
      component: addCart
    },
    {
      path: "/order", // 订单页面
      name: "Order",
      component: Order
    },
    {
      path: "/pay", // 支付页面
      name: "Pay",
      component: Pay
    },
    {
      path: "/payDone", // 支付成功页面
      name: "PayDone",
      component: PayDone
    },
    {
      path: "/freeback", // 反馈页面
      name: "Freeback",
      component: Freeback
    },
    {
      path: "/home", // 主页
      name: "Home",
      component: Home,
      children: [
        {
          path: "/",
          name: "HomeIndex",
          component: MyOrder
        },
        {
          path: "myAddress",
          name: "MyAddress",
          component: MyAddress
        },
        {
          path: "addAddress",
          name: "AddAddress",
          component: AddAddress
        },
        {
          path: "myOrder",
          name: "MyOrder",
          component: MyOrder
        },
        {
          path: "myShoppingCart",
          name: "MyShoppingCart",
          component: MyShoppingCart
        }
      ]
    },
    {
      path: "/merchant",
      name: "Merchant",
      component: Merchant
    }
  ]
});
