import {CSSProperties} from "react"
import {useAppSelector} from "../../app/hooks"


export function Stream() {
  const style: CSSProperties = {
    margin: "auto",
    backgroundColor: "hsl(0, 0%, 25%)",
    maxWidth: "100%",
    maxHeight: "100%"
  }

  const streamState = useAppSelector(state => state.stream)
  switch (streamState.status) {
    case "live":
      if (streamState.url !== undefined) {
        return (<img id="streamImg" style={style} alt="Video stream" src={streamState.url}/>)
      }
      return (<span>Stream url undefined</span>)
    case "stop":
      return (<span>Stream finished</span>)

  }

}