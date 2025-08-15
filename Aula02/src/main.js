// Importa o Vue
import { createApp } from 'vue'

// Importa o arquivo principal do site (onde está a estrutura do site)
import App from './App.vue'

// Importa o arquivo com as rotas
import router from './router'

// Importa a função createPinia para usar variáveis globais
import { createPinia } from 'pinia'

// 1. Cria a aplicação Vue (apenas uma vez!)
const app = createApp(App)

// 2. Habilita o Pinia para usar stores globais
app.use(createPinia())

// 3. Adiciona as rotas no site (permite navegar entre páginas)
app.use(router)

// 4. Monta a aplicação no elemento HTML com id="app" (apenas uma vez!)
app.mount('#app')
