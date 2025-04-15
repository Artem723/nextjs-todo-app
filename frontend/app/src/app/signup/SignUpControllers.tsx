'use client'
import Link from "next/link";
import { Button, Form } from "react-bootstrap";
import { registerAccount } from "./functions";
import { useActionState } from "react";

export default function SignUpControllers() {
    const [state, action, isPending] = useActionState(registerAccount, null);
    return (
        <div>
            <Form noValidate action={action}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" isInvalid={!!state} disabled={isPending} type="text" placeholder="Your name" />
                    {/* <Form.Text className="text-muted">
                        Your name
                    </Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" isInvalid={!!state} disabled={isPending} type="email" placeholder="Your email" />
                    {/* <Form.Text className="text-muted">
                        Email address
                    </Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="nickname">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="login" isInvalid={!!state} disabled={isPending} type="text" placeholder="Your Nickname" />
                    {/* <Form.Text className="text-muted">
                        Nickname
                    </Form.Text> */}
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" isInvalid={!!state} disabled={isPending} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="repeated-password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password-repeated" isInvalid={!!state} disabled={isPending} type="password" placeholder="Repeat password" />
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