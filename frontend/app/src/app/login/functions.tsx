'use server'


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
    
    const request = {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({login, password}),

    }
    try {
        const res = await fetch("http://user-serviceusers/login", request);
        if (!res.ok) {
            return { errorMsg: "The specified credentials are not correct. Try one more time" }        
        }

    } catch (err) {
        return { errorMsg: "Something went wrong..." }
    }
    return null;
}