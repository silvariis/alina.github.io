<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: pError}">
      <label for="path">Название для ссылки</label>
      <input type="text" id="path" v-model="path" @blur="pBlur">
      <small v-if="pError">{{pError}}</small>
    </div>

    <div class="form-control" :class="{invalid: tError}">
      <label for="title">Русское название</label>
      <input type="text" id="title" v-model.number="title" @blur="tBlur">
      <small v-if="tError">{{tError}}</small>
    </div>

    <button class="button-apply" :disabled="isSubmitting">Создать</button>
  </form>
</template>

<script>

import { useCategoryForm } from '../../use/category-form'
import { useStore } from 'vuex'

export default {
  emits: ['created'],
  setup(_, { emit }) {
    const store = useStore()

    const submit = async values => {
      const payload = {
        ...values,
        path: values.path.toLowerCase()
      }
      await store.dispatch('addCategory', payload)
      emit('created')
    }

    return {
      ...useCategoryForm(submit)
    }
  }
}
</script>

<style scoped>

</style>
