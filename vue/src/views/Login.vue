<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store/index";
import { XIcon, ExclamationIcon } from "@heroicons/vue/solid";

const store = useStore();
const router = useRouter();

const user = {
  email: "",
  password: "",
  remember: false,
};
const errorMsg = ref("");

const login = () => {
  store
    .login(user)
    .then((res) => {
      router.replace({ name: "Dashboard" });
    })
    .catch((err) => {
      errorMsg.value = err.response.data.error;
    });
};
</script>

<template>
  <div class="flex flex-col items-center">
    <div
      v-if="errorMsg"
      class="flex items-center justify-between py-3 px-5 bg-red-500 bg-opacity-25 text-red-500 mb-10 rounded-lg"
    >
      <ExclamationIcon class="w-5 h-5" />
      <p class="font-semibold">{{ errorMsg }}</p>
      <div
        class="p-2 rounded-xl cursor-pointer hover:bg-red-500 hover:bg-opacity-20"
      >
        <XIcon @click="errorMsg = ''" class="w-5 h-5" />
      </div>
    </div>
    <img class="h-16" src="/login.png" alt="logo" />
    <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-900">
      Sign in to your account
    </h2>
    <p class="mt-2 text-sm text-slate-500">
      Or
      {{ " " }}
      <router-link
        :to="{ name: 'Register' }"
        class="font-semibold text-sky-600 hover:text-sky-500 transition-all duration-200"
      >
        register for free
      </router-link>
    </p>
  </div>
  <form @submit.prevent="login" class="flex flex-col gap-8 mt-8" method="POST">
    <input type="hidden" name="remember" value="true" />
    <div class="rounded-lg">
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input
          v-model="user.email"
          id="email-address"
          name="email"
          type="email"
          autocomplete="email"
          required=""
          class="appearance-none rounded-none relative w-full px-5 py-3 border-x-2 border-t-2 border-b border-slate-200 text-slate-900 font-medium rounded-t-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:border-b-2 focus:z-10 placeholder:text-slate-400 placeholder:font-normal"
          placeholder="Email address"
        />
      </div>
      <div>
        <label for="password" class="sr-only">Password</label>
        <input
          v-model="user.password"
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          required=""
          class="appearance-none rounded-none relative w-full px-5 py-3 border-x-2 border-b-2 border-t border-slate-200 text-slate-900 font-medium rounded-b-md focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:border-t-2 focus:z-10 placeholder:text-slate-400 placeholder:font-normal"
          placeholder="Password"
        />
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <input
          v-model="user.remember"
          id="remember-me"
          name="remember-me"
          type="checkbox"
          class="h-4 w-4 text-sky-600 focus:ring-sky-500 border-2 border-slate-300 rounded"
        />
        <label for="remember-me" class="text-sm text-slate-900">
          Remember me
        </label>
      </div>

      <div class="text-sm">
        <a href="#" class="font-semibold text-sky-600 hover:text-sky-500">
          Forgot your password?
        </a>
      </div>
    </div>

    <div>
      <button
        type="submit"
        class="bg-sky-500 rounded py-3 px-7 w-full text-sky-50 font-semibold hover:bg-sky-600 active:bg-sky-700 active:scale-95 transition-all duration-200"
      >
        Sign in
      </button>
    </div>
  </form>
</template>
