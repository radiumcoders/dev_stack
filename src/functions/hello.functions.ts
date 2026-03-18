import { createServerFn } from '@tanstack/react-start'

export const getHello = createServerFn({ method: 'GET' }).handler(async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return 'hello from server'
})
