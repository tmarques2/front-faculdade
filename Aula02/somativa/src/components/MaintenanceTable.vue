<template>
  <div class="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
    <!-- Header da tabela -->
    <div class="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-slate-50 to-gray-50">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
            </svg>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Histórico de Manutenções</h2>
            <p class="text-gray-500">{{ filteredMaintenances.length }} manutenções encontradas</p>
          </div>
        </div>
        
        <!-- Filtros -->
        <div class="flex flex-col sm:flex-row gap-3">
          <div class="relative">
            <input 
              v-model="searchTerm"
              type="text" 
              placeholder="Buscar máquina..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
          
          <select 
            v-model="statusFilter" 
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="">Todos os status</option>
            <option value="Pendente">Pendente</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Concluída">Concluída</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Tabela -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Máquina
            </th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Data
            </th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Tipo
            </th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Prioridade
            </th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr 
            v-for="(maintenance, index) in paginatedMaintenances" 
            :key="index" 
            class="hover:bg-gray-50 transition-colors duration-200"
          >
            <!-- Máquina -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.78 0-2.678-2.153-1.415-3.414l5-5A2 2 0 009 9.172V5L8 4z"></path>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-900">{{ maintenance.machine }}</div>
                  <div class="text-xs text-gray-500">{{ maintenance.setor || 'Setor A' }}</div>
                </div>
              </div>
            </td>

            <!-- Data -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 font-medium">{{ formatDate(maintenance.date) }}</div>
              <div class="text-xs text-gray-500">{{ getTimeFromDate(maintenance.date) }}</div>
            </td>

            <!-- Tipo -->
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                :class="getTypeColor(maintenance.type)"
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
              >
                {{ getTypeIcon(maintenance.type) }} {{ maintenance.type }}
              </span>
            </td>

            <!-- Prioridade -->
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                :class="getPriorityColor(maintenance.priority || 'Média')"
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
              >
                {{ getPriorityIcon(maintenance.priority || 'Média') }} {{ maintenance.priority || 'Média' }}
              </span>
            </td>

            <!-- Status -->
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                :class="getStatusColor(maintenance.status)"
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
              >
                {{ getStatusIcon(maintenance.status) }} {{ maintenance.status }}
              </span>
            </td>

            <!-- Ações -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center space-x-2">
                <button 
                  @click="viewDetails(maintenance)"
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Ver detalhes"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                </button>
                <button 
                  @click="editMaintenance(maintenance)"
                  class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Editar"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11m-5-10l2 2m0 0l2 2m-2-2l-2-2m2 2l2-2"></path>
                  </svg>
                </button>
                <button 
                  @click="deleteMaintenance(maintenance)"
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Excluir"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginação -->
    <div v-if="totalPages > 1" class="px-6 py-4 border-t border-gray-200 bg-gray-50">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="text-sm text-gray-700">
          Mostrando {{ ((currentPage - 1) * itemsPerPage) + 1 }} a {{ Math.min(currentPage * itemsPerPage, filteredMaintenances.length) }} 
          de {{ filteredMaintenances.length }} resultados
        </div>
        
        <div class="flex items-center space-x-2">
          <button 
            @click="currentPage = currentPage - 1"
            :disabled="currentPage === 1"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          
          <div class="flex space-x-1">
            <button 
              v-for="page in visiblePages" 
              :key="page"
              @click="currentPage = page"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-lg',
                page === currentPage 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
          </div>
          
          <button 
            @click="currentPage = currentPage + 1"
            :disabled="currentPage === totalPages"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>

    <!-- Estado vazio -->
    <div v-if="filteredMaintenances.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">Nenhuma manutenção encontrada</h3>
      <p class="mt-1 text-sm text-gray-500">Tente ajustar os filtros ou adicione uma nova manutenção.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  maintenances: {
    type: Array,
    default: () => [
      { machine: "Prensa A1", date: "2025-08-20", type: "Preventiva", status: "Concluída", priority: "Alta", setor: "Produção A" },
      { machine: "Torno B3", date: "2025-08-22", type: "Corretiva", status: "Pendente", priority: "Crítica", setor: "Produção B" },
      { machine: "Fresadora C2", date: "2025-08-25", type: "Preditiva", status: "Em Andamento", priority: "Média", setor: "Usinagem" },
      { machine: "Soldadora D1", date: "2025-08-28", type: "Preventiva", status: "Pendente", priority: "Baixa", setor: "Soldagem" },
      { machine: "Compressor E5", date: "2025-08-30", type: "Corretiva", status: "Cancelada", priority: "Alta", setor: "Utilidades" }
    ]
  }
})

// Estado reativo
const searchTerm = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Computadas
const filteredMaintenances = computed(() => {
  let filtered = props.maintenances
  
  if (searchTerm.value) {
    filtered = filtered.filter(m => 
      m.machine.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }
  
  if (statusFilter.value) {
    filtered = filtered.filter(m => m.status === statusFilter.value)
  }
  
  return filtered
})

const totalPages = computed(() => 
  Math.ceil(filteredMaintenances.value.length / itemsPerPage.value)
)

const paginatedMaintenances = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredMaintenances.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Métodos utilitários
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('pt-BR')
}

const getTimeFromDate = (date) => {
  return new Date(date).toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const getStatusColor = (status) => {
  const colors = {
    'Pendente': 'bg-yellow-100 text-yellow-800',
    'Em Andamento': 'bg-blue-100 text-blue-800',
    'Concluída': 'bg-green-100 text-green-800',
    'Cancelada': 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const getStatusIcon = (status) => {
  const icons = {
    'Pendente': '🕐',
    'Em Andamento': '⚡',
    'Concluída': '✅',
    'Cancelada': '❌'
  }
  return icons[status] || '❓'
}

const getTypeColor = (type) => {
  const colors = {
    'Preventiva': 'bg-blue-100 text-blue-800',
    'Corretiva': 'bg-orange-100 text-orange-800',
    'Preditiva': 'bg-purple-100 text-purple-800'
  }
  return colors[type] || 'bg-gray-100 text-gray-800'
}

const getTypeIcon = (type) => {
  const icons = {
    'Preventiva': '🔧',
    'Corretiva': '⚠️',
    'Preditiva': '📊'
  }
  return icons[type] || '🔧'
}

const getPriorityColor = (priority) => {
  const colors = {
    'Baixa': 'bg-green-100 text-green-800',
    'Média': 'bg-yellow-100 text-yellow-800',
    'Alta': 'bg-orange-100 text-orange-800',
    'Crítica': 'bg-red-100 text-red-800'
  }
  return colors[priority] || 'bg-gray-100 text-gray-800'
}

const getPriorityIcon = (priority) => {
  const icons = {
    'Baixa': '🟢',
    'Média': '🟡',
    'Alta': '🟠',
    'Crítica': '🔴'
  }
  return icons[priority] || '🟡'
}

// Métodos de ação
const viewDetails = (maintenance) => {
  console.log('Ver detalhes:', maintenance)
  // Implementar modal de detalhes ou navegação
}

const editMaintenance = (maintenance) => {
  console.log('Editar manutenção:', maintenance)
  // Implementar edição
}

const deleteMaintenance = (maintenance) => {
  if (confirm(`Deseja realmente excluir a manutenção da máquina ${maintenance.machine}?`)) {
    console.log('Excluir manutenção:', maintenance)
    // Implementar exclusão
  }
}
</script>