<template>
  <div class="flex h-screen">
    <!-- Sidebar fixa -->
    <Sidebar />

    <!-- Conteúdo principal -->
    <div class="flex flex-col flex-1 ml-64">
      <!-- Navbar no topo -->
      <Navbar />

      <!-- Páginas carregadas pelo router -->
      <main class="flex-1 bg-gray-100 overflow-y-auto p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue"
import Sidebar from "./components/Sidebar.vue"
</script>
