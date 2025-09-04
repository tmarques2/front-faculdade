<template>
  <div id="app" :class="{ 'tema-escuro': store.tema === 'escuro' }">
    <header class="header">
      <h1>🍍 Minha App com Pinia</h1>
      <div class="header-info">
        <span>{{ store.saudacao }}</span>
        <span v-if="store.logado">
          🛒 {{ store.totalItens }} itens
        </span>
      </div>
    </header>
    
    <main class="main">
      <div class="container">
        <!-- Componentes lado a lado -->
        <LoginComponent />
        <CarrinhoComponent />
      </div>
    </main>
    
    <footer class="footer">
      <p>Testando Pinia no Vue 3 🚀</p>
    </footer>
  </div>
</template>

<script setup>
import { useUsuarioStore } from '@/stores/usuario'
import LoginComponent from '@/components/LoginComponent.vue'
import CarrinhoComponent from '@/components/CarrinhoComponent.vue'

const store = useUsuarioStore()
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Arial, sans-serif;
  min-height: 100vh;
  background: #f5f5f5;
  transition: all 0.3s ease;
}

.tema-escuro {
  background: #2d3748 !important;
  color: white;
}

.tema-escuro .login-card,
.tema-escuro .carrinho-card {
  background: #4a5568 !important;
  color: white;
}

.header {
  background: #42b883;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.header-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.main {
  padding: 2rem;
  min-height: calc(100vh - 140px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .container {
    grid-template-columns: 1fr;
  }
}

.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1rem;
}
</style>