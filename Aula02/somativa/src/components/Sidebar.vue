<template>
  <aside class="w-64 bg-gray-800 text-white h-screen p-6 fixed">
    <h2 class="text-2xl font-bold mb-6">Menu</h2>
    <ul class="space-y-4">
      <li><router-link to="/" class="block hover:bg-gray-700 rounded-lg p-2">Dashboard</router-link></li>
      <li><router-link to="/calendario" class="block hover:bg-gray-700 rounded-lg p-2">Calendário</router-link></li>
      <li><router-link to="/manutencoes" class="block hover:bg-gray-700 rounded-lg p-2">Manutenções</router-link></li>
    </ul>
  </aside>
</template>
