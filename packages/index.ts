import * as React from 'react'
import upperFirst from 'lodash.upperfirst'

export interface ChangeHandler<T, A extends any[]> {
  (value: T, ...args: A): void
}

const noop = () => {}

export const useControlled = <T, A extends any[]>(
  props: Record<string, any> = {},
  valueKey: string,
  onChange: ChangeHandler<T, A>
): [T, ChangeHandler<T, A>] => {
  const controlled = Reflect.has(props, valueKey)
  const value = props[valueKey]
  const defaultValue = props[`default${upperFirst(valueKey)}`]
  const [internalValue, setInternalValue] = React.useState(defaultValue)

  if (controlled) return [value, onChange || noop]

  return [
    internalValue,
    (newValue, ...args) => {
      setInternalValue(newValue)
      onChange?.(newValue, ...args)
    },
  ]
}