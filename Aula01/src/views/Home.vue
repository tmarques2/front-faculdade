<template>
  <Header />
  <section>
    <h2>Bem-vindo à nossa agência!</h2>
    <div class="card-container">
      <div class="card">
        <img src="../assets/paris.png" alt="Paris" />
        <div class="card-content">
          <h4>Paris</h4>
          <p>Descubra a cidade luz e seus encantos inesquecíveis.</p>
        </div>
      </div>

      <div class="card">
        <img src="../assets/grecia.png" alt="Grecia" />
        <div class="card-content">
          <h4>Paris</h4>
          <p>Descubra a cidade luz e seus encantos inesquecíveis.</p>
        </div>
      </div>

      <div class="card">
        <img src="../assets/lencois.png" alt="Lençois Maranhenses" />
        <div class="card-content">
          <h4>Paris</h4>
          <p>Descubra a cidade luz e seus encantos inesquecíveis.</p>
        </div>
      </div>
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
.card-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 2rem;
  margin: 0 200px;
}

.card {
  width: 300px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: filter 0.3s ease;
}

.card:hover img {
  filter: brightness(85%);
}

.card-content {
  padding: 1rem;
  text-align: center;
  transition: color 0.3s ease;
}

.card-content h4 {
  margin: 0.5rem 0;
  color: #333;
  font-size: 1.2rem;
}

.card-content p {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.4;
}

</style>


