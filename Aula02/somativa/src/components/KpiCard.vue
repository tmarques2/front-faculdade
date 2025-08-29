<template>
  <div class="bg-white rounded-xl shadow-md hover:shadow-lg p-6 border border-gray-200 hover:-translate-y-1 transition-all duration-300 group">
    
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center space-x-4">
        <div :class="iconBg" class="w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-sm">
          <component :is="iconComponent" class="w-6 h-6" />
        </div>
        <div>
          <p class="text-slate-600 font-semibold">{{ title }}</p>
          <p v-if="subtitle" class="text-xs text-slate-400">{{ subtitle }}</p>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-4xl font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
        {{ value }}
      </h2>
      <p v-if="description" class="text-sm text-slate-500">
        {{ description }}
      </p>
    </div>

  </div>
</template>

<script setup>
import { computed, h } from 'vue';

// Definição dos SVGs como componentes funcionais para melhor performance
const icons = {
  ExclamationTriangle: {
    render: () => h('svg', { fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z' })
    ])
  },
  CheckCircle: {
    render: () => h('svg', { fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
  },
  Clock: {
    render: () => h('svg', { fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z' })
    ])
  }
};

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: String,
  value: {
    type: [String, Number],
    required: true
  },
  description: String,
  icon: {
    type: String,
    default: 'ExclamationTriangle' // Um ícone padrão
  },
  iconBg: {
    type: String,
    default: 'bg-blue-500' // Cor de fundo padrão
  }
});

// Computada para selecionar dinamicamente o componente do ícone
const iconComponent = computed(() => icons[props.icon] || icons.ExclamationTriangle);

</script>