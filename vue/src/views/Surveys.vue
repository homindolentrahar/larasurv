<script setup>
import { PlusIcon } from "@heroicons/vue/solid";
import PageComponent from "../components/PageComponent.vue";
</script>

<template>
  <PageComponent title="All Surveys">
    <template v-slot:header>
      <button
        class="flex items-center gap-2 bg-emerald-500 rounded py-2.5 px-4 font-semibold text-sm text-emerald-50 hover:bg-emerald-600 active:bg-emerald-700 active:scale-95 transition-all duration-200"
      >
        <PlusIcon class="w-4 h-4" />
        New Survey
      </button>
    </template>
  </PageComponent>
</template>

<style scoped></style>
