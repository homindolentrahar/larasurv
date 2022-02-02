import { defineStore } from "pinia";
import client from "../axios";

export const useStore = defineStore("main", {
  state: () => {
    return {
      user: {
        data: {},
        token: sessionStorage.getItem("TOKEN"),
      },
    };
  },
  actions: {
    login(user) {
      return client.post("/login", user).then(({ data }) => {
        this.user.token = data.token;
        this.user.data = data.user;

        console.log(`Saved user: ${this.user.data}`);

        sessionStorage.setItem("TOKEN", data.token);

        return data;
      });
    },
    register(user) {
      return client.post("/register", user).then(({ data }) => {
        this.user.token = data.token;
        this.user.data = data.user;

        sessionStorage.setItem("TOKEN", data.token);

        return data;
      });
    },
    logout() {
      return client.post("/logout").then((response) => {
        this.user.data = {};
        this.user.token = null;

        sessionStorage.removeItem("TOKEN");

        return response;
      });
    },
  },
});
