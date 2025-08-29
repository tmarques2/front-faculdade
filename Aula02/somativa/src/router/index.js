import { createRouter, createWebHistory } from "vue-router";

// Importando as views
import Dashboard from "../views/Dashboard.vue";
import CalendarView from "../views/CalendarView.vue";
import MaintenanceList from "../views/MaintenanceList.vue";
import MaintenanceDetails from "../views/MaintenanceDetails.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/calendario",
    name: "Calendário",
    component: CalendarView,
  },
  {
    path: "/manutencoes",
    name: "Lista de Manutenções",
    component: MaintenanceList,
  },
  {
    path: "/manutencoes/:id",
    name: "Detalhes da Manutenção",
    component: MaintenanceDetails,
    props: true, // permite passar o ID como prop
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
