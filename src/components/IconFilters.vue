<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    modelValue: {
        fill: boolean;
        weight: number;
        grade: number;
        opticalSize: number;
    }
}>();

const emit = defineEmits<{
    'update:modelValue': [value: typeof props.modelValue]
    'close': []
}>();

// Lokalno stanje koje prati props
const filters = ref({ ...props.modelValue });

// Emitujemo promene nazad roditelju
watch(filters, (newVal) => {
    emit('update:modelValue', { ...newVal });
}, { deep: true });

// Ažuriramo lokalno stanje kada se promene props
watch(() => props.modelValue, (newVal) => {
    if (JSON.stringify(filters.value) !== JSON.stringify(newVal)) {
        filters.value = { ...newVal };
    }
}, { deep: true });
</script>

<template>
    <div class="filters-sidebar w-[280px] sm:w-70 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm 
                border-r border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6 shadow-lg h-screen 
                overflow-y-auto">
        <!-- Mobile Close Button -->
        <div class="flex justify-between items-center mb-6 lg:hidden">
            <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Icon Settings</h2>
            <button @click="$emit('close')" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <!-- Desktop Title -->
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-6 hidden lg:block">
            Icon Settings
        </h2>

        <div class="space-y-8">
            <!-- Fill Option -->
            <div class="relative">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                        <span>Fill</span>
                        <button class="group relative">
                            <svg class="w-4 h-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 
                                    dark:hover:text-gray-300 transition-colors" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clip-rule="evenodd" />
                            </svg>
                            <span class="absolute -top-2 left-6 w-48 p-2 bg-gray-800 text-xs text-white rounded-md 
                                     opacity-0 group-hover:opacity-100 transition-opacity">
                                Toggle fill mode for icons
                            </span>
                        </button>
                    </h3>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="filters.fill" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                              peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer 
                              dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                              after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                              after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 
                              after:transition-all dark:border-gray-600 peer-checked:bg-orange-600"></div>
                </label>
            </div>

            <!-- Weight Slider -->
            <div class="relative">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Weight</h3>
                    <span class="px-2 py-1 text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-600 
                                dark:text-orange-400 rounded-md">{{ filters.weight }}</span>
                </div>
                <input type="range" v-model="filters.weight" min="100" max="700" step="100" class="w-full appearance-none h-2 rounded-lg bg-gray-200 dark:bg-gray-700
                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                           [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-orange-500 
                           [&::-webkit-slider-thumb]:dark:bg-orange-400 [&::-webkit-slider-thumb]:rounded-full 
                           [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 
                           [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md
                           [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 
                           [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-orange-500 
                           [&::-moz-range-thumb]:dark:bg-orange-400 [&::-moz-range-thumb]:rounded-full 
                           [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 
                           [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md
                           [&::-webkit-slider-runnable-track]:bg-gradient-to-r 
                           [&::-webkit-slider-runnable-track]:from-orange-500 
                           [&::-webkit-slider-runnable-track]:to-orange-400
                           [&::-webkit-slider-runnable-track]:rounded-lg
                           [&::-moz-range-track]:bg-gradient-to-r 
                           [&::-moz-range-track]:from-orange-500 
                           [&::-moz-range-track]:to-orange-400
                           [&::-moz-range-track]:rounded-lg">
                <div class="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>Light</span>
                    <span>Bold</span>
                </div>
            </div>

            <!-- Grade Slider -->
            <div class="relative">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Grade</h3>
                    <span class="px-2 py-1 text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-600 
                                dark:text-orange-400 rounded-md">{{ filters.grade }}</span>
                </div>
                <input type="range" v-model="filters.grade" min="-25" max="200" class="w-full appearance-none h-2 rounded-lg bg-gray-200 dark:bg-gray-700
                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                           [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-orange-500 
                           [&::-webkit-slider-thumb]:dark:bg-orange-400 [&::-webkit-slider-thumb]:rounded-full 
                           [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 
                           [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md
                           [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 
                           [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-orange-500 
                           [&::-moz-range-thumb]:dark:bg-orange-400 [&::-moz-range-thumb]:rounded-full 
                           [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 
                           [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md
                           [&::-webkit-slider-runnable-track]:bg-gradient-to-r 
                           [&::-webkit-slider-runnable-track]:from-orange-500 
                           [&::-webkit-slider-runnable-track]:to-orange-400
                           [&::-webkit-slider-runnable-track]:rounded-lg
                           [&::-moz-range-track]:bg-gradient-to-r 
                           [&::-moz-range-track]:from-orange-500 
                           [&::-moz-range-track]:to-orange-400
                           [&::-moz-range-track]:rounded-lg">
                <div class="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>Thin</span>
                    <span>Thick</span>
                </div>
            </div>

            <!-- Optical Size Slider -->
            <div class="relative">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Optical Size</h3>
                    <span class="px-2 py-1 text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-600 
                                dark:text-orange-400 rounded-md">{{ filters.opticalSize }}px</span>
                </div>
                <input type="range" v-model="filters.opticalSize" min="20" max="48" class="w-full appearance-none h-2 rounded-lg bg-gray-200 dark:bg-gray-700
                           [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                           [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-orange-500 
                           [&::-webkit-slider-thumb]:dark:bg-orange-400 [&::-webkit-slider-thumb]:rounded-full 
                           [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 
                           [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md
                           [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 
                           [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-orange-500 
                           [&::-moz-range-thumb]:dark:bg-orange-400 [&::-moz-range-thumb]:rounded-full 
                           [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 
                           [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md
                           [&::-webkit-slider-runnable-track]:bg-gradient-to-r 
                           [&::-webkit-slider-runnable-track]:from-orange-500 
                           [&::-webkit-slider-runnable-track]:to-orange-400
                           [&::-webkit-slider-runnable-track]:rounded-lg
                           [&::-moz-range-track]:bg-gradient-to-r 
                           [&::-moz-range-track]:from-orange-500 
                           [&::-moz-range-track]:to-orange-400
                           [&::-moz-range-track]:rounded-lg">
                <div class="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>20px</span>
                    <span>48px</span>
                </div>
            </div>
        </div>
    </div>
</template>