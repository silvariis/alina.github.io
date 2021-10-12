import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

export function useCategoryForm(fn) {
  const { isSubmitting, handleSubmit } = useForm()

  const { value: path, errorMessage: pError, handleBlur: pBlur } = useField(
    'path',
    yup.string()
      .trim()
      .required('Введите имя для отображение в ссылке')
  )
  const { value: title, errorMessage: tError, handleBlur: tBlur } = useField(
    'title',
    yup.string()
      .trim()
      .required('Введите название для отображения')
  )

  const onSubmit = handleSubmit(fn)

  return {
    isSubmitting,
    onSubmit,
    path,
    pError,
    pBlur,
    title,
    tError,
    tBlur
  }
}
