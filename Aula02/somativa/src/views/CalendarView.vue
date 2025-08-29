<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Container principal com padding responsivo -->
    <div class="p-4 sm:p-6 lg:p-8 ml-64 transition-all duration-300">
      <!-- Header da página -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Calendário de Manutenções</h1>
            <p class="text-gray-600">Visualize e gerencie suas manutenções programadas</p>
          </div>
          
          <!-- Indicadores de status no header -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              <span class="text-sm text-gray-600">Concluída</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span class="text-sm text-gray-600">Programada</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-red-500 rounded-full"></div>
              <span class="text-sm text-gray-600">Atrasada</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Container do calendário -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <!-- Header do card -->
        <div class="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-white flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
            Cronograma de Manutenções
          </h2>
        </div>

        <!-- Conteúdo do calendário -->
        <div class="p-6">
          <Calendar />
        </div>
      </div>

      <!-- Cards de resumo rápido -->
      <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-lg shadow-md border border-gray-100">
          <div class="flex items-center">
            <div class="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
            <div>
              <p class="text-sm text-gray-600">Este Mês</p>
              <p class="text-lg font-semibold text-gray-900">24 manutenções</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md border border-gray-100">
          <div class="flex items-center">
            <div class="w-2 h-8 bg-green-500 rounded-full mr-3"></div>
            <div>
              <p class="text-sm text-gray-600">Concluídas</p>
              <p class="text-lg font-semibold text-gray-900">18 manutenções</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md border border-gray-100">
          <div class="flex items-center">
            <div class="w-2 h-8 bg-yellow-500 rounded-full mr-3"></div>
            <div>
              <p class="text-sm text-gray-600">Programadas</p>
              <p class="text-lg font-semibold text-gray-900">5 manutenções</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-lg shadow-md border border-gray-100">
          <div class="flex items-center">
            <div class="w-2 h-8 bg-red-500 rounded-full mr-3"></div>
            <div>
              <p class="text-sm text-gray-600">Atrasadas</p>
              <p class="text-lg font-semibold text-gray-900">1 manutenção</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Calendar from "@/components/Calendar.vue";
</script>