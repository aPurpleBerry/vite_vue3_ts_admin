<template>
  <div class="box">
    <h1>404 NOT FOUND</h1>
    <img src="../../assets/images/404.png" alt="">
    <button @click="goHome">返回首页</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
let $router = useRouter()
const goHome = ()=>{
  $router.push('/home')
}
</script>

<style scoped lang="scss">
.box{
  width: 100vw;
  height: 100vh;
  background-color: rgb(224,232,231);
  display: flex;
  img {
    width: 1000px;
    height: 500px;
    margin: auto;
  }
  button {
    position: fixed;
    border-radius: 10px;
    color:rgb(231,239,238); 
    background-color: rgb(42,77,82);
    width: 100px;
    height: 40px;
    left: 50%;
    transform: translate(-50%, 0);
    top: 200px;
  }
  h1 {
    // background-color: red;
    width: 600px;
    height: 50px;
    font-size: 80px;
    font-weight: bolder;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: rgb(42,77,82);
    position: fixed;
    left: 50%;
    top: 100px;
    transform: translate(-50%, 0);
  }
}
</style>