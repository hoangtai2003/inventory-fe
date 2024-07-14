<template>
    <div class="form-container">
        <form @submit.prevent="register" class="register-form">
            <input type="text" v-model="form.name" placeholder="Name...." required />
            <input type="email" v-model="form.email" placeholder="Email...." required />
            <input type="password" v-model="form.password" placeholder="Password...." />
            <button type="submit">Register</button>
        </form>
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