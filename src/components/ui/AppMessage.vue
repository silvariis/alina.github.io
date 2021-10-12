<template>
  <div v-if="message">
    <p :class="['app-message', message.type]">
      {{ message.value }}
    </p>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  setup() {
    const store = useStore()

    const message = computed(() => store.getters['message/message'])

    return {
      message
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
  border-radius: 3px;
  padding: 0.5rem 1.5rem;
  background-color: #fff;
}

p.danger {
  border: 2px solid #ff3131;
  color: #ff3131;
}
p.primary {
  border: 2px solid #2ecd28;
  color: #2ecd28;
}
</style>
