<template>
    <div class="container">
        <div class="forms-container">
            <div class="signin-signup">
                <form @submit.prevent="login" class="sign-in-form">
                    <h2 class="form-title">Đăng nhập</h2>
                    <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input type="text" placeholder="Email" required v-model="form.email"/>
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" placeholder="Password" required v-model="form.password"/>
                    </div>
                    <button type="submit" class="button solid">Đăng nhập</button>
                    <p class="question">Chưa có tài khoản?<router-link to="/register"> Đăng ký</router-link></p>
                    <p class="social-text">Or</p>
                    <div class="social-media">
                        <a href="#" class="social-icon">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" class="social-icon">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="#" class="social-icon">
                            <i class="fab fa-google"></i>
                        </a>
                        <a href="#" class="social-icon">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </form>
            </div>
        </div>

        <div class="panels-container">
            <div class="panel left-panel">
                <div class="content">
                </div>
                <img src="../assets/img/log.svg" class="image" alt="" />
            </div>
        </div>
    </div>
</template>
<script setup>
import instance from '@/axios';
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();
const form = reactive({
    email: '',
    password: ''
});

const login = async () => {
    try {
        const response = await instance.post("/auth/login", form);
        // Nếu nhận được token từ phản hồi lưu token vào 'localStorage'
        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
        }
        store.dispatch('login')
        // Chuyển hướng đến trang chính
        router.push('/admin')
        
    } catch (error) {
        console.error("An error occurred: ", error);
        if (error.response) {
            console.log("Error details: ", error.response.data);
        }
    }
};
</script>
<style scoped>
@import '../assets/css/auth.css';
</style>
