export enum StreamConfigKey {
  hflip = "horizontal flip",
  vflip = "vertical flip",
  rotation = "Image rotation",
  shutter = "Shutter speed(μs)",
  gain = "Set a fixed gain value",
  metering = "Metering",
  exposure = "Exposure",
  ev = "Set the EV exposure compensation, where 0 = no change",
  awb = "AWB",
  awbgains = "Set explict red and blue gains (disable the automatic AWB algorithm)",
  brightness = "Adjust the brightness of the output images, in the range -1.0 to 1.0",
  contrast = "Adjust the contrast of the output image, where 1.0 = normal contrast",
  saturation = "Adjust the colour saturation of the output, where 1.0 = normal and 0.0 = greyscale",
  sharpness = "Adjust the sharpness of the output image, where 1.0 = normal sharpening",
  denoise = "Denoise",
  timelapse = "Time interval (in ms) between timelapse captures",
}

export type StreamConfigKeyType = keyof typeof StreamConfigKey
export type StreamConfig = Partial<Record<StreamConfigKeyType, string>>
