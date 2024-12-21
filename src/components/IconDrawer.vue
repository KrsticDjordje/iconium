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

// Dodajemo ref za notifikaciju
const showCopyNotification = ref(false);

// Funkcija za preuzimanje SVG
const downloadSVG = () => {
    const svgElement = document.getElementById('preview-icon');
    if (!svgElement) return;

    // Kreiramo novi SVG sa primenjenim stilovima
    const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" 
             width="${width.value}" 
             height="${height.value}" 
             viewBox="0 0 24 24"
             style="color: black;">
            <path 
                d="${svgElement.querySelector('path')?.getAttribute('d')}"
                stroke="currentColor"
                stroke-width="${props.filters.weight / 100}"
                fill="none"
            />
        </svg>
    `;

    // Kreiramo blob i link za preuzimanje
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const blobUrl = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = `${props.iconName}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(blobUrl);
};

// Funkcija za preuzimanje PNG
const downloadPNG = () => {
    const svgElement = document.getElementById('preview-icon');
    if (!svgElement) return;

    // Kreiramo canvas
    const canvas = document.createElement('canvas');
    canvas.width = width.value * 2; // Množimo sa 2 za bolju rezoluciju
    canvas.height = height.value * 2;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Kreiramo SVG sa primenjenim stilovima
    const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" 
             width="${width.value * 2}" 
             height="${height.value * 2}" 
             viewBox="0 0 24 24"
             style="color: black;">
            <path 
                d="${svgElement.querySelector('path')?.getAttribute('d')}"
                stroke="currentColor"
                stroke-width="${props.filters.weight / 100}"
                fill="none"
            />
        </svg>
    `;

    // Konvertujemo SVG u PNG
    const img = new Image();
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Preuzimamo PNG
        canvas.toBlob((blob) => {
            if (!blob) return;
            const blobUrl = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = blobUrl;
            downloadLink.download = `${props.iconName}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(blobUrl);
        }, 'image/png');
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

// Ažuriramo funkciju za kopiranje HTML-a
const copyHtml = () => {
    const iconName = props.iconName.toLowerCase().replace(/\s+/g, '-');
    const htmlCode = `<i class="icon-${iconName}" style="${Object.entries(applyIconStyles()).map(([key, value]) => `${key}: ${value}`).join('; ')}"></i>`;

    navigator.clipboard.writeText(htmlCode).then(() => {
        showCopyNotification.value = true;
        setTimeout(() => {
            showCopyNotification.value = false;
        }, 2000);
    });
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
                        <div class="flex-1 p-6 overflow-y-auto space-y-6">
                            <!-- Icon Preview -->
                            <div class="mb-8">
                                <div class="relative group">
                                    <div
                                        class="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/20 
                                                rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity">
                                    </div>
                                    <div class="relative flex items-center justify-center bg-gradient-to-br 
                                                from-gray-50 to-gray-100/50 dark:from-gray-800 dark:to-gray-900/50 
                                                rounded-2xl p-10 border border-gray-200/50 dark:border-gray-700/30">
                                        <component :is="icon" :id="'preview-icon'" :style="applyIconStyles()" class="text-gray-900 dark:text-white transition-transform 
                                                   group-hover:scale-105 duration-300" />
                                    </div>
                                </div>
                            </div>

                            <!-- Size Controls -->
                            <div class="space-y-4">
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

                            <!-- Download and Copy Options -->
                            <div class="space-y-6">
                                <!-- Download Buttons -->
                                <div class="grid grid-cols-2 gap-3">
                                    <button @click="downloadSVG" class="px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 
                                               hover:from-orange-600 hover:to-orange-700 text-white rounded-xl
                                               shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30
                                               transition-all duration-200 flex items-center justify-center gap-2
                                               hover:-translate-y-0.5 active:translate-y-0">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        SVG
                                    </button>
                                    <button @click="downloadPNG" class="px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 
                                               dark:from-gray-700 dark:to-gray-800 hover:from-gray-200 
                                               hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 
                                               text-gray-900 dark:text-white rounded-xl shadow-lg 
                                               shadow-gray-500/10 hover:shadow-gray-500/20
                                               transition-all duration-200 flex items-center justify-center gap-2
                                               hover:-translate-y-0.5 active:translate-y-0">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        PNG
                                    </button>
                                </div>

                                <!-- Copy HTML Button -->
                                <div class="relative">
                                    <button @click="copyHtml" class="w-full px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 
                                               rounded-xl shadow-lg transition-all duration-200 flex items-center 
                                               justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0
                                               hover:bg-gray-800 dark:hover:bg-gray-100">
                                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        Copy HTML
                                    </button>

                                    <!-- Notification -->
                                    <Transition enter-active-class="transition duration-200 ease-out"
                                        enter-from-class="transform scale-95 opacity-0"
                                        enter-to-class="transform scale-100 opacity-100"
                                        leave-active-class="transition duration-150 ease-in"
                                        leave-from-class="transform scale-100 opacity-100"
                                        leave-to-class="transform scale-95 opacity-0">
                                        <div v-if="showCopyNotification" class="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 
                                                   bg-gray-900 dark:bg-white text-white dark:text-gray-900 
                                                   rounded-lg text-sm font-medium shadow-lg">
                                            Copied!
                                        </div>
                                    </Transition>
                                </div>
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
    @apply transform transition-all duration-200;

    &:hover {
        @apply -translate-y-0.5;
    }

    &:active {
        @apply translate-y-0;
    }
}
</style>