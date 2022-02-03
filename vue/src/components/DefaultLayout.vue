<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { MenuIcon, XIcon, LogoutIcon } from "@heroicons/vue/outline";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../store/index";

const store = useStore();
const router = useRouter();

const user = computed(() => {
  console.log(store.user);
  return store.user.data;
});
const navigation = [
  { name: "Dashboard", to: { name: "Dashboard" } },
  { name: "Surveys", to: { name: "Surveys" } },
];

const logout = () => {
  store.logout().then(() => {
    router.replace({
      name: "Login",
    });
  });
};
</script>

<template>
  <div class="min-h-screen">
    <Disclosure as="nav" class="bg-slate-900" v-slot="{ open }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <router-link :to="{ name: 'Dashboard' }" class="flex-shrink-0">
              <img class="h-8 w-8" src="/survey.png" alt="logo" />
            </router-link>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.to"
                  :class="[
                    this.$route.name === item.to.name
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white',
                    'px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200',
                  ]"
                >
                  {{ item.name }}
                </router-link>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <!-- Profile dropdown -->
              <Menu as="div" class="ml-3 relative">
                <div>
                  <MenuButton
                    class="max-w-xs bg-slate-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-200"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" src="/user.png" alt="" />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <MenuItem v-slot="{ active }">
                      <a
                        @click="logout"
                        class="block px-5 py-2.5 text-sm text-red-600 font-bold rounded-md cursor-pointer hover:bg-red-500 hover:text-red-50"
                        >Sign Out</a
                      >
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-50 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-700"
            >
              <span class="sr-only">Open main menu</span>
              <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            as="a"
            :to="item.to"
            :class="[
              this.$route.name === item.to.name
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white',
              'block px-5 py-2.5 rounded-md text-base font-medium',
            ]"
            >{{ item.name }}
          </router-link>
        </div>
        <div class="py-4 border-t border-slate-700">
          <div class="flex gap-4 items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" src="/user.png" alt="user" />
            </div>
            <div class="flex flex-col items-start gap-1">
              <div class="text-base font-semibold leading-none text-white">
                {{ user.name }}
              </div>
              <div class="text-sm font-normal leading-none text-slate-400">
                {{ user.email }}
              </div>
            </div>
          </div>
          <div class="mt-8 px-2 space-y-1">
            <DisclosureButton
              as="a"
              @click="logout"
              class="flex items-center gap-2 px-4 py-2.5 rounded-md bg-red-500 bg-opacity-25 text-sm font-semibold text-red-500 hover:bg-opacity-40 cursor-pointer transition-all duration-200"
            >
              <LogoutIcon class="h-5 w-5" />
              Sign Out
            </DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <router-view></router-view>
  </div>
</template>

<style scoped></style>
