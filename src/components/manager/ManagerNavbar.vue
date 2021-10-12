<template>
  <nav class="section-manager-navbar">
    <app-message></app-message>
    <div class="section-manager-navbar__inner">
      <div class="section-manager-navbar__date">{{ dateFormat }}</div>
      <div class="section-manager-navbar__user">{{ email }}</div>
    </div>
  </nav>
</template>

<script>
import AppMessage from '@/components/ui/AppMessage'
import { computed, onBeforeUnmount, ref } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()
    const date = ref(new Date())
    const interval = setInterval(() => {
      date.value = new Date()
    }, 1000)

    const email = computed(() => store.getters['auth/email'])
    const dateFormat = computed(() => {
      const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }

      return new Intl.DateTimeFormat('ru-RU', options).format(new Date(date.value))
    })

    onBeforeUnmount(() => {
      clearInterval(interval)
    })

    return {
      dateFormat,
      email
    }
  },
  components: { AppMessage }
}
</script>

<style scoped>

</style>
