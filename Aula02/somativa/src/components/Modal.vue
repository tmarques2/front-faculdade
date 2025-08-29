<template>
  <Transition name="modal-fade">
    <div 
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      @click.self="close"
    >
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg m-4 transform transition-transform duration-300 scale-95"
           :class="{ 'scale-100': show }">
        
        <div class="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 class="text-xl font-semibold text-slate-800">{{ title }}</h3>
          <button 
            @click="close"
            class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="p-6 max-h-[70vh] overflow-y-auto">
          <slot />
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Modal'
  }
});

const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>

<style>
/* Animações de entrada e saída para o modal */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .transform,
.modal-fade-leave-active .transform {
  transition: transform 0.3s ease;
}
</style>