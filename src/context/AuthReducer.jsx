const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { currentUser: action.payload };
        case 'SIGN_OUT':
            return { currentUser: null }; 
        default:
            return state;
    }
};
export default AuthReducer;
