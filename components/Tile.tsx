import {
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion"

const SUPER_GREEN = "#216e39"
const LIGHT_GREEN = "#9be9a8"
const GRAY = "#ebedf0"

const tile: React.CSSProperties = {
  width: 16,
  height: 16,
  margin: 3.5,
  border: "1px solid rgba(0,0,0,0.1)",
  borderRadius: 4,
}

const Tile = ({ amtOfGreen, delay }: { amtOfGreen: number; delay: number }) => {
  const currentFrame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const spr = spring({
    frame: currentFrame,
    fps,
    delay,
    config: {
      damping: 11,
    },
  })

  return (
    <div
      style={{
        ...tile,
        background:
          amtOfGreen === 0
            ? GRAY
            : interpolateColors(amtOfGreen, [0, 1], [LIGHT_GREEN, SUPER_GREEN]),
        scale: String(spr),
      }}
    />
  )
}

export default Tile
