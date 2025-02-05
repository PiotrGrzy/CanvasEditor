export type TextColor = "black-100" | "white-default" | "red" | "blue" | "green";

export type PosterElement = {
  id: string
  type: "text" | "image"
  content: string
  x: number
  y: number
  width: number
  height: number
  color?: TextColor
  isEditing?: boolean
  fontSize?: number
}
