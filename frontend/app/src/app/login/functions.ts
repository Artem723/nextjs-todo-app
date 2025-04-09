'use server'
import { cookies } from 'next/headers';

interface ValError  {
    name: string
    value: string
}


export interface StateObj {
    errorMsg: string
    errors?: Array<ValError>
}
export async function loginSubmit(state: StateObj | null, formData: FormData): Promise<StateObj | null> {
    const login = formData.get('login');
    const password = formData.get("password");
    const headers = new Headers({
        'Content-Type': "application/json"
    });
    const request = {
        method: "POST",
        headers,
        body: JSON.stringify({login, password}),

    }
    try {
        const res = await fetch("http://gateway/users/login", request);
        if (!res.ok) {
            return { errorMsg: "The specified credentials are not correct. Try one more time" }        
        }
        const resCookies = res.headers.getSetCookie();
        const cookieStore = await cookies();
        resCookies.forEach((el) => {
            const c = el.split('=')
            cookieStore.set(c[0], c[1]);
        })
        // REDIRECT

    } catch (err) {
        return { errorMsg: "Something went wrong..." }
    }
    return null;
}