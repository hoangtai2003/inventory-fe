<template>
  <div id="app">
    <NavbarVue/>
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavbarVue from './components/Navbar.vue'
export default {
  components: {
    NavbarVue
  },
  name: 'App',
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  text-align: center;
}

#content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>
