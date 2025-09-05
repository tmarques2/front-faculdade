<template>
    <section>
        <h1>Olá Mundo</h1>
    </section>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
    components: {Header, Footer}
}
</script>

<style scoped>
h1 {
    color: red;
    text-align: center;
}
</style>