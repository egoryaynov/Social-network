export const required = (value) => {
    return value.length !== 0 ? null : 'This field is required'
}