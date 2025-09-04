<template>
  <div class="login-card">
    <h2>{{ store.logado ? 'Área do Usuário' : 'Login' }}</h2>
    
    <!-- Se NÃO estiver logado -->
    <div v-if="!store.logado" class="login-form">
      <input 
        v-model="nome"
        placeholder="Seu nome"
        class="input-field"
      >
      <input 
        v-model="email"
        placeholder="Seu email"
        type="email"
        class="input-field"
      >
      <button @click="login" class="btn-primary">
        Entrar
      </button>
    </div>
    
    <!-- Se estiver logado -->
    <div v-else class="user-info">
      <p class="welcome">{{ store.saudacao }}</p>
      <p><strong>Email:</strong> {{ store.email }}</p>
      <p><strong>Tema:</strong> {{ store.tema }}</p>
      
      <div class="user-actions">
        <button @click="store.alternarTema()" class="btn-secondary">
          {{ store.tema === 'claro' ? '🌙 Escuro' : '☀️ Claro' }}
        </button>
        
        <button @click="store.fazerLogout()" class="btn-danger">
          Sair
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUsuarioStore } from '@/stores/usuario'

// Pegar a store
const store = useUsuarioStore()

// Dados do formulário
const nome = ref('')
const email = ref('')

// Função para fazer login
function login() {
  if (nome.value && email.value) {
    store.fazerLogin(nome.value, email.value)
    // Limpar campos
    nome.value = ''
    email.value = ''
  } else {
    alert('Preencha nome e email!')
  }
}
</script>

<style scoped>
.login-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin: 1rem;
  max-width: 400px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-field {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.user-info {
  text-align: center;
}

.welcome {
  font-size: 1.2rem;
  color: #42b883;
  font-weight: bold;
  margin-bottom: 1rem;
}

.user-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.btn-primary {
  background: #42b883;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.btn-secondary {
  background: #6c757d;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-danger {
  background: #dc3545;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary:hover, .btn-secondary:hover, .btn-danger:hover {
  opacity: 0.8;
}
</style>