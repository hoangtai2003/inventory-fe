<template>
    <form @submit.prevent="submitForm" class="add-product-form">
        <input class="input-field" v-model="form.name" placeholder="Product Name...." />
        <input class="input-field" v-model="form.description" placeholder="Product Description...." />
        <input class="input-field" v-model="form.price" placeholder="Product Price...." />
        <button type="submit" class="submit-button">Edit Product</button>
    </form>
</template>

<script setup>
import instance from '@/axios';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const form = ref({
    name: '',
    description: '',
    price: '',
});

const getProduct = async () => {
    const response = await instance.get(`/products/show/${route.params.id}`);
    form.value = response.data
};

const submitForm = async () => {
    await instance.put(`/products/update/${route.params.id}`, form.value);
    router.push('/list-product');
};

onMounted(() => {
    getProduct();
});
</script>

<style>
/* Add your styles here */
</style>
