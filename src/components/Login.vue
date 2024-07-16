<template>
    <div class="login-container">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div class="input-group">
                <label for="email">Email</label>
                <input type="text" id="email" v-model="form.email"  required>
            </div>
            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="form.password" required>
            </div>
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
        store.dispatch('login')
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
<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #ff7e5f, #feb47b);
    margin: 0;
}

.login-container {
    background: #fff;
    padding: 40px 60px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    width: 100%;
    max-width: 400px;
}

.login-container h1 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
}

.input-group {
    margin-bottom: 15px;
    text-align: left;
}

.input-group label {
    display: block;
    margin-bottom: 5px;
    color: #555;
}

.input-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}

.input-group input:focus {
    border-color: #ff7e5f;
    outline: none;
}

button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background: #ff7e5f;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
}

button:hover {
    background: #feb47b;
}

</style>

