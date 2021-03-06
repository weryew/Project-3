import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import MeetUps from "./views/MeetUps.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import DishPage from "./views/DishPage.vue";
import RecipePage from "./views/RecipePage.vue";
import RestoList from "./views/RestoList.vue";
import RestoPage from "./views/RestoPage.vue";
import NewResto from "./views/NewResto.vue";
import NewDish from "./views/NewDish.vue";
import NewMeetup from "./views/NewMeetup.vue";
import UserPage from "./views/UserPage.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/newResto",
      component: NewResto
    },
    {
      path: "/",
      component: Home
    },
    {
      path: "/about",
      component: About
    },
    {
      path: "/userpage",
      component: UserPage
    },
    {
      path: "/meetups",
      component: MeetUps
    },
    {
      path: "/signup",
      component: Signup
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/:id",
      component: DishPage
    },
    {
      path: "/:id/recipe",
      component: RecipePage
    },
    {
      path: "/:id/resto",
      component: RestoList
    },
    {
      path: "/resto/:id",
      component: RestoPage
    },
    {
      path: "/resto/:id/addDish",
      component: NewDish
    },
    {
      path: "/resto/:id/addMeetup",
      component: NewMeetup
    }
  ]
});
