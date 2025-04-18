'use client'
import Link from "next/link";
import { Button, Form } from "react-bootstrap";
import { registerAccount } from "./functions";
import { ChangeEvent, useActionState, useEffect, useState } from "react";

export default function SignUpControllers() {
    const [state, action, isPending] = useActionState(registerAccount, null);
    const [ inputs, setInputs ] = useState({
        name: "",
        email: "",
        login: "",
        password: "",
        repeatedPassword: ""
    });
    const onChange = (e: ChangeEvent) => {
        const name = (e.target as HTMLInputElement).name;
        const value = (e.target as HTMLInputElement).value;
        setInputs({ ...inputs, [name]: value });
    }
    return (
        <div>
            <Form noValidate action={action}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={onChange} value={inputs.name} name="name" isInvalid={!!state} disabled={isPending} type="text" placeholder="Your name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={onChange} value={inputs.email} name="email" isInvalid={!!state} disabled={isPending} type="email" placeholder="Your email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="nickname">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={onChange} value={inputs.login} name="login" isInvalid={!!state} disabled={isPending} type="text" placeholder="Your Nickname" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control  onChange={onChange} value={inputs.password} name="password" isInvalid={!!state} disabled={isPending} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="repeatedPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={onChange} value={inputs.repeatedPassword} name="repeatedPassword" isInvalid={!!state} disabled={isPending} type="password" placeholder="Repeat password" />
                </Form.Group>
                <p className="text-red-500 font-semibold min-h-5">{state?.errorMsg}</p>
                <Button className="w-full" disabled={isPending} type="submit">
                    Register
                </Button>
                <div>
                    <Link className="block" href="/login">Already have an account? Login here.</Link>
                </div>
            </Form>
        </div>
    )
}