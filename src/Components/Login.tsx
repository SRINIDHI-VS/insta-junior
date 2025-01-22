import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from '../firebaseConfig';
import { FirebaseError } from 'firebase/app';

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        localStorage.setItem('user', JSON.stringify({ name: user.displayName, email: user.email }));
        navigate('/gallery');
      }
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        if (err.code === 'auth/user-not-found') {
          setError('No account found with that email. Please register first.');
        } else {
          setError(err.message);
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        localStorage.setItem('user', JSON.stringify({ name: user.displayName, email: user.email }));
        navigate('/gallery');
      }
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError('Failed to login with Google. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="w-96 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 w-full mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 w-full mb-4 border rounded"
        />

        <button onClick={handleLogin} className="w-full p-2 bg-blue-500 text-white rounded">
          Login
        </button>

        <div className="text-center mt-2">
          <button onClick={handleGoogleSignIn} className="w-full p-2 bg-red-500 text-white rounded mb-4">
            Sign in with Google
          </button>
        </div>

        <p className="text-center mt-2 text-sm">
          Don't have an account?
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </p>

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
