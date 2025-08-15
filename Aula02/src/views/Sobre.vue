<template>
  <div>
    <!-- Exibe o nome global vindo do store -->
    <h1>Bem-vinda, {{ store.nome }}</h1>
    <!-- Mostra a data global -->
    <p>Data atual: {{ store.dataAtual }}</p>
    <!-- Mostra o preço com desconto usando variáveis globais -->
    <p>Preço com desconto: {{ store.preco - store.desconto }}</p>
  </div>
</template>

<script>
  import { useMainStore } from '../store/MainStore' // Importa o store global
  export default {
    name: 'Sobre', // Nome do componente/página
    setup() {
    const store = useMainStore() // Pega a instância do store
    return { store } // Deixa disponível no template
    }
  }
</script>