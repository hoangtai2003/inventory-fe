<template>
    <div class="form-container">
        <form @submit.prevent="login" class="login-form">
            <input type="email" v-model="form.email" placeholder="Email...." required />
            <input type="password" v-model="form.password" placeholder="Password...." />
            <button type="submit">Login</button>
        </form>
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
        // Chuyển hướng đến trang chính
        router.push('/')
        
    } catch (error) {
        console.error("An error occurred: ", error);
        if (error.response) {
            console.log("Error details: ", error.response.data);
        }
    }
};
</script>

