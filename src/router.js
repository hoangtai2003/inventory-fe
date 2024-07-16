import { createRouter, createWebHistory } from "vue-router";

import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import ProductList from "./components/ProductList.vue";
import AddProduct from "./components/AddProduct.vue";
import EditProduct from "./components/EditProduct.vue";
import ProductDetails from "./components/ProductDetails.vue";
const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {public : true} // Cho phép tuyến đường công khai
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {public : true} // Cho phép tuyến đường công khai
    },
    {
        path: '/list-product',
        name: 'ProductList',
        component: ProductList,
    },
    {
        path: '/add-product',
        name: 'AddProduct',
        component: AddProduct,
    },
    {
        path: '/edit-product/:id',
        name: 'EditProduct',
        component: EditProduct,
        props: true
    },
    {
        path: '/detail-product/:id',
        name: 'DetailProduct',
        component: ProductDetails,
        props: true
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
    // Nếu route yêu cầu xác thực và người dùng chưa đăng nhập, chuyển đến trang login
    if (!isAuthenticated && !to.meta.public)  {
        next({ name: 'Login' });
    } else if (isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
        // Nếu đã xác thực và cố gắng truy cập login hoặc register, chuyển hướng đến danh sách sản phẩm
        next({ name: 'ProductList' });
    } else {
        // Tiếp tục điều hướng nếu không thuộc trường hợp trên
        next();
    }
});
export default router