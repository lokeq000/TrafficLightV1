<template>
  <div class="todo-app">
  <router-view />
   </div>
</template>



<script>
  
    export default {
        name: 'App',
            created() {
              if(this.$route.path === "/"){
 this.$router.push('/red')
              }
         
        },
        }
    
</script>

<style lang="scss" src="./app.scss"></style>