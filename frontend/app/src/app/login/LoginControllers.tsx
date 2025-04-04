'use client'
import React, { useActionState, useState } from "react"
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import Link from "next/link";
import { loginSubmit, StateObj } from "./functions";


export default function LoginControllers() {
  const [state, formAction, pending] = useActionState<StateObj | null, FormData>(loginSubmit, null)
  return (
        <Form noValidate action={formAction}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control isInvalid={!!state} disabled={pending} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
    
          <Form.Group  className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control isInvalid={!!state} disabled={pending} type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <p className="text-red-500 font-semibold min-h-5">{state?.errorMsg}</p>
          <Button className="w-full" disabled={pending} type="submit">
            Submit
          </Button>
          <div>
            <Link className="block" href="/signup">Don't have any? Create one.</Link>
          </div>
        </Form>
      );
}