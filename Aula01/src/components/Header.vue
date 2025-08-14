<template>
  <header>
    <div class="logo">
      <img src="../assets/logo.png" alt="Minha Logo" />
    </div>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">Sobre</a></li>
        <li><a href="/services">Serviços</a></li>
        <li><a href="/contacts">Contatos</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped>
header {
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
}
nav ul li{
  margin-right: 20px;
}
nav ul li a{
  color: black;
  text-decoration: none;
  padding: 6px 8px;
  display: block;
  font-size: 18px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.logo img{
  height: 100px;
  width: auto;
}
</style>
