<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: String,
});
</script>

<template>
  <header class="bg-white border-b-2 border-slate-100">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-slate-900">{{ title }}</h1>
        <slot name="header"></slot>
      </div>
    </div>
  </header>
  <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Replace with your content -->
      <slot></slot>
      <!-- /End replace -->
    </div>
  </main>
</template>

<style scoped></style>
