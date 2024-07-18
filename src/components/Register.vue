<template>
    <div class="container sign-up-mode">
        <div class="forms-container">
            <div class="signin-signup">
                <form @submit.prevent="register" class="sign-up-form">
                    <h2 class="form-title">Đăng ký</h2>
                    <div class="input-field">
                        <i class="fas fa-user"></i>
                        <input type="text" placeholder="Username" required v-model="form.name"/>
                    </div>
                    <div class="input-field">
                        <i class="fas fa-envelope"></i>
                        <input type="email" placeholder="Email" required v-model="form.email">
                    </div>
                    <div class="input-field">
                        <i class="fas fa-lock"></i>
                        <input type="password" placeholder="Password" required v-model="form.password"/>
                    </div>
                    <button type="submit" class="button">Đăng ký</button>
                    <p class="question">Bạn đã có tài khoản?<router-link to="/login"> Đăng nhập</router-link></p>
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
            <div class="panel right-panel">
                <div class="content">
                </div>
                <img src="../assets/img/register.svg" class="image" alt="" />
            </div>
        </div>
    </div>
</template>
    
<script setup>
import instance from '@/axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = reactive(
    {
        name: '',
        email: '',
        password: ''
    }
)
const register = async () => {
    try {
        const response = await instance.post("/auth/register", form)
        router.push('/login')
    } catch(error) {
        console.error("An error occurred: ", error)
        if (error.response) {
            console.log("Error details: ", error.response.data)
        }
    }
}
</script>

<style scoped>
@import '../assets/css/auth.css';
</style>
