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
        <div style={{ height: '80vh' }} className='mt-5 d-flex justify-content-center align-items-center flex-column border border-light rounded bg-light col-xxl-6 col-xl-6  col-lg-12 col-sm-12 col-xs-12 container mt-4 bg-light'>
            <div className='w-100 text-center'>
                <h2>Sign Up</h2>
            </div>

            <div className='col-xxl-6 col-xl-6  col-lg-12 col-sm-12 col-xs-12 d-flex justify-content-center align-items-center'>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleEmailSignUp(values)}
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form className=" d-flex justify-content-center align-items-center w-100 p-3 rounded">
                            <div className='w-100'>
                                <div className="mb-3 w-100">
                                    <label htmlFor="fullName" className="form-label">Full Name</label>
                                    <Field name="fullName" type="text" className="form-control" placeholder="Enter Full name" />
                                    <ErrorMessage name="fullName" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <Field name="email" type="email" className="form-control" placeholder="Enter your email" />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <Field name="password" type="password" className="form-control" placeholder="Enter your password" />
                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="job" className="form-label">Job</label>
                                    <Field name="job" type="text" className="form-control" placeholder="Enter your job description" />
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
            <div className='d-flex justify-content-center align-items-center w-100 p-3 rounded'>
                <div className='d-grid gap-2 col-6 mx-auto'>
                    <button onClick={handleGoogleSignIn} style={{
                        backgroundColor: "#ffff", color: "#000000"
                    }} className="btn btn-sm p-2 border border-dark">
                        <svg className='me-2' xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 262"><path fill="#4285f4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" /><path fill="#34a853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" /><path fill="#fbbc05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z" /><path fill="#eb4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" /></svg>
                        Continue with Google
                    </button>
                </div>
            </div>
            {/* <div className='w-75 d-flex justify-content-center align-items-center m-3'>
                <button onClick={handleGoogleSignIn} className='border border-dark rounded-circle d-flex justify-content-center align-items-center p-3 '><FaGoogle style={{ color: 'red' }} /></button>
            </div> */}
            <div className='w-75 d-flex justify-content-center align-items-center' style={{ curser: 'pointer' }}>
                <p>Already have an account? <button className='btn btn-light' onClick={() => navigate('/login')}>Login</button></p>
            </div>

        </div>
    )
}

export default SignUp