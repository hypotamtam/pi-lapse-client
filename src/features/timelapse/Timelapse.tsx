import {selectStreamConfig, selectTimelapseConfig, useAppDispatch, useAppSelector} from "../../app/hooks"
import Form from "react-bootstrap/Form"
import React, {useEffect, useState} from "react"
import {Button, Dropdown, DropdownButton, FormControl, InputGroup, Stack} from "react-bootstrap"
import {startTimelapse} from "./timelapseSlice"

const timeUnits = ["second", "minute", "hour"] as const
type TimeUnit = typeof timeUnits[number]

function convertMStoUnit(ms: number, unit: TimeUnit): number {
  switch (unit) {
    case "second": return ms / 1000
    case "minute": return ms / (1000 * 60)
    case "hour": return ms / (1000 * 60 * 60)
  }
}

function convertTimeToMS(time: number, unit: TimeUnit): number {
  switch (unit) {
    case "second": return time * 1000
    case "minute": return time * 1000 * 60
    case "hour": return time * 1000 * 60 * 60
  }
}

export function Timelapse() {
  const dispatch = useAppDispatch()
  const timelapseConfig = useAppSelector(selectTimelapseConfig)

  const [timeUnit, setTimeUnit] = useState("second" as TimeUnit)
  let defaultTime = undefined
  if (timelapseConfig) {
    defaultTime = convertMStoUnit(timelapseConfig.interval, timeUnit)
  }
  const [time, setTime] = useState(defaultTime)

  const [durationUnit, setDurationUnit] = useState("hour" as TimeUnit)
  let defaultDuration = undefined
  if (timelapseConfig) {
    defaultDuration = convertMStoUnit(timelapseConfig.duration, durationUnit)
  }
  const [duration, setDuration] = useState(defaultDuration)
  const [name, setName] = useState(timelapseConfig?.name)

  useEffect(() => {
    if (timelapseConfig) {
      setTime(convertMStoUnit(timelapseConfig.interval, timeUnit))
      setDuration(convertMStoUnit(timelapseConfig.duration, timeUnit))
      setName(timelapseConfig.name)
    }
  }, [timelapseConfig])

  return (
    <Form>
      <Stack>
        <InputGroup className="mb-2">
          <InputGroup.Text>Interval</InputGroup.Text>
          <FormControl type="number" value={time} step={1} onChange={element => setTime(+element.target.value)}/>
          <DropdownButton variant="secondary" title={timeUnit} align="end">
            {timeUnits.map(value => <Dropdown.Item onClick={() => setTimeUnit(value)}>{value}</Dropdown.Item>)}
          </DropdownButton>
        </InputGroup>
        <InputGroup className="mb-2">
          <InputGroup.Text>Duration</InputGroup.Text>
          <FormControl type="number" value={duration} step={1} onChange={element => setDuration(+element.target.value)}/>
          <DropdownButton variant="secondary" title={durationUnit} align="end">
            {timeUnits.map(value => <Dropdown.Item onClick={() => setDurationUnit(value)}>{value}</Dropdown.Item>)}
          </DropdownButton>
        </InputGroup>
        <InputGroup className="mb-2">
          <InputGroup.Text>Duration</InputGroup.Text>
          <FormControl type="text" value={name} onChange={element => setName(element.target.value)}/>
        </InputGroup>
        <Button onClick={() => {
         if (name && duration && time) {
           dispatch(startTimelapse({
             interval: convertTimeToMS(time, timeUnit),
             duration: convertTimeToMS(duration, durationUnit),
             name: name
           }))
         }
        }}>Start</Button>

      </Stack>
    </Form>
  )
}

