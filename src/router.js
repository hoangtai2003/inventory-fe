import { createRouter, createWebHistory } from "vue-router";

import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Home from "./components/Home.vue";
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login,
        meta: {public : true} // Cho phép tuyến đường công khai
    },

    {
        path: '/Register',
        name: 'Register',
        component: Register,
        meta: {public : true} // Cho phép tuyến đường công khai
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
// Kiểm tra người dùng có được xác thực hay không trước khi chuyển sang trang mới

// Nhận 3 tham số: 
// - 'to' (route mà người dùng muốn điều hướng tới)
// - 'from' (route mà người dùng đang điều hướng từ)
// - 'next' (hàm gọi để tiếp tục điều hướng)
router.beforeEach((to, from, next) => { 
    // localStorage.getItem('token'): Kiểm tra xem có token xác thực trong 'localStrorage' hay không
    // !! chuyển đổi giá trị này thành boolean (true nếu có và false nếu không)
    const isAuthenticated = !!localStorage.getItem('token'); 
    // Kiểm tra xem route công khai và người dùng không xác thực thì chuyển đến login 
    if(!to.meta.public && !isAuthenticated) {
        next({name: 'Login'});
    } else {
        // Nếu route công khai và người dùng đã xác thực thì hàm next sẽ được gọi
        next()
    }
});

export default router