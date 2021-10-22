export enum StreamConfigValue {
  hflip = "a horizontal flip transform",
  vflip = "Request a vertical flip transform",
  rotation = "Request an image rotation, 0 or 180",
  shutter = "Set a fixed shutter speed",
  gain = "Set a fixed gain value",
  metering = "Set the metering mode (centre, spot, average, custom)",
  exposure = "Set the exposure mode (normal, sport)",
  ev = "Set the EV exposure compensation, where 0 = no change",
  awb = "Set the AWB mode (auto, incandescent, tungsten, fluorescent, indoor, daylight, cloudy, custom)",
  awbgains = "Set explict red and blue gains (disable the automatic AWB algorithm)",
  brightness = "Adjust the brightness of the output images, in the range -1.0 to 1.0",
  contrast = "Adjust the contrast of the output image, where 1.0 = normal contrast",
  saturation = "Adjust the colour saturation of the output, where 1.0 = normal and 0.0 = greyscale",
  sharpness = "Adjust the sharpness of the output image, where 1.0 = normal sharpening",
  denoise = "Sets the Denoise operating mode: auto, off, cdn_off, cdn_fast, cdn_hq",
  timelapse = "Time interval (in ms) between timelapse captures",
}

export type StreamConfigKey = keyof typeof StreamConfigValue
export type StreamConfig = Partial<Record<StreamConfigKey, string>>
