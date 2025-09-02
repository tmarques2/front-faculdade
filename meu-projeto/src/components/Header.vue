<template>
  <header class="bg-blue-600 text-white p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold">Agência de Viagem</h1>
      <nav>
        <ul class="flex space-x-6">
          <li><a href="/" class="hover:underline">Home</a></li>
          <li><a href="/sobre" class="hover:underline">Sobre</a></li>
          <li><a href="/contato" class="hover:underline">Contato</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<!--bg-blue-600: fundo azul escuro
text-white: texto branco
p-4: padding em todos os lados (16px)
shadow-md: sombra para destacar o header
container mx-auto: centraliza e limita a largura do conteúdo
flex justify-between items-center: layout flexbox com espaçamento entre logo e menu, alinhado verticalmente
flex space-x-6: itens do menu em linha com espaço entre eles
hover:underline: sublinha o link quando passar o mouse-->