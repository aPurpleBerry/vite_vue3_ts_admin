<template>
  <div class="logo">
    <span>{{ setting.title }}</span>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
</script>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: 60px;
  background-color: #fff;
  // font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  // font-family: Arial, Helvetica, sans-serif;
  span {
    display: inline-block;
    width: 92%;
    height: 100%;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
    font-size: 18px;
    color: $menu-text-color;
    line-height: 55px;
    align-items: center;
    padding-left: 22px;
    // background-color: red;
    border-bottom: 0.5px solid $border-line-color;
    margin-left: 4%;

  }
}
</style>