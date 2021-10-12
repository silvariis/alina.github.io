import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

export function useProductForm(fn, product) {
  const { isSubmitting, handleSubmit } = useForm({
    initialValues: product
  })

  const { value: name, errorMessage: nError, handleBlur: nBlur } = useField(
    'name',
    yup.string()
      .trim()
      .required('Введите имя для отображение в ссылке')
  )
  const { value: description, errorMessage: dError, handleBlur: dBlur } = useField(
    'description',
    yup.string()
      .trim()
      .required('Введите имя для отображение в ссылке')
  )
  const { value: image, errorMessage: iError, handleBlur: iBlur } = useField(
    'image',
    yup.string()
      .trim()
      .required('Введите имя для отображение в ссылке')
  )
  const { value: options, errorMessage: oError } = useField(
    'options',
    yup.array()
      .min(1, 'Введите минимум 1 вариант выбора')
      .required()
  )

  const onSubmit = handleSubmit(fn)

  return {
    name,
    nError,
    nBlur,
    description,
    dError,
    dBlur,
    image,
    iError,
    iBlur,
    options,
    oError,
    isSubmitting,
    handleSubmit,
    onSubmit
  }
}
