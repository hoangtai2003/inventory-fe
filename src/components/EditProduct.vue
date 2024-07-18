<template>
    <form @submit.prevent="submitForm" class="add-product-form">
        <input v-model="form.name" placeholder="Product Name...." />
        <input v-model="form.description" placeholder="Product Description...." />
        <input v-model="form.price" placeholder="Product Price...." />
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
    router.push('/admin/list-product');
};

onMounted(() => {
    getProduct();
});
</script>

<style>
/* Add your styles here */
</style>
