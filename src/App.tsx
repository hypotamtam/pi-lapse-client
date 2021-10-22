import React from 'react'
import {Counter} from './features/counter/Counter'
import {Stream} from "./features/stream/Stream"

function App() {
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col">
          <Stream/>
        </div>
        <div className="col">
          <Counter/>
        </div>
      </div>
    </div>
  )
}

export default App
