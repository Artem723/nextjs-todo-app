'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface errorObj {
    name: string,
    errorText?: string
}

interface stateObj {
    errorMsg?: string,
    errors?: Array<errorObj>
}

const GENERAL_ERROR = 'Something went wrong. Try one more time..';


export async function registerAccount(prevState: stateObj | null, formData: FormData): Promise<stateObj | null> {

    const login = formData.get('login');
    const email = formData.get('email');
    const name = formData.get('name');
    const password = formData.get('password');
    const passwordRep = formData.get('repeatedPassword');

    if (password !== passwordRep) {
        return {
            errorMsg: 'The entered passwords are not the same..',
            errors: [
                { name: 'password' },
                { name: 'repeatedPassword' }
            ]
        }
    }
    
    
    const headers = new Headers({
        'Content-Type': "application/json"
    });
    const request = {
        method: "POST",
        headers,
        body: JSON.stringify({
            login,
            password,
            name,
            email,
        }),

    }
    try {
        const res = await fetch("http://gateway/users/register", request);

        if (!res.ok) {
            console.log(res.status >= 400 && res.status < 500)
            if (res.status >= 400 && res.status < 500) { 
                console.log('HELLO-1')
                const err: { message?: string, errors?: Array<{[key: string]: string}> } = await res.json();
                console.log('HELLO')
                console.log('ERR', err)
                return {
                    errorMsg: err?.message || 'Something went wrong.. Try one more time',
                    errors: err?.errors?.map(e => {
                        const key = Object.keys(e)[0]
                        return { name: key, errorText: e[key]}
                    })
                }
            } else {
                return { errorMsg: GENERAL_ERROR }
            }
        }
        const resCookies = res.headers.getSetCookie();
        const cookieStore = await cookies();
        resCookies.forEach((el) => {
            const c = el.split('=')
            cookieStore.set(c[0], c[1]);
        })

        redirect('/')

    } catch (err) {
        console.error(err)
        return { errorMsg: GENERAL_ERROR }
    }



    return null;
}