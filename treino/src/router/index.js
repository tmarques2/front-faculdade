// Importa funções específicas do Vue Router para criar o roteador e definir o tipo de histórico (navegação).
import { createRouter, createWebHistory } from "vue-router";

// Importa o componente "Home", que representa a página inicial da aplicação.
import Home from '../views/Home.vue'
import Sobre from '../views/Sobre.vue'

// Define as rotas da aplicação como um array de objetos.
// Cada objeto representa uma rota com um caminho (`path`) e o componente que será renderizado (`component`).
const routes = [
    { path: '/', component: Home },
    { path: '/about', component: Sobre} // Quando o usuário acessa '/', o componente Home será exibido.
]

// Cria uma instância do roteador usando a função `createRouter`.
// O histórico usado será baseado na API de histórico do navegador (sem hash # na URL).
// As rotas definidas acima são passadas para o roteador.
const router = createRouter({
    history: createWebHistory(), // Usa o modo de histórico HTML5 (sem hash na URL)
    routes // Passa o array de rotas definidas anteriormente
})

// Exporta o roteador para ser utilizado no arquivo principal da aplicação (geralmente main.js ou main.ts)
export default router
