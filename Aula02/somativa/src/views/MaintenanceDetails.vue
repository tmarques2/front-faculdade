<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Container principal -->
    <div class="p-4 sm:p-6 lg:p-8 ml-64 transition-all duration-300">
      <!-- Header da página -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div class="mb-4 sm:mb-0">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Detalhes da Manutenção</h1>
            <p class="text-gray-600">Visualize e gerencie informações detalhadas</p>
          </div>
          
          <!-- Breadcrumb -->
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-2">
              <li>
                <a href="#" class="text-gray-500 hover:text-gray-700">Dashboard</a>
              </li>
              <li>
                <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
              </li>
              <li>
                <span class="text-gray-900 font-medium">Detalhes</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <!-- Card principal com informações da manutenção -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-8">
        <!-- Header do card -->
        <div class="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-white flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
              </svg>
              Informações da Manutenção
            </h2>
            
            <!-- Status badge -->
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              {{ maintenance.status }}
            </span>
          </div>
        </div>

        <!-- Conteúdo do card -->
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Informação da máquina -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center mb-2">
                <svg class="w-5 h-5 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm font-medium text-gray-600">Máquina</span>
              </div>
              <p class="text-lg font-semibold text-gray-900">{{ maintenance.machine }}</p>
            </div>

            <!-- Data da manutenção -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center mb-2">
                <svg class="w-5 h-5 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm font-medium text-gray-600">Data</span>
              </div>
              <p class="text-lg font-semibold text-gray-900">{{ formatDate(maintenance.date) }}</p>
            </div>

            <!-- Tipo de manutenção -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex items-center mb-2">
                <svg class="w-5 h-5 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
                <span class="text-sm font-medium text-gray-600">Tipo</span>
              </div>
              <p class="text-lg font-semibold text-gray-900">{{ maintenance.type }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Ações disponíveis -->
      <div class="flex flex-wrap gap-4 mb-8">
        <button 
          @click="showModal = true"
          class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 shadow-lg hover:shadow-xl">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
          </svg>
          Ver Detalhes Completos
        </button>

        <button class="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 shadow-lg hover:shadow-xl">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
          </svg>
          Editar Manutenção
        </button>

        <button class="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 shadow-lg hover:shadow-xl">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
          Gerar Relatório
        </button>
      </div>

      <!-- Histórico de atividades -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900 flex items-center">
            <svg class="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
            </svg>
            Histórico de Atividades
          </h2>
        </div>
        
        <div class="p-6">
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p class="text-sm font-medium text-gray-900">Manutenção concluída</p>
                <p class="text-sm text-gray-600">20/08/2025 às 14:30</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p class="text-sm font-medium text-gray-900">Manutenção iniciada</p>
                <p class="text-sm text-gray-600">20/08/2025 às 09:00</p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p class="text-sm font-medium text-gray-900">Manutenção agendada</p>
                <p class="text-sm text-gray-600">15/08/2025 às 16:20</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de detalhes -->
      <Modal :show="showModal" title="Detalhes Completos da Manutenção" confirmText="Salvar Alterações"
             @close="showModal = false" @confirm="saveChanges">
        <div class="space-y-6">
          <!-- Informações básicas -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Informações Básicas</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="font-semibold text-gray-700">Máquina:</span>
                <span class="text-gray-900">{{ maintenance.machine }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-semibold text-gray-700">Data:</span>
                <span class="text-gray-900">{{ formatDate(maintenance.date) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-semibold text-gray-700">Tipo:</span>
                <span class="text-gray-900">{{ maintenance.type }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-semibold text-gray-700">Status:</span>
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {{ maintenance.status }}
                </span>
              </div>
            </div>
          </div>

          <!-- Informações técnicas -->
          <div class="bg-blue-50 p-4 rounded-lg">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Informações Técnicas</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="font-semibold text-gray-700">Técnico Responsável:</span>
                <span class="text-gray-900">João Silva</span>
              </div>
              <div class="flex justify-between">
                <span class="font-semibold text-gray-700">Duração:</span>
                <span class="text-gray-900">5h 30min</span>
              </div>
              <div class="flex justify-between">
                <span class="font-semibold text-gray-700">Próxima Manutenção:</span>
                <span class="text-gray-900">20/11/2025</span>
              </div>
            </div>
          </div>

          <!-- Observações -->
          <div class="bg-yellow-50 p-4 rounded-lg">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Observações</h3>
            <p class="text-sm text-gray-700">
              Manutenção preventiva realizada conforme cronograma. Substituição de filtros e verificação geral dos componentes. 
              Todos os sistemas operando normalmente após os procedimentos.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "@/components/Modal.vue";

const showModal = ref(false);

const maintenance = ref({
  machine: "Prensa A1",
  date: "2025-08-20",
  type: "Preventiva",
  status: "Concluída"
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const saveChanges = () => {
  // Simulação de salvamento
  alert("Alterações salvas com sucesso!");
  showModal.value = false;
};
</script>