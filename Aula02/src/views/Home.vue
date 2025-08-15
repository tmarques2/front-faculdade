<template>
  <Header />
  <div>
    <!-- Exibe o nome global armazenado no store -->
    <h1>Olá, {{ store.nome }}</h1>
    <!-- Exibe a data atual global armazenada no store -->
    <p>Hoje é {{ store.dataAtual }}</p>
    <!-- Calcula e exibe o preço com desconto usando variáveis globais -->
    <p>Preço com desconto: {{ store.preco - store.desconto }}</p>
  </div>
</template>

<script>
  // Importa a função useMainStore que é o nosso store global do Pinia
  import { useMainStore } from '../store/MainStore.js'
  export default {
    name: 'Home', //
    setup() {
      // Cria uma instância do store para acessar suas variáveis globais
      const store = useMainStore()
      // Retorna o store para que ele possa ser usado dentro do template
      return { store }
    }
  }
</script>
