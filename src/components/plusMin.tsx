import React, { useState } from 'react'
import { stakeStore} from "../App"
export default function PlusMin() {
  const [count, setCount] = useState(stakeStore.stake)

  return (
    <div className="plus__min__bedrag">
    <button onClick={() => setCount(count => count - 1)}>-</button>
    <span>€ {count}</span>
    <button onClick={() => setCount(count => count + 1)}>+</button>
  </div>
  )
}
