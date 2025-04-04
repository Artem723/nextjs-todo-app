import { ReactNode } from "react"
import { FormInput } from "./Interfaces"

interface props extends FormInput {
    children: Readonly<ReactNode>,
    disabled: boolean,
    type: string
    [key: string]: any
}
export function Button(p: Partial<props>) {
    
    return (
    <button className={`rounded-lg bg-red-400  p-2 cursor-pointer ${p.otherClasses}`} 
    >
        {p.children}
    </button>
    )
}