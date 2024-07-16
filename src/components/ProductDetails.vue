<template>
    <div class="product-detail">
      <div class="product-card">
        <h1>{{ product.name }}</h1>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">${{ product.price }}</p>
      </div>
    </div>
</template>
<script setup>
import instance from '@/axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const product = ref({
    name: '',
    description: '',
    price: ''
})
const getProduct = async () => {
    const response = await instance.get(`/products/show/${route.params.id}`)
    product.value = response.data
}
onMounted(() => {
    getProduct();
})
</script>