import SignUpControllers from "./SignUpControllers";

export default function SignUpPage() {
    return (
        <div className="flex justify-center  h-dvh items-center rounded-xl bg-white p-6 shadow-lg outline outline-black/5 ">
            <div className="w-90 rounded-xl bg-white p-6 shadow-lg outline outline-black/5">
                <h3>Register a new account:</h3>
                <SignUpControllers></SignUpControllers>
            </div>
        </div>
    )
}