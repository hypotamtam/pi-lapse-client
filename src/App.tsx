import React, {useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import {Stream} from "./features/stream/Stream"
import {StreamConfigEditor} from "./features/stream/StreamConfigEditor"
import {StreamController} from "./features/stream/StreamController"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import {Timelapse} from "./features/timelapse/Timelapse"
import {useAppDispatch} from "./app/hooks"
import {getStreamConfig, startStreaming} from "./features/stream/streamSlice"


function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(startStreaming())
    dispatch(getStreamConfig())
  }, [])

  return (
    <Container fluid="md" className="p-5">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Stream/>
        </Col>
      </Row>
      <Row className="justify-content-md-center py-2">
        <Col md="auto">
          <StreamController/>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Timelapse/>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <StreamConfigEditor/>
        </Col>
      </Row>
    </Container>
  )
}

export default App
