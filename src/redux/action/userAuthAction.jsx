export const getAuthDetails = () => {
    return localStorage.getItem('auth') || '';
}

// export { getAuth }