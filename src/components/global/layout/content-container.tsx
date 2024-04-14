import { ReactNode } from "react"

type Props = {
  children?: ReactNode
  additonalClass?: string
  padding?: boolean
  isOverflowHidden?: boolean
}

// 4 rem is Navbar height
export default function ContentContainer({ children, padding = false, isOverflowHidden = false, additonalClass = '' }: Props) {
  return <div className={`w-full h-[calc(100vh-4rem)]
      ${padding ? "p-5" : ""}
      ${isOverflowHidden ? "overflow-hidden" : ""}
      ${additonalClass}`}>
    {children}
  </div>
}