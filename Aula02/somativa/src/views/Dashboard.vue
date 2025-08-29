<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Container principal -->
    <div class="p-4 sm:p-6 lg:p-8 ml-64 transition-all duration-300">
      <!-- Header do Dashboard -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div class="mb-4 sm:mb-0">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p class="text-gray-600">Visão geral do sistema de manutenção preventiva</p>
          </div>
          
          <!-- Data e hora atual -->
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <p class="text-sm text-gray-500">Última atualização</p>
              <p class="text-sm font-medium text-gray-900">{{ currentDateTime }}</p>
            </div>
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <!-- KPIs Grid -->
      <div class="mb-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="p-6">
              <KpiCard 
                title="Máquinas Ativas" 
                :value="12" 
                status="Operacionais" 
                statusColor="text-green-600"
                class="border-none shadow-none"
              />
            </div>
            <div class="h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
          </div>

          <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="p-6">
              <KpiCard 
                title="Pendentes" 
                :value="3" 
                status="Agendadas" 
                statusColor="text-yellow-600"
                class="border-none shadow-none"
              />
            </div>
            <div class="h-1 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
          </div>

          <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="p-6">
              <KpiCard 
                title="Concluídas" 
                :value="8" 
                status="Este mês" 
                statusColor="text-blue-600"
                class="border-none shadow-none"
              />
            </div>
            <div class="h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
          </div>

          <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div class="p-6">
              <KpiCard 
                title="Críticas" 
                :value="1" 
                status="Urgente" 
                statusColor="text-red-600"
                class="border-none shadow-none"
              />
            </div>
            <div class="h-1 bg-gradient-to-r from-red-400 to-red-600"></div>
          </div>
        </div>
      </div>

      <!-- Seção principal - Tabela e Calendário -->
      <div class="grid grid-cols-1 xl:grid-cols-5 gap-8">
        <!-- Tabela de Manutenções (60% da largura) -->
        <div class="xl:col-span-3">
          <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <!-- Header da tabela -->
            <div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-900 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h4a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
                  </svg>
                  Manutenções Recentes
                </h2>
                <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Ver todas
                </button>
              </div>
            </div>
            
            <!-- Conteúdo da tabela -->
            <div class="p-6">
              <MaintenanceTable />
            </div>
          </div>
        </div>

        <!-- Calendário (40% da largura) -->
        <div class="xl:col-span-2">
          <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <!-- Header do calendário -->
            <div class="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-900 flex items-center">
                <svg class="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
                Cronograma
              </h2>
            </div>
            
            <!-- Conteúdo do calendário -->
            <div class="p-6">
              <Calendar />
            </div>
          </div>
        </div>
      </div>

      <!-- Seção de alertas/notificações -->
      <div class="mt-8">
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="ml-3 flex-1">
              <h3 class="text-sm font-medium text-amber-800">Atenção necessária</h3>
              <p class="mt-1 text-sm text-amber-700">
                Há 1 manutenção crítica pendente que requer ação imediata. 
                <a href="#" class="font-medium underline hover:text-amber-900">Visualizar detalhes</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import KpiCard from "@/components/KpiCard.vue";
import MaintenanceTable from "@/components/MaintenanceTable.vue";
import Calendar from "@/components/Calendar.vue";

const currentDateTime = ref('');

onMounted(() => {
  updateDateTime();
  setInterval(updateDateTime, 60000); // Atualiza a cada minuto
});

const updateDateTime = () => {
  const now = new Date();
  currentDateTime.value = now.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
</script>