import { defineStore } from 'pinia'

export const useUsuarioStore = defineStore('usuario', {
  // 📊 Dados que vamos guardar
  state: () => ({
    nome: '',
    email: '',
    logado: false,
    carrinho: [],
    tema: 'claro'
  }),
  
  // 📈 Dados calculados (como computed no Vue)
  getters: {
    // Quantos itens no carrinho
    totalItens: (state) => state.carrinho.length,
    
    // Valor total do carrinho
    valorTotal: (state) => {
      return state.carrinho.reduce((total, item) => total + item.preco, 0)
    },
    
    // Saudação personalizada
    saudacao: (state) => {
      if (state.logado) {
        return `Olá, ${state.nome}! 👋`
      }
      return 'Visitante 🔐'
    }
  },
  
  // ⚡ Ações (funções que modificam os dados)
  actions: {
    // Fazer login
    fazerLogin(nome, email) {
      this.nome = nome
      this.email = email
      this.logado = true
      console.log(`Login realizado: ${nome}`)
    },
    
    // Fazer logout
    fazerLogout() {
      this.nome = ''
      this.email = ''
      this.logado = false
      this.carrinho = []
      console.log('Logout realizado')
    },
    
    // Adicionar item ao carrinho
    adicionarCarrinho(produto) {
      this.carrinho.push({
        id: Date.now(), // ID único simples
        nome: produto.nome,
        preco: produto.preco
      })
      console.log(`Produto adicionado: ${produto.nome}`)
    },
    
    // Remover item do carrinho
    removerCarrinho(id) {
      const index = this.carrinho.findIndex(item => item.id === id)
      if (index > -1) {
        const produto = this.carrinho[index]
        this.carrinho.splice(index, 1)
        console.log(`Produto removido: ${produto.nome}`)
      }
    },
    
    // Mudar tema
    alternarTema() {
      this.tema = this.tema === 'claro' ? 'escuro' : 'claro'
      console.log(`Tema alterado para: ${this.tema}`)
    }
  }
})