<template>
  <Header />
  <section class="intro">
    <h2>Sobre Nós</h2>
    <p>Somos uma agência dedicada a criar experiências inesquecíveis em suas viagens.</p>
  </section>

  <section class="mission">
    <div class="icon">🌍</div>
    <div>
      <h3>Nossa Missão</h3>
      <p>
        Proporcionar viagens que conectam pessoas a culturas, lugares e emoções, 
        com segurança, conforto e atendimento personalizado.
      </p>
    </div>
  </section>

  <Footer />
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
  components: { Header, Footer },
}
</script>

<style scoped>

</style>
