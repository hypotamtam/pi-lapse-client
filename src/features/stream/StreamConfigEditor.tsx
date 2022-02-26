import {selectStreamConfig, useAppDispatch, useAppSelector} from "../../app/hooks"
import Form from "react-bootstrap/Form"
import {StreamConfig, StreamConfigKey, StreamConfigKeyType} from "./streamConfig"
import {useEffect, useState} from "react"
import {Col, FormControl, InputGroup, Row} from "react-bootstrap"
import {updateStreamConfig} from "./streamSlice"

interface StreamConfigOptionsProps {
  readonly options: string[],
  readonly selectOption?: string,
  readonly onUpdate: (value: string | undefined) => void
}

function StreamConfigOptions(props: StreamConfigOptionsProps) {
  return (
    <Form.Select value={props.selectOption} onChange={element => {
      const selectedIndex = element.currentTarget.selectedIndex
      props.onUpdate(selectedIndex === 0 ? undefined : element.currentTarget.options[selectedIndex].value)
    }}>
      {props.options.map(option => {
        return <option value={option}> {option}</option>
      })
      }
    </Form.Select>
  )
}

interface StreamConfigInputProps {
  readonly title: string,
  readonly value?: string,
  readonly step: number,
  readonly min?: number,
  readonly max?: number,
  readonly onUpdate: (value: string | undefined) => void
}

function StreamConfigInput(props: StreamConfigInputProps) {
  return (
    <InputGroup className="mb-2">
      <InputGroup.Text>{props.title}</InputGroup.Text>
      <FormControl type="number" value={props.value} step={props.step} min={props.min} max={props.max} onChange={element => {
        let trimValue = element.target.value.trim()
        props.onUpdate(trimValue.length === 0 ? undefined : trimValue)
      }}/>
    </InputGroup>
  )
}

export function StreamConfigEditor() {
  const streamConfig = useAppSelector(selectStreamConfig)
  const [currentConfig, setConfig] = useState(streamConfig)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setConfig(streamConfig)
  }, [streamConfig])

  const updateConfig = (key: StreamConfigKeyType, value?: string) => {
    let config: StreamConfig = {...currentConfig}
    config[key] = value
    setConfig(config)
    dispatch(updateStreamConfig(config))
  }

  return (
    <Form>
      <Row className="py-3">
        <Col>
          <Form.Check type="switch" label={StreamConfigKey.hflip} checked={currentConfig.hflip !== undefined} onChange={(element) => {
            updateConfig("hflip", element.target.checked ? "" : undefined)
          }}/>
        </Col>
        <Col>
          <Form.Check type="switch" label={StreamConfigKey.vflip} checked={currentConfig.vflip !== undefined} onChange={(element) => {
            updateConfig("vflip", element.target.checked ? "" : undefined)
          }}/>
        </Col>
      </Row>
      <Row className="py-3">
        <Col sm={6}>
          <Form.Check type="switch" label={StreamConfigKey.rotation} checked={currentConfig.rotation === "180"} onChange={(element) => {
            updateConfig("rotation", element.target.checked ? "180" : "0")
          }}/>
        </Col>
        <Col sm={6}>
          <StreamConfigInput title="saturation" step={0.1} min={-1} max={1} value={currentConfig.saturation} onUpdate={value => updateConfig("saturation", value)}/>
        </Col>
      </Row>
      <Row className="py-3">
        <Col sm={6}>
          <StreamConfigInput title="Shutter" step={1000} min={0} value={currentConfig.shutter} onUpdate={value => updateConfig("shutter", value)}/>
        </Col>
        <Col sm={6}>
          <StreamConfigInput title="Gain" step={5} min={0} value={currentConfig.gain} onUpdate={value => updateConfig("gain", value)}/>
        </Col>
      </Row>
      <Row className="py-3">
        <Col sm={6}>
          <StreamConfigInput title="EV" step={1} min={0} value={currentConfig.ev} onUpdate={value => updateConfig("ev", value)}/>
        </Col>
        <Col sm={6}>
          <StreamConfigInput title="Contrast" step={0.5} min={0} value={currentConfig.contrast} onUpdate={value => updateConfig("contrast", value)}/>
        </Col>
      </Row>
      <Row className="py-3">
        <Col sm={6}>
          <StreamConfigInput title="Sharpness" step={1} min={-100} max={100} value={currentConfig.sharpness} onUpdate={value => updateConfig("sharpness", value)}/>
        </Col>
        <Col sm={6}>
          <StreamConfigInput title="Brightness" step={0.1} min={-1} max={1} value={currentConfig.brightness} onUpdate={value => updateConfig("brightness", value)}/>
        </Col>
      </Row>
      <Row className="py-3">
        <Col>
          <StreamConfigOptions selectOption={currentConfig.metering} options={[StreamConfigKey.metering, "centre", "spot", "average", "custom"]} onUpdate={value => updateConfig("metering", value)}/>
        </Col>
        <Col>
          <StreamConfigOptions selectOption={currentConfig.exposure} options={[StreamConfigKey.exposure, "normal", "sport"]} onUpdate={value => updateConfig("exposure", value)}/>
        </Col>
      </Row>
      <Row className="py-3">
        <Col>
          <StreamConfigOptions selectOption={currentConfig.awb} options={[StreamConfigKey.awb, "auto", "incandescent", "tungsten", "fluorescent", "indoor", "daylight", "cloudy", "custom"]} onUpdate={value => updateConfig("awb", value)}/>
        </Col>
        <Col>
          <StreamConfigOptions selectOption={currentConfig.denoise} options={[StreamConfigKey.denoise, "auto", "off", "cdn_off", "cdn_fast", "cdn_hq"]} onUpdate={value => updateConfig("denoise", value)}/>
        </Col>
      </Row>
    </Form>
  )
}