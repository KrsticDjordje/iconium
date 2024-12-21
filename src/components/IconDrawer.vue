<script setup lang="ts">
import { ref } from 'vue';

interface IconDrawerProps {
    isOpen: boolean;
    icon: any;
    iconName: string;
    filters: {
        fill: boolean;
        weight: number;
        grade: number;
        opticalSize: number;
    }
}

const props = defineProps<IconDrawerProps>();

const emit = defineEmits<{
    'close': []
}>();

const width = ref(24);
const height = ref(24);

// Funkcija za preuzimanje SVG
const downloadSVG = () => {
    const svgElement = document.getElementById('preview-icon');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${props.iconName}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

// Funkcija za preuzimanje PNG
const downloadPNG = () => {
    const svgElement = document.getElementById('preview-icon');
    if (!svgElement) return;

    const canvas = document.createElement('canvas');
    canvas.width = width.value;
    canvas.height = height.value;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);

    img.onload = () => {
        ctx.drawImage(img, 0, 0, width.value, height.value);
        const pngUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${props.iconName}.png`;
        link.href = pngUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    img.src = url;
};

// Funkcija za primenu filtera
const applyIconStyles = () => {
    return {
        width: `${width.value}px`,
        height: `${height.value}px`,
        stroke: props.filters.fill ? 'currentColor' : 'none',
        strokeWidth: props.filters.weight / 100,
        transform: `scale(${props.filters.opticalSize / 24})`,
        filter: `contrast(${1 + props.filters.grade / 100})`
    };
};
</script>

<template>
    <Transition name="drawer">
        <div v-if="isOpen" class="fixed inset-0 z-50 overflow-hidden">
            <!-- Backdrop -->
            <Transition name="backdrop">
                <div class="absolute inset-0 bg-black/50" @click="emit('close')"></div>
            </Transition>

            <!-- Drawer -->
            <div class="absolute inset-y-0 right-0 w-full max-w-md">
                <div class="h-full bg-white dark:bg-gray-800 shadow-xl transform 
                            transition-all duration-300 ease-[cubic-bezier(0.4, 0, 0.2, 1)]">
                    <div class="h-full flex flex-col">
                        <!-- Header -->
                        <div
                            class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ iconName }}</h2>
                            <button @click="emit('close')"
                                class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <!-- Content -->
                        <div class="flex-1 p-6 overflow-y-auto">
                            <!-- Icon Preview -->
                            <div class="mb-8 flex items-center justify-center bg-gray-50 dark:bg-gray-900 
                              rounded-lg p-8 border-2 border-dashed border-gray-200 dark:border-gray-700">
                                <component :is="icon" :id="'preview-icon'" :style="applyIconStyles()"
                                    class="text-gray-900 dark:text-white" />
                            </div>

                            <!-- Size Controls -->
                            <div class="space-y-4 mb-8">
                                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">Dimensions</h3>
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm text-gray-600 dark:text-gray-400 mb-1">Width</label>
                                        <input type="number" v-model="width" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                                      bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                      focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400">
                                    </div>
                                    <div>
                                        <label
                                            class="block text-sm text-gray-600 dark:text-gray-400 mb-1">Height</label>
                                        <input type="number" v-model="height" class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                                      bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                      focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400">
                                    </div>
                                </div>
                            </div>

                            <!-- Download Buttons -->
                            <div class="space-y-3">
                                <button @click="downloadSVG" class="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg 
                                   transition-colors duration-200 flex items-center justify-center gap-2">
                                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download SVG
                                </button>
                                <button @click="downloadPNG" class="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 
                                   dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg 
                                   transition-colors duration-200 flex items-center justify-center gap-2">
                                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download PNG
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
/* Drawer animacije */
.drawer-enter-active,
.drawer-leave-active {
    transition: opacity 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
    opacity: 0;
}

/* Backdrop animacije */
.backdrop-enter-active,
.backdrop-leave-active {
    transition: opacity 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
    opacity: 0;
}

/* Animacija za drawer sadržaj */
.drawer-enter-active .bg-white,
.drawer-leave-active .bg-white,
.drawer-enter-active .dark\:bg-gray-800,
.drawer-leave-active .dark\:bg-gray-800 {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-enter-from .bg-white,
.drawer-enter-from .dark\:bg-gray-800 {
    transform: translateX(100%);
}

.drawer-leave-to .bg-white,
.drawer-leave-to .dark\:bg-gray-800 {
    transform: translateX(100%);
}

/* Smooth scroll */
.overflow-y-auto {
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(156, 163, 175, 0.3);
        border-radius: 20px;

        &:hover {
            background-color: rgba(156, 163, 175, 0.5);
        }
    }
}

/* Hover efekti za dugmad */
button {
    transition: all 0.2s ease;

    &:active {
        transform: scale(0.98);
    }
}

.download-btn {
    @apply transition-all duration-200;

    &:hover {
        @apply shadow-lg;
        transform: translateY(-1px);
    }

    &:active {
        @apply shadow-md;
        transform: translateY(0);
    }
}
</style>