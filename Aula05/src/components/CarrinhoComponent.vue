<template>
  <div class="carrinho-card">
    <h2>🛒 Carrinho de Compras</h2>
    
    <!-- Adicionar produtos -->
    <div class="add-produto">
      <h3>Adicionar Produto</h3>
      <input 
        v-model="novoProduto.nome"
        placeholder="Nome do produto"
        class="input-field"
      >
      <input 
        v-model.number="novoProduto.preco"
        placeholder="Preço"
        type="number"
        step="0.01"
        class="input-field"
      >
      <button @click="adicionar" class="btn-primary">
        Adicionar
      </button>
    </div>
    
    <!-- Lista do carrinho -->
    <div class="carrinho-lista">
      <div v-if="store.carrinho.length === 0" class="carrinho-vazio">
        Carrinho vazio 😔
      </div>
      
      <div v-else>
        <h3>Itens no Carrinho ({{ store.totalItens }})</h3>
        
        <div 
          v-for="item in store.carrinho" 
          :key="item.id"
          class="carrinho-item"
        >
          <span>{{ item.nome }}</span>
          <span class="preco">R$ {{ item.preco.toFixed(2) }}</span>
          <button 
            @click="store.removerCarrinho(item.id)"
            class="btn-remove"
          >
            ❌
          </button>
        </div>
        
        <div class="total">
          <strong>Total: R$ {{ store.valorTotal.toFixed(2) }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useUsuarioStore } from '@/stores/usuario'

const store = useUsuarioStore()

// Dados do novo produto
const novoProduto = reactive({
  nome: '',
  preco: 0
})

function adicionar() {
  if (novoProduto.nome && novoProduto.preco > 0) {
    store.adicionarCarrinho(novoProduto)
    // Limpar campos
    novoProduto.nome = ''
    novoProduto.preco = 0
  } else {
    alert('Preencha o nome e preço válidos!')
  }
}
</script>

<style scoped>
.carrinho-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin: 1rem;
}

.add-produto {
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.add-produto h3 {
  margin-bottom: 1rem;
  color: #333;
}

.input-field {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

.btn-primary {
  background: #42b883;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.carrinho-vazio {
  text-align: center;
  color: #666;
  padding: 2rem;
  font-style: italic;
}

.carrinho-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.preco {
  color: #42b883;
  font-weight: bold;
}

.btn-remove {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
}

.total {
  text-align: right;
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #333;
}
</style>