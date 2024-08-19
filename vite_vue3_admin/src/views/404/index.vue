<template>
  <div class="box">
    <h1>404 NOT FOUND</h1>
    <img src="../../assets/images/404.png" alt="">
  </div>
</template>

<script setup lang="ts">

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
  h1 {
    // background-color: red;
    // width: 400px;
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