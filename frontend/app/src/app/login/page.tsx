import { Container } from "react-bootstrap";
import LoginControllers from "./LoginControllers";

export default function LoginPage() {
    return (
        <div className="h-screen">
            
    <div className="m-auto justify-content-center flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
        <div><LoginControllers /></div> 
    </div>
    </div>
    )
}