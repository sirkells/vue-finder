<template>
  <div>
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/cockpit">Cockpit</router-link>
    <router-view></router-view>
  </div>
  
</template>

<script>
import Filter from "@/components/SideFilter";
import Home from "@/components/Home";
  export default {
    // components: {
    // 'filters-cmp': Filter,
    // 'home-cmp': Home
    // },
    // data: () => ({
      
      
    // }),
    props: {
      source: String
    }
  }
</script>