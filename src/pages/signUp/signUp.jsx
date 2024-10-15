import { auth, provider, db } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignUp = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [job, setJob] = useState('');

    // Function to handle Email Sign Up
    const handleEmailSignUp = async (values) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values?.email, values?.password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: fullName });
            await setDoc(doc(db, "users", user.uid), values);
            toast.success("User registered Successfully")
            navigate("/login")
        }
        catch (error) {
            toast.error("User registration failed")
            console.error('Error signing up:', error);
            setError(true)
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            await setDoc(doc(db, "users", user.uid), {
                fullName: user.displayName,
                email: user.email,
                job: job,
                uid: user.uid,
            });
            toast.success("User registered Successfully")
            navigate("/login")

        } catch (error) {
            toast.error("User registration failed")
            console.error('Error signing in with Google:', error);
            alert('Error with Google sign-in');
        }
    };

    const initialValues = {
        fullName: '',
        email: '',
        password: '',
        job: '',
    };

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .min(5, 'Must be 5 characters or more')
            .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
            .min(7, 'Must be 7 characters or more')
            .required('Required'),
        job: Yup.string().required('Required'),
    })
    return (
        <div style={{ height: '80vh' }} className='mt-5 d-flex justify-content-center align-items-center flex-column border border-light rounded bg-light w-100 container mt-4 bg-light'>
            <div className='w-100 text-center'>
                <h2>Sign Up</h2>
            </div>

            <div className='w-100 d-flex justify-content-center align-items-center'>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleEmailSignUp(values)}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className=" d-flex justify-content-center align-items-center w-100 p-3 rounded">
                            <div className='w-50'>
                                <div className="mb-3 w-100">
                                    <label htmlFor="fullName" className="form-label">Full Name</label>
                                    <Field name="fullName" type="text" className="form-control" placeholder="Enter Full name"/>
                                    <ErrorMessage name="fullName" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <Field name="email" type="email" className="form-control" placeholder="Enter your email"/>
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <Field name="password" type="password" className="form-control" placeholder="Enter your password"/>
                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="job" className="form-label">Job</label>
                                    <Field name="job" type="text" className="form-control" placeholder="Enter your job description"/>
                                    <ErrorMessage name="job" component="div" className="text-danger" />
                                </div>

                                {error && <p className='text-center text-danger'>Wrong email or password</p>}

                                <div className='d-grid gap-2 col-6 mx-auto'>
                                    <button style={{
                                        backgroundColor: "#90aead", color: "#ffff"
                                    }} type="submit" className="btn btn-sm " disabled={isSubmitting}>
                                        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                                    </button>
                                </div>


                            </div>

                        </Form>
                    )}
                </Formik>

            </div>
            <div className='w-75 d-flex justify-content-center align-items-center m-3'>
                <button onClick={handleGoogleSignIn} className='border border-dark rounded-circle d-flex justify-content-center align-items-center p-3 '><FaGoogle style={{color:'red'}} /></button>
            </div>
            <div className='w-75 d-flex justify-content-center align-items-center'>
                <p>Already have an account? <span onClick={() => navigate('/login')}>Login</span></p>
            </div>

        </div>
    )
}

export default SignUp