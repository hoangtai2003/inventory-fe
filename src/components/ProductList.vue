<template>
    <div class="content">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Detail</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product, index) in products" :key="product.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ product.name }}</td>
                    <td>{{ product.description }}</td>
                    <td>{{ product.price }}</td>
                    <td>
                        <router-link :to="{ name: 'EditProduct', params: { id: product.id } }">Edit</router-link>
                    </td>
                    <td>
                        <button @click="deleteProduct(product.id)">Delete</button>
                    </td>
                    <td>
                        <router-link :to="{ name: 'DetailProduct', params: { id: product.id } }">Detail</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
import instance from '@/axios';
import { onMounted, ref } from 'vue';
const products = ref([])
const ListProduct = async () => {
    const response = await instance.get("/products/list")
    products.value = response.data
}
const deleteProduct = async (id) => {
    await instance.delete(`/products/delete/${id}`)
    products.value = products.value.filter(product => product.id !== id);
}
onMounted(() => {
    ListProduct();
})
</script>
<style scoped>
.container {
    margin: 20px auto;
    max-width: 800px;
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
}

.table th, .table td {
    padding: 12px 15px;
    text-align: left;
}

.table th {
    font-weight: bold;
}

.table tbody tr {
    border-bottom: 1px solid #dddddd;
    transition: background-color 0.2s ease;
}

.table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.table tbody tr:hover {
    background-color: #f1f1f1;
}

.table th:first-child, .table td:first-child {
    border-radius: 8px 0 0 0;
}

.table th:last-child, .table td:last-child {
    border-radius: 0 8px 0 0;
}

.table thead {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
