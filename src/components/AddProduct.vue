<template>
    <form @submit.prevent="submitForm" class="add-product-form">
        <input class="input-field" v-model="form.name" placeholder="Product Name...." />
        <input class="input-field" v-model="form.description" placeholder="Product Description...." />
        <input class="input-field" v-model="form.price" placeholder="Product Price...." />
        <button type="submit" class="submit-button">Add Product</button>
    </form>
</template>

<script setup>
import instance from '@/axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const form = reactive({
    name: '',
    description: '',
    price: '',
})
const submitForm = async () => {
    await instance.post('/products/create', form)
    router.push("/list-product")
}
</script>