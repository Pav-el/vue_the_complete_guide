import { createRouter, createWebHistory } from "vue-router";

import CoachList from "./pages/coaches/CoachList.vue";
import CoachRegistration from "./pages/coaches/CoachRegistration.vue";
import CoachDetails from "./pages/coaches/CoachDetails.vue";
import CoachContact from "./pages/requests/CoachContact.vue";
import RequestsList from "./pages/requests/RequestsList.vue";
import UserAuth from "./pages/auth/UserAuth.vue";
import NotFound from "./pages/NotFound.vue";
import store from "./store/index.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachList },
    {
      path: "/coaches/:id",
      props: true,
      component: CoachDetails,
      children: [
        {
          path: "contact",
          props: true,
          component: CoachContact,
        },
      ],
    },
    {
      path: "/register",
      component: CoachRegistration,
      meta: { requiresAuth: true },
    },
    {
      path: "/requests",
      component: RequestsList,
      meta: { requiresAuth: true },
    },
    { path: "/auth", component: UserAuth, meta: { requiresUnauth: true } },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});

export default router;
