import {useAppSelector} from "../../app/hooks"
import Image from 'react-bootstrap/Image'

export function Stream() {
  const streamState = useAppSelector(state => state.stream)
  switch (streamState.status) {
    case "live":
      if (streamState.url !== undefined) {
        return (<Image rounded alt="Video stream" src={streamState.url} style={{ maxWidth:"100%", height: "auto"}}/>)
      }
      return (<span className="text-center">Stream url undefined</span>)
    case "stop":
      return (<span className="text-center">Stream finished</span>)
  }
}