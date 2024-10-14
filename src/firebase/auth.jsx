import { auth, provider, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useState } from 'react';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [job, setJob] = useState('');

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: fullName });

      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        email: user.email,
        job: job,
        uid: user.uid,
      });

      alert('User signed up successfully');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Error signing up');
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

      alert('Google sign-in successful');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      alert('Error with Google sign-in');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleEmailSignUp}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Job Title"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          required
        />
        <button type="submit">Sign Up with Email</button>
      </form>
      <hr />
      <button onClick={handleGoogleSignIn}>Sign Up with Google</button>
    </div>
  );
};

export default Auth;
