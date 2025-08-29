<template>
  <div class="bg-white shadow-lg rounded-xl p-8 border border-gray-200 w-full max-w-2xl mx-auto">
    
    <div class="flex items-center space-x-4 mb-8">
      <div class="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-sm">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      </div>
      <div>
        <h2 class="text-2xl font-bold text-slate-800">Registrar Manutenção</h2>
        <p class="text-slate-500">Preencha os detalhes para agendar uma nova tarefa.</p>
      </div>
    </div>

    <form @submit.prevent="submitForm" class="space-y-5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label for="machine" class="form-label">Máquina *</label>
          <input id="machine" v-model="form.machine" type="text" placeholder="Ex: Prensa Hidráulica A1" class="form-input" required />
        </div>
        
        <div>
          <label for="date" class="form-label">Data *</label>
          <input id="date" v-model="form.date" type="date" class="form-input" required />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label for="type" class="form-label">Tipo de Manutenção</label>
          <select id="type" v-model="form.type" class="form-select">
            <option>Preventiva</option>
            <option>Corretiva</option>
            <option>Preditiva</option>
          </select>
        </div>

        <div>
          <label for="status" class="form-label">Status</label>
          <select id="status" v-model="form.status" class="form-select">
            <option>Pendente</option>
            <option>Em Andamento</option>
            <option>Concluída</option>
            <option>Cancelada</option>
          </select>
        </div>
      </div>

      <div>
        <label for="description" class="form-label">Descrição (Opcional)</label>
        <textarea id="description" v-model="form.description" rows="4" placeholder="Detalhes do serviço: troca de óleo, inspeção de filtros, etc." class="form-input resize-y"></textarea>
      </div>

      <div class="flex flex-col sm:flex-row-reverse gap-4 pt-5 border-t border-gray-200 mt-8">
        <button type="submit" class="btn-primary" :disabled="isSubmitting">
          <span v-if="!isSubmitting">Salvar Manutenção</span>
          <span v-else class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Salvando...
          </span>
        </button>
        <button type="button" @click="resetForm" class="btn-secondary">
          Limpar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Data do formulário com valores iniciais claros
const getInitialFormState = () => ({
  machine: "",
  date: new Date().toISOString().split('T')[0], // Define a data de hoje como padrão
  type: "Preventiva",
  status: "Pendente",
  description: ""
});

const form = ref(getInitialFormState());
const isSubmitting = ref(false);

const submitForm = async () => {
  isSubmitting.value = true;
  try {
    // Simula uma chamada de API com um pequeno atraso
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Formulário enviado:', form.value);
    alert('Manutenção registrada com sucesso!');
    resetForm();
  } catch (error) {
    console.error("Erro no envio:", error);
    alert('Falha ao registrar manutenção.');
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  form.value = getInitialFormState();
};
</script>

<style scoped>
/* Estilos reutilizáveis para os campos do formulário para manter o template limpo */
.form-label {
  @apply block text-sm font-medium text-slate-700 mb-1;
}
.form-input, .form-select {
  @apply w-full px-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50
         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
         placeholder:text-slate-400;
}
.btn-primary {
  @apply w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold
         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
         transition-all duration-200 shadow-sm disabled:bg-blue-300 disabled:cursor-not-allowed;
}
.btn-secondary {
  @apply w-full sm:w-auto px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-lg 
         font-semibold hover:bg-slate-50 transition-colors;
}
</style>