import { createStore } from "vuex";
import router from './router';
export default createStore({
    // state là nơi lưu trữ trạng thái của ứng dụng
    state: {
        // !!localStorage.getItem('token') chuyển đổi giá trị của token lưu trong localStrorage thành boolean, true nếu có token và false nếu không có
        isLoggedIn: !!localStorage.getItem('token')
    },
    // mutations là các hàm để thay đổi trạng thái của state
    mutations: {
        // Khi người dùng đăng nhập thì sẽ trở thành true
        LOGIN(state) {
            state.isLoggedIn  = true;
        },
        LOGOUT(state) {
            state.isLoggedIn = false;
        }
    },
    // actions là các hàm để thực hiện các tác vụ không đồng bộ hoặc logic phức tạp trước khi commit mutation
    actions: {
        login({ commit }) {
            commit("LOGIN")
        },
        logout({ commit }) {
            localStorage.removeItem('token');
            commit("LOGOUT");
            router.push({ name: 'Login' });
        }
    }
});
