import React from 'react'

import {useAppDispatch} from '../../app/hooks'
import {Stack, Button} from 'react-bootstrap'
import {startStreaming, stopStreaming} from "../stream/streamSlice"

export function StreamController() {
  const dispatch = useAppDispatch()

  return (
    <Stack direction="horizontal" gap={3}>
      <Button variant="primary" onClick={() => dispatch(startStreaming())}>
        start stream
      </Button>
      <Button variant="primary" onClick={() => dispatch(stopStreaming())}>
        stop stream
      </Button>
    </Stack>
  )
}