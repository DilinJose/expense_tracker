import { auth, provider, db } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { getAuthDetails } from '../../redux/action/userAuthAction';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginForm = () => {
  const navigate = useNavigate()
  const { currentUser, dispatch } = useContext(AuthContext)
  const [error, setError] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailSignUp = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      dispatch({ type: "LOGIN", payload: user })
      toast.success("Login Successfull")
      navigate("/")
    }
    catch (error) {
      setError(true)
      toast.error("Login Failed")
      console.error('Error Login:', error);
    }
  };

  // Function to handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      dispatch({ type: "LOGIN", payload: user })
      toast.success("Login Successfull")
      navigate("/")
    } catch (error) {
      setError(true)
      toast.error("Login Failed")
      console.error('Error signing in with Google:', error);
    }
  };

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(7, 'Must be 7 characters or more')
      .required('Required'),
  })

  return (
    <div style={{ height: '70vh' }} className='mt-5 d-flex justify-content-center align-items-center flex-column border border-light rounded bg-light col-xxl-6 col-xl-6  col-lg-12 col-sm-12 col-xs-12 container mt-4 bg-light'>
      <div className='w-50 text-center'>
        <h2>Login In</h2>
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


                <div className="mb-3">
                  {/* <label htmlFor="email" className="form-label">Email</label> */}
                  <Field name="email" type="email" className="form-control p-2" placeholder="Enter your email" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  {/* <label htmlFor="password" className="form-label">Password</label> */}
                  <Field name="password" type="password" className="form-control p-2" placeholder="Enter your password" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>
                {error && <p className='text-center text-danger'>Wrong email or password</p>}

                <div className='d-grid gap-2 col-12 mx-auto'>
                  <button style={{
                    backgroundColor: "#90aead", color: "#ffff"
                  }} type="submit" className="btn btn-sm p-2" disabled={isSubmitting}>
                    {isSubmitting ? 'Logging in...' : 'LogIn'}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>

      </div>
      <div>
        <p className='text-center'>Or</p>
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

      <div className='w-75 d-flex justify-content-center align-items-center' style={{ curser: 'pointer' }}>
        <p>Donot have an account? <button className='btn btn-light' onClick={() => navigate('/signup')}>Sign Up</button></p>
      </div>


      {/* </div> */}
    </div>

  )
}

export default LoginForm