<template>
    <header>
        <nav>
            <ul>
                <li><a href="/">Inicio</a></li>
                <li><a href="/about">Sobre</a></li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
header {
    background-color: #000;
    padding: 1rem 0;
}
nav {
    display: flex;
    justify-content: flex-end;  /*alinha no lado direito*/
    align-items: center;    /*alinha vertical*/ 
    height: 60px; 
    padding: 0 20px;
}
nav ul {
    list-style: none;   /*remove as bolinhas*/
    display: flex;
    margin: 0;
    margin-right: 20px;
    padding: 0;
    align-items: center;
    gap: 20px;
}
nav a {
    color: #fff;
    text-decoration: none;  /*remove o sublinhado*/
    font-size: 1.1rem;
}
nav a:hover {
  color: #bf12f3;
}
</style>