<template>
  <div class="w-64 bg-gray-50 p-4 border-r border-gray-200 h-screen">
    <div class="space-y-4">
      <!-- Sekcija za veličinu -->
      <div class="bg-white rounded-lg p-4 shadow-sm">
        <h3 class="text-sm font-medium text-gray-900 mb-3">Veličina ikone</h3>
        <div class="space-y-2">
          <label class="block">
            <span class="text-sm text-gray-500">Širina</span>
            <input 
              type="number" 
              v-model="width" 
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              @input="updateIcon"
            >
          </label>
          <label class="block">
            <span class="text-sm text-gray-500">Visina</span>
            <input 
              type="number" 
              v-model="height"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              @input="updateIcon"
            >
          </label>
        </div>
      </div>

      <!-- Sekcija za boju -->
      <div class="bg-white rounded-lg p-4 shadow-sm">
        <h3 class="text-sm font-medium text-gray-900 mb-3">Boja ikone</h3>
        <div class="flex space-x-2">
          <input 
            type="color" 
            v-model="iconColor"
            class="h-8 w-8 rounded cursor-pointer"
            @input="updateIcon"
          >
          <input 
            type="text" 
            v-model="iconColor"
            class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
        </div>
      </div>

      <!-- Sekcija za pozadinu -->
      <div class="bg-white rounded-lg p-4 shadow-sm">
        <h3 class="text-sm font-medium text-gray-900 mb-3">Pozadina</h3>
        <div class="space-y-2">
          <label class="flex items-center">
            <input 
              type="checkbox" 
              v-model="showBackground"
              class="rounded text-indigo-600 focus:ring-indigo-500"
            >
            <span class="ml-2 text-sm text-gray-600">Prikaži pozadinu</span>
          </label>
          <div v-if="showBackground" class="flex space-x-2">
            <input 
              type="color" 
              v-model="backgroundColor"
              class="h-8 w-8 rounded cursor-pointer"
              @input="updateIcon"
            >
            <input 
              type="text" 
              v-model="backgroundColor"
              class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const width = ref(24)
const height = ref(24)
const iconColor = ref('#000000')
const showBackground = ref(false)
const backgroundColor = ref('#ffffff')

const emit = defineEmits(['update:settings'])

function updateIcon() {
  emit('update:settings', {
    width: width.value,
    height: height.value,
    iconColor: iconColor.value,
    showBackground: showBackground.value,
    backgroundColor: backgroundColor.value
  })
}

watch([showBackground], updateIcon)
</script> 