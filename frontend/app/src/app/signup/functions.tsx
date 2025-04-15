
interface errorObj {
    name: string,
    errorText: string
}

interface stateObj {
    errorMsg?: string,
    errors?: Array<errorObj>
}
export async function registerAccount(prevState: stateObj | null, formData: FormData): Promise<stateObj | null> {
    
    return null;
}