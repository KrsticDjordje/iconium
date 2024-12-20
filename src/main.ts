import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Inicijalizacija dark mode-a
function initializeDarkMode() {
    const darkMode = localStorage.getItem('darkMode')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (darkMode === 'dark' || (!darkMode && prefersDark)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
}

// Pozivamo inicijalizaciju odmah
initializeDarkMode()

// Pratimo promene system theme
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('darkMode')) {
        if (e.matches) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }
})

createApp(App).mount('#app')
