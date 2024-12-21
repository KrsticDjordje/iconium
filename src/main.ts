import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from './i18n'

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


initializeDarkMode()

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('darkMode')) {
        if (e.matches) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }
})

const app = createApp(App)
app.use(i18n)
app.mount('#app')
