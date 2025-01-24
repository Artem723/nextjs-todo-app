/** 
 * 
*/
export default function validationMessageFlatter(mongooseValidationErrors) {
    const errors = mongooseValidationErrors || {}
    return Object.keys(errors)
        .map(name => ({
            [name]: errors[name].message
        }));
}