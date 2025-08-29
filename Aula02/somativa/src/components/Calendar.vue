<template>
  <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
    <div class="bg-white px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-slate-800">Calendário de Manutenções</h2>
          <p class="text-slate-500 text-sm">{{ currentMonthName }} {{ currentYear }}</p>
        </div>
        
        <div class="flex items-center space-x-2">
          <button @click="previousMonth" class="p-2 text-slate-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button @click="goToToday" class="px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">Hoje</button>
          <button @click="nextMonth" class="p-2 text-slate-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </div>

    <div class="p-4 md:p-6">
      <div class="grid grid-cols-7 gap-2 mb-3">
        <div v-for="day in daysOfWeek" :key="day" class="text-center text-sm font-semibold text-slate-500 py-2">
          {{ day }}
        </div>
      </div>

      <div class="grid grid-cols-7 gap-2">
        <div 
          v-for="day in calendarDays" 
          :key="day.date"
          :class="[
            'relative min-h-[110px] p-2 border rounded-lg transition-all duration-200 overflow-hidden',
            day.isCurrentMonth ? 'bg-white border-gray-200' : 'bg-slate-50 text-slate-400',
            day.isToday && 'border-2 border-blue-500',
            day.maintenances.length > 0 && 'cursor-pointer hover:bg-slate-50 hover:shadow'
          ]"
          @click="selectDay(day)"
        >
          <span :class="[
            'font-semibold text-xs flex items-center justify-center',
            day.isToday ? 'w-6 h-6 bg-blue-600 text-white rounded-full' : 'w-6 h-6'
          ]">
            {{ day.day }}
          </span>

          <div class="mt-1 space-y-1">
            <div 
              v-for="m in day.visibleMaintenances" :key="m.id"
              :class="getMaintenanceColor(m.status)"
              class="text-xs px-2 py-0.5 rounded text-white font-medium truncate"
              :title="`${m.machine} - ${m.type}`"
            >
              {{ m.machine }}
            </div>
            <div v-if="day.hiddenCount > 0" class="text-xs text-blue-600 font-semibold pt-1">
              +{{ day.hiddenCount }} mais
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-6 py-4 border-t border-gray-200 bg-slate-50">
      <div class="flex flex-wrap gap-x-6 gap-y-2">
        <div v-for="s in statusLegend" :key="s.key" class="flex items-center space-x-2">
          <div :class="s.color" class="w-3 h-3 rounded-full"></div>
          <span class="text-xs text-slate-600">{{ s.label }}</span>
        </div>
      </div>
    </div>
  </div>

  <Modal 
    :show="showDayModal"
    :title="`Manutenções - ${selectedDay ? formatDate(selectedDay.date) : ''}`"
    @close="closeDayModal"
  >
    <div v-if="selectedDay" class="space-y-3">
      <div v-for="m in selectedDay.maintenances" :key="m.id" class="bg-slate-50 rounded-lg p-4 border border-slate-200">
        <div class="flex items-start justify-between mb-2">
          <h4 class="font-semibold text-slate-800">{{ m.machine }}</h4>
          <span :class="getStatusColorClass(m.status)" class="px-3 py-1 rounded-full text-xs font-bold">
            {{ m.status }}
          </span>
        </div>
        <div class="text-sm text-slate-600 space-y-1">
          <p><strong>Tipo:</strong> {{ m.type }}</p>
          <p><strong>Horário:</strong> {{ m.time || 'Não especificado' }}</p>
          <p v-if="m.technician"><strong>Técnico:</strong> {{ m.technician }}</p>
        </div>
      </div>
      <div v-if="!selectedDay.maintenances.length" class="text-center py-8 text-slate-500">
        <p>Nenhuma manutenção agendada para este dia.</p>
      </div>
    </div>
  </Modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import Modal from '@/components/Modal.vue' // <-- IMPORTANTE: Importe o modal!

// A lógica do seu script continua exatamente a mesma.
// Ela já é excelente e não precisa de alterações.
// Apenas colei a parte inicial do seu script para manter a consistência.

// Props
const props = defineProps({
  maintenances: {
    type: Array,
    default: () => [
      // Seus dados de exemplo estão perfeitos
       { id: 1, machine: "Prensa A1", date: "2025-08-20", time: "08:00", type: "Preventiva", status: "Concluída", technician: "João Silva" },
       { id: 2, machine: "Torno B3", date: "2025-08-22", time: "14:00", type: "Corretiva", status: "Pendente", technician: "Maria Santos" },
       { id: 3, machine: "Fresadora C2", date: "2025-08-25", time: "10:30", type: "Preditiva", status: "Em Andamento", technician: "Carlos Lima" },
       { id: 4, machine: "Soldadora D1", date: "2025-08-28", time: "16:00", type: "Preventiva", status: "Pendente", technician: "Ana Costa" },
       { id: 5, machine: "Compressor E5", date: "2025-08-22", time: "09:00", type: "Corretiva", status: "Cancelada", technician: "Pedro Oliveira" }
    ]
  }
})

// Estado reativo
const currentDate = ref(new Date())
const showDayModal = ref(false)
const selectedDay = ref(null)

// Constantes
const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const statusLegend = [
  { key: 'pending', label: 'Pendente', color: 'bg-yellow-400' },
  { key: 'progress', label: 'Em Andamento', color: 'bg-blue-500' },
  { key: 'completed', label: 'Concluída', color: 'bg-green-500' },
  { key: 'cancelled', label: 'Cancelada', color: 'bg-red-500' }
]

// Computadas
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())

const currentMonthName = computed(() => new Date(currentYear.value, currentMonth.value).toLocaleString('pt-BR', { month: 'long' }))

const calendarDays = computed(() => {
  const year = currentYear.value;
  const month = currentMonth.value;
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(firstDay.getDate() - firstDay.getDay());
  const endDate = new Date(lastDay);
  endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()));
  
  const days = [];
  let day = new Date(startDate);
  
  while (day <= endDate) {
    const dateStr = day.toISOString().split('T')[0];
    const dayMaintenances = props.maintenances.filter(m => m.date === dateStr);
    
    days.push({
      date: dateStr,
      day: day.getDate(),
      isCurrentMonth: day.getMonth() === month,
      isToday: dateStr === new Date().toISOString().split('T')[0],
      maintenances: dayMaintenances,
      visibleMaintenances: dayMaintenances.slice(0, 2),
      hiddenCount: Math.max(0, dayMaintenances.length - 2)
    });
    
    day.setDate(day.getDate() + 1);
  }
  return days;
});

// Métodos
const previousMonth = () => { currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1); };
const nextMonth = () => { currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1); };
const goToToday = () => { currentDate.value = new Date(); };
const selectDay = (day) => {
  if (day.maintenances.length > 0) {
    selectedDay.value = day;
    showDayModal.value = true;
  }
};
const closeDayModal = () => { showDayModal.value = false; };
const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('pt-BR', { timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long' });
const getMaintenanceColor = (status) => ({
  'Pendente': 'bg-yellow-400',
  'Em Andamento': 'bg-blue-500',
  'Concluída': 'bg-green-500',
  'Cancelada': 'bg-red-500'
}[status] || 'bg-gray-400');

const getStatusColorClass = (status) => ({
  'Pendente': 'bg-yellow-100 text-yellow-800',
  'Em Andamento': 'bg-blue-100 text-blue-800',
  'Concluída': 'bg-green-100 text-green-800',
  'Cancelada': 'bg-red-100 text-red-800'
}[status] || 'bg-gray-100 text-gray-800');
</script>