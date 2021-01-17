import { createRouter, createWebHistory } from "vue-router";

import CoachList from './pages/coaches/CoachList.vue'
import CoachRegistration from './pages/coaches/CoachRegistration.vue'
import CoachDetails from './pages/coaches/CoachDetails.vue'
import CoachContact from './pages/requests/CoachContact.vue'
import RequestsList from './pages/requests/RequestsList.vue'
import NotFound from './pages/NotFound.vue'

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
          component: CoachContact,
        },
      ],
    },
    { path: "/register", component: CoachRegistration },
    { path: "/requests", component: RequestsList },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
