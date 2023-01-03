import { createRouter, createWebHistory } from "vue-router";

// 路由信息
const routes = [
    {
        path: "/",
        name: "Index",
        component: () => import('../views/index/index.vue'),
    },
    {
        path: "/test",
        name: "test",
        component: () => import('../views/index/test.vue'),
    },
];

// 导出路由
const router = createRouter({
    history: createWebHistory(),
    routes
});