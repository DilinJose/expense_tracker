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
      toast.danger("Login Failed")
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
      toast.danger("Login Failed")
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
    <div style={{ height: '70vh' }} className='mt-5 d-flex justify-content-center align-items-center flex-column border border-light rounded bg-light w-100 container mt-4 bg-light'>
      <div className='w-50 text-center'>
        <h2>Login In</h2>
      </div>

      <div className='w-50 d-flex justify-content-center align-items-center'>
        {/* <form onSubmit={handleEmailSignUp} className='d-flex  flex-column w-100'>

          <input
            className='form-control m-2'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className='form-control m-2'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className='text-center text-danger'>Wrong email or password</p>}


          <button className="btn btn-primary m-2" type="submit">Login</button>
        </form> */}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleEmailSignUp(values)}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className=" d-flex justify-content-center align-items-center w-100 p-3 rounded">
              <div className='w-100'>


                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <Field name="password" type="password" className="form-control" />
                  <ErrorMessage name="password" component="div" className="text-danger" />
                </div>
                {error && <p className='text-center text-danger'>Wrong email or password</p>}

                <div className='d-grid gap-2 col-6 mx-auto'>
                  <button style={{
                    backgroundColor: "#90aead", color: "#ffff"
                  }} type="submit" className="btn btn-sm " disabled={isSubmitting}>
                    {isSubmitting ? 'Logging in...' : 'LogIn'}
                  </button>
                </div>


              </div>

            </Form>
          )}
        </Formik>

      </div>
      <div className='w-75 d-flex justify-content-center align-items-center m-3'>
        <button onClick={handleGoogleSignIn} className='border border-dark rounded-circle d-flex justify-content-center align-items-center p-3 '><FaGoogle /></button>
      </div>
      <div className='w-75 d-flex justify-content-center align-items-center'>
        <p>Donot have an account? <a onClick={() => navigate('/signup')}>Sign Up</a></p>
      </div>


      {/* </div> */}
    </div>

  )
}

export default LoginForm