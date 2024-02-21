import { ReactNode } from "react"

type Props = {
  children?: ReactNode
  additonalClass?: string
  padding?: boolean
  isOverflowHidden?: boolean
}

export default function ContentContainer({ children, padding = false, isOverflowHidden = false, additonalClass = '' }: Props) {
  return <div className={`w-full
      ${padding ? "p-5" : ""}
      ${isOverflowHidden ? "overflow-hidden" : ""}
      ${additonalClass}`}>
    {children}
  </div>
}