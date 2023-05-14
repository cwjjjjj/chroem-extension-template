export interface QiniuFile {
  appId: string
  avInfo: AvInfo
  bucket: string
  exif: any
  ext: string
  hash: string
  imageInfo: ImageInfo
  key: string
  mimeType: string
  name: string
  resource: string
  size: number
  storage: string
}

export interface AvInfo {
  AttachedPic: AttachedPic
  Audios: any
  MaxAB: number
  Subtitles: any
  Videos: Video[]
  audio: any
  format: Format
  subtitle: any
  video: Video
}

export interface AttachedPic {
  Disposition: Disposition
  avg_frame_rate: string
  bit_rate: string
  codec_long_name: string
  codec_name: string
  codec_time_base: string
  codec_type: string
  coded_height: number
  coded_width: number
  color_range: string
  display_aspect_ratio: string
  duration: string
  height: number
  index: number
  level: number
  nb_frames: string
  pix_fmt: string
  profile: string
  r_frame_rate: string
  refs: number
  sample_aspect_ratio: string
  start_time: string
  width: number
}

export interface Disposition {
  attached_pic: number
}

export interface Video {
  Disposition: Disposition
  avg_frame_rate: string
  bit_rate: string
  codec_long_name: string
  codec_name: string
  codec_time_base: string
  codec_type: string
  coded_height: number
  coded_width: number
  color_range: string
  display_aspect_ratio: string
  duration: string
  height: number
  index: number
  level: number
  nb_frames: string
  pix_fmt: string
  profile: string
  r_frame_rate: string
  refs: number
  sample_aspect_ratio: string
  start_time: string
  width: number
}

export interface Format {
  bit_rate: string
  duration: string
  format_long_name: string
  format_name: string
  nb_streams: number
  size: string
  start_time: string
}

export interface ImageInfo {
  colorModel: string
  format: string
  height: number
  size: number
  width: number
}
