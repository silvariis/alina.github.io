<template>
  <div class="section-auth">
    <div class="section-inner">
      <h1>Foodleggers</h1>
      <h2>Вход в систему</h2>

      <form class="section-auth-form" @submit.prevent="onSubmit">
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" id="email" autocomplete="username" :class="['section-auth-form-input', {invalid: eError}]" v-model="email" @blur="eBlur">
          <small v-if="eError">{{ eError }}</small>
        </div>

        <div class="form-control">
          <label for="password">Пароль</label>
          <input type="password" id="password" autocomplete="current-password" :class="['section-auth-form-input', {invalid: pError}]" v-model="password" @blur="pBlur">
          <small v-if="pError">{{ pError }}</small>
        </div>

        <div class="section-auth-button-and-message">
          <button type="submit" :disabled="isSubmitting" class="button-apply">Войти</button>
          <app-message></app-message>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useLoginForm } from '@/use/login-form'
import AppMessage from '@/components/ui/AppMessage'

export default {
  components: { AppMessage },
  setup() {
    return {
      ...useLoginForm()
    }
  }
}
</script>

<style scoped>

</style>
