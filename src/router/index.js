import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgetPassword from "../views/ForgetPassword.vue";
import Profile from "../views/Profile.vue";
import Admin from "../views/Admin.vue";
import CreatePost from "../views/CreatePost.vue";
import BlogPreview from "../views/BlogPreview.vue";
import ViewBlog from "../views/ViewBlog.vue";
import EditBlog from "../views/EditBlog.vue";
import firebase from "firebase/app";
import "firebase/auth";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: 'Home',
      requiresAuth: false
    }
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta: {
      title: 'Blogs',
      requiresAuth: false
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: 'Login',
      requiresAuth: false
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: 'Register',
      requiresAuth: false
    }
  },
  {
    path: "/forget-password",
    name: "ForgetPassword",
    component: ForgetPassword,
    meta: {
      title: 'Forget Password',
      requiresAuth: false
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: 'Profile',
      requiresAuth: true
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: 'Admin',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: 'CreatePost',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/post-preview",
    name: "BlogPreview",
    component: BlogPreview,
    meta: {
      title: 'Preview Blog Post',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: "/view-blog/:blogid",
    name: "ViewBlog",
    component: ViewBlog,
    meta: {
      title: 'View Blog Post',
      requiresAuth: true,
    }
  },
  {
    path: "/edit-blog/:blogid",
    name: "EditBlog",
    component: EditBlog,
    meta: {
      title: 'Edit Blog Post',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | SoludimBlogs`;
  next();
})

router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser;
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    if (user) {
      return next();
    }
    return next({ name: "Home" });
  } else {
    if (user && to.name === "Login" || user && to.name === "Register" || user && to.name === "ForgetPassword") {
      //when user is logged in but still wants to go to registration page
      return next({name: "Home"})
    }
  }
  // if (user) {
  //   //check admin token
  // }
  // if (to.matched.some((res) => res.meta.requiresAuth)) {
  //   // if (user) {
  //   //   if (to.matched.some((res) => res.meta.requiresAdmin)) {
  //   //     if (admin) {
  //   //       return next();
  //   //     }
  //   //     return next({ name: "Home" });
  //   //   }
  //   //   return next();
  //   // }
  //   return next({ name: "Home" });

  // }
  next();
})
export default router;
