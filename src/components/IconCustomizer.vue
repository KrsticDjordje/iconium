<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import IconFilters from './IconFilters.vue';
import { iconCategories } from '../utils/icons';
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline';
import IconDrawer from './IconDrawer.vue';

// Inicijalno stanje dark mode-a
const isDarkMode = ref(false);

// Funkcija za proveru dark mode-a
const checkDarkMode = () => {
  isDarkMode.value = document.documentElement.classList.contains('dark');
};

// Funkcija za toggle dark mode-a
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('darkMode', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', 'light');
  }
};

// Proveri inicijalno stanje na mount
onMounted(() => {
  checkDarkMode();
});

const filters = ref({
  fill: true,
  weight: 100,
  grade: -25,
  opticalSize: 20
});

const selectedCategory = ref('All');
const searchQuery = ref('');

const categories = computed(() => ['All', ...iconCategories.map(c => c.name)]);

const filteredIcons = computed(() => {
  let icons = [];

  iconCategories.forEach(category => {
    if (selectedCategory.value === 'All' || selectedCategory.value === category.name) {
      Object.entries(category.icons).forEach(([name, icon]) => {
        if (name.toLowerCase().includes(searchQuery.value.toLowerCase())) {
          icons.push({
            name,
            icon,
            category: category.name
          });
        }
      });
    }
  });

  return icons;
});

const width = ref(24)
const color = ref('#000000')
const showBackground = ref(false)
const backgroundColor = ref('#ffffff')

// Dodajemo stanje za mobilni filter
const isFilterOpen = ref(false);

// Dodajemo stanje za drawer
const selectedIcon = ref(null);
const isDrawerOpen = ref(false);

// Funkcija za otvaranje drawera
const openIconDrawer = (icon) => {
  selectedIcon.value = icon;
  isDrawerOpen.value = true;
};

// Funkcija za primenu filtera na ikonicu
const applyIconStyles = (icon: any) => {
  return {
    stroke: filters.value.fill ? 'currentColor' : 'none',
    strokeWidth: filters.value.weight / 100,
    transform: `scale(${filters.value.opticalSize / 24})`,
    filter: `contrast(${1 + filters.value.grade / 100})`
  };
};
</script>

<template>
  <div class="flex flex-col lg:flex-row h-screen">
    <div class="flex-1">
      <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <!-- Header -->
        <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div class="max-w-7xl mx-auto px-4">
            <div class="flex justify-between h-16 items-center">
              <!-- Logo section -->
              <div class="flex items-center">
                <div class="relative w-8 h-8">
                  <img src="../assets/logo.svg" alt="Logo"
                    class="w-full h-full transition-transform duration-300 hover:scale-110" />
                </div>
                <h1 class="ml-3 text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white 
                           dark:to-gray-300 bg-clip-text text-transparent hidden sm:block">
                  Icon Customizer
                </h1>
              </div>

              <!-- Search and Theme Toggle -->
              <div class="flex items-center gap-2 sm:gap-4">
                <div class="w-full max-w-[200px] sm:max-w-md">
                  <div class="relative">
                    <input type="search" v-model="searchQuery" placeholder="Search icons" class="w-full pl-10 pr-4 py-2 text-sm sm:text-base rounded-lg border border-gray-300 
                                  dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                  focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400
                                  placeholder-gray-500 dark:placeholder-gray-400">
                    <div class="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">
                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <button @click="toggleDarkMode" class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400
                               hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <SunIcon v-if="isDarkMode" class="h-5 w-5" />
                  <MoonIcon v-else class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div class="flex flex-col lg:flex-row">
          <!-- Mobile Filter Toggle -->
          <button @click="isFilterOpen = !isFilterOpen"
            class="lg:hidden fixed bottom-4 right-4 z-50 bg-orange-500 text-white p-3 rounded-full shadow-lg">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>

          <!-- Filters Sidebar -->
          <div :class="[
            'transform transition-transform duration-300 ease-in-out',
            'fixed inset-0 z-40 lg:relative lg:translate-x-0',
            isFilterOpen ? 'translate-x-0' : '-translate-x-full'
          ]">
            <div class="absolute inset-0 bg-black bg-opacity-50 lg:hidden" @click="isFilterOpen = false"></div>
            <IconFilters v-model="filters" @update:modelValue="newVal => filters = { ...newVal }"
              class="relative z-50" />
          </div>

          <!-- Main Content -->
          <main class="flex-1 p-4 sm:p-6">
            <!-- Categories -->
            <div class="mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
              <div class="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                <button v-for="category in categories" :key="category" @click="selectedCategory = category" :class="[
                  'px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap',
                  selectedCategory === category
                    ? 'bg-orange-600 dark:bg-orange-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                ]">
                  {{ category }}
                </button>
              </div>
            </div>

            <!-- Icons Grid -->
            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-3">
              <div v-for="icon in filteredIcons" :key="icon.name" @click="openIconDrawer(icon)" class="bg-white dark:bg-gray-800 p-2.5 sm:p-3.5 rounded-lg shadow-sm hover:shadow-md 
                          transition-all cursor-pointer border border-gray-100 dark:border-gray-700
                          hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div class="aspect-square flex items-center justify-center">
                  <component :is="icon.icon" class="w-7 h-7 sm:w-8 sm:h-8 text-gray-900 dark:text-white"
                    :style="applyIconStyles(icon)" />
                </div>
                <p class="text-[11px] sm:text-xs mt-1.5 text-center text-gray-600 dark:text-gray-400 truncate">
                  {{ icon.name }}
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>

  <!-- Icon Drawer -->
  <IconDrawer :is-open="isDrawerOpen" :icon="selectedIcon?.icon" :icon-name="selectedIcon?.name" :filters="filters"
    @close="isDrawerOpen = false" />
</template>

<style>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>