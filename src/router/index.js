import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "@/pages/HomeComponent.vue";
import defaultLayout from "@/layout/defaultLayout.vue";
import PoliciesList from "@/pages/PoliciesList.vue";
import Statements from "@/pages/Statements.vue";
import AboutUs from "@/pages/About-us.vue";
import Artilces from "@/pages/Artilces.vue";
import ArtMovements from "@/pages/ArtMovements.vue";
import Media from "@/pages/Media.vue";
import Posters from "@/pages/Posters.vue";
import Strategies from "@/pages/Strategies.vue";
import ViewPolicy from "@/pages/ViewPolicy.vue";
import ViewPodcast from "@/pages/ViewPodcast.vue";
import GenerateContent from "@/pages/GenerateContent.vue";
import ViewCourse from "@/pages/ViewCourse.vue";
import ViewStorys from "@/pages/ViewStorys.vue";
import ViewMovements from "@/pages/ViewMovements.vue";
import ViewArticles from "@/pages/ViewArticles.vue";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      component: HomeComponent,
    },
    {
      path: "/",
      component: defaultLayout,
      children: [
        {
          path: "policies",
          component: PoliciesList,
        },
        {
          path: "policies/:id",
          name: "ViewPolicy",
          component: ViewPolicy,
        },
        {
          path: "statements",
          name: "Statements",
          component: Statements,
        },
        {
          path: "About-us",
          component: AboutUs,
        },
        {
          path: "articles",
          name: "articles",
          component: Artilces,
        },
        {
          path: "viewArticle/:id",
          name: "ViewArticle",
          component: ViewArticles,
        },
        {
          path: "ArtMovements",
          component: ArtMovements,
        },
        {
          path: "Media",
          component: Media,
        },
        {
          path: "Posters",
          component: Posters,
        },
        {
          path: "Strategies",
          component: Strategies,
        },
        {
          path: "readStory/:id",
          name: "ViewStory",
          component: ViewStorys,
        },
        {
          path: "viewMovements/:id?",
          name: "ViewMovement",
          component: ViewMovements,
        },

        {
          path: "/course/:id",
          name: "Course",
          component: ViewCourse,
        },
        {
          path: "Podcast/:id",
          name: "Podcast",
          component: ViewPodcast,
        },
        {
          path: "generateContent",
          component: GenerateContent,
        },
      ],
    },
  ],
});

export default router;
