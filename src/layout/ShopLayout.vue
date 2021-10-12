<template>
  <the-sprites></the-sprites>
  <the-navbar></the-navbar>
  <router-view></router-view>
</template>

<script>
import TheNavbar from '@/components/navbar/TheNavbar'
import TheSprites from '@/components/TheSprites'
export default {
  components: { TheSprites, TheNavbar }
}
</script>

<style scoped>

</style>
