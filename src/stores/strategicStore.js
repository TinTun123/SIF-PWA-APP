import { defineStore } from "pinia";
import { axiosClient } from "@/axios";

// Poem title, author, cover_url, poem
// Comic -> date, title, array of image url
// Music -> vid_url, title, tags, links [youtube, telegram, facebook]
// Statement -> title, date, orgs [organization], images [statement images]

export const useStrategicStore = defineStore("strategics", {
  state: () => ({
    courses: [],
    stories: [],
    movements: [],
    articles: [],
    statements: [],
    poems: [],
    posters: [],
    comics: [],
    musics: [],
    interviews: [],
    podcasts: [],
    currentPlayingEpi: {},
  }),
  actions: {
    async fetchCourses() {
      await axiosClient.get("/courses").then((res) => {
        if (res.status === 200) {
          this.courses = res.data;
          return this.courses;
        }
      });
    },
    async fetchSessionsData(courseId) {
      return await axiosClient
        .get(`/courses/sessions/${courseId}`)
        .then((res) => {
          return res;
        });
    },
    async fetchSession(sessionID) {
      return await axiosClient.get(`/sessions/${sessionID}`).then((res) => {
        return res;
      });
    },
    async fetchSessionAll(courseId) {
      return await axiosClient.get(`sessions/all/${courseId}`).then((res) => {
        if (res.status === 200) {
          return res;
        }
      });
    },
    async fetchSubSessionsData(sessionId) {
      return await axiosClient
        .get(`sessions/subSession/${sessionId}`)
        .then((res) => {
          return res;
        });
    },
    async fetchSubSession(subsessionID) {
      return await axiosClient
        .get(`/subsessions/${subsessionID}`)
        .then((res) => {
          return res;
        });
    },
    async fetchSubsessionAll(sessionId) {
      return await axiosClient
        .get(`/subsessions/all/${sessionId}`)
        .then((res) => {
          if (res.status === 200) {
            return res;
          }
        });
    },
    async fetchStoryAll() {
      return await axiosClient.get("stories").then((res) => {
        if (res.status === 200) {
          this.stories = res.data.stories;
        }
        return res;
      });
    },
    async fetchStory(id) {
      return await axiosClient.get(`stories/${id}`).then((res) => {
        if (res.status === 200) {
          return res;
        }
      });
    },
    async createStory(formData) {
      return await axiosClient
        .post("stories/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          this.stories.push(res.data.story);
          return res;
        });
    },
    async updateStory(storyId, formData) {
      return await axiosClient
        .post(`stories/${storyId}`, formData)
        .then((res) => {
          if (res.status === 200) {
            let story = this.stories.findIndex((sto) => {
              return sto.id === parseInt(storyId);
            });
            this.stories[story] = res.data.story;
            return res;
          }
        });
    },
    async deleteStory(storyId) {
      return await axiosClient.delete(`stories/${storyId}`).then((res) => {
        if (res.status === 200) {
          let index = this.stories.findIndex((sto) => {
            return sto.id === parseInt(storyId);
          });

          this.stories.splice(index, 1);
        }
      });
    },
    async createMovement(formData) {
      return await axiosClient
        .post("movements/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          this.movements.push(res.data.movement);
          return res;
        });
    },
    async fetchMovementAll() {
      return await axiosClient.get("movements").then((res) => {
        if (res.status === 200) {
          this.movements = res.data.movements;
        }
        return res;
      });
    },
    async fetchMovement(id) {
      return await axiosClient.get(`movements/${id}`).then((res) => {
        if (res.status === 200) {
          return res;
        }
      });
    },
    async updateMovement(movementId, formData) {
      return await axiosClient
        .post(`movements/${movementId}`, formData)
        .then((res) => {
          if (res.status === 200) {
            let movement = this.movements.findIndex((sto) => {
              return sto.id === parseInt(movementId);
            });
            this.movements[movement] = res.data.movement;
            return res;
          }
        });
    },
    async deleteMovement(moveId) {
      return await axiosClient.delete(`movements/${moveId}`).then((res) => {
        if (res.status === 200) {
          let index = this.movements.findIndex((move) => {
            return move.id === parseInt(moveId);
          });

          this.movements.splice(index, 1);
        }
      });
    },
    async createArticle(formData) {
      return await axiosClient
        .post("articles/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          this.articles.push(res.data.article);
          return res;
        });
    },
    async updateArticle(articleId, formData) {
      return await axiosClient
        .post(`articles/${articleId}`, formData)
        .then((res) => {
          if (res.status === 200) {
            let article = this.articles.findIndex((sto) => {
              return sto.id === parseInt(articleId);
            });
            this.articles[article] = res.data.article;

            return res;
          }
        });
    },
    async fetchArticleAll() {
      return await axiosClient.get("articles").then((res) => {
        if (res.status === 200) {
          this.articles = res.data.articles;
        }
        return res;
      });
    },
    async fetchArticle(id) {
      return await axiosClient.get(`articles/${id}`).then((res) => {
        if (res.status === 200) {
          return res;
        }
      });
    },
    async deleteArticle(artId) {
      return await axiosClient.delete(`articles/${artId}`).then((res) => {
        if (res.status === 200) {
          let index = this.articles.findIndex((art) => {
            return art.id === parseInt(artId);
          });

          this.articles.splice(index, 1);
        }
      });
    },
    async fetchStatementAll() {
      return await axiosClient.get("statements").then((res) => {
        if (res.status === 200) {
          this.statements = res.data.statements;
        }
        return res;
      });
    },
    async fetchPosterAll() {
      return await axiosClient.get("posters").then((res) => {
        if (res.status === 200) {
          this.posters = res.data.posters;
        }
        return res;
      });
    },
    async fetchPoemAll() {
      return await axiosClient.get("poems").then((res) => {
        if (res.status === 200) {
          console.log(this.poems);

          this.poems = res.data.poems;
        }

        return res;
      });
    },
    async fetchComicsAll() {
      return await axiosClient.get("comics").then((res) => {
        if (res.status === 200) {
          this.comics = res.data.comics;
        }

        return res;
      });
    },
    async fetchMusicAll() {
      return await axiosClient.get("musics").then((res) => {
        if (res.status === 200) {
          this.musics = res.data.musics;
        }

        return res;
      });
    },
    async fetchInterviewAll() {
      return await axiosClient.get("interviews").then((res) => {
        if (res.status === 200) {
          this.interviews = res.data.interviews;
        }
        return res;
      });
    },
    async fetchPodcastsAll() {
      return await axiosClient.get("podcasts").then((res) => {
        if (res.status === 200) {
          this.podcasts = res.data.podcasts;
        }
        return res;
      });
    },
  },
});
