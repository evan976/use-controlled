# use-controlled

<div align="center">
Easily manage controlled/uncontrolled property values of your components
</div>
<br />
<div align="center">✌🏻</div>

<br />
<div align="center">
<pre>pnpm add use-controlled</pre>
</div>

## Usage

```ts
import * as React from 'react'
import { useControlled } from 'use-controlled'

type InputValue = string | number

interface InputProps {
  defaultValue: InputValue
  value: InputValue
  onChange: (value: InputValue, event?: React.ChangeEvent<HTMLInputElement>) => void
  // ...other properties
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {

  const [innerValue, setInnerValue] = useControlled(props, 'value', props.onChange)

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInnerValue(event.target.value, event)
    },
    [],
  )

  return (
    <input
      ref={ref}
      value={innerValue || props.defaultValue}
      onChange={handleChange}
    />
  )
})

export default Input

```
