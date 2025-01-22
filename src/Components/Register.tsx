import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from '../firebaseConfig';

const Register = () => {
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        setError(null);
        if (password !== confirmPassword) {
            setError('Passwords do not match, please check the password');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            if (user) {
                localStorage.setItem('user', JSON.stringify({ name: user.displayName || name, email: user.email }));
                navigate('/gallery');
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
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
            setError('Failed to register with Google. Please try again...');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <div className="w-96 p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Register</h2>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 w-full mb-4 border rounded"
                />
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
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="p-2 w-full mb-4 border rounded"
                />

                <button onClick={handleRegister} className="w-full p-2 bg-blue-500 text-white rounded">
                    Register
                </button>

                <div className="text-center mt-2">
                    <button onClick={handleGoogleSignIn} className="w-full p-2 bg-red-500 text-white rounded mb-4">
                        Register with Google
                    </button>
                </div>

                <p className="text-center mt-2 text-sm">
                    Already have an account?
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </span>
                </p>

                {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default Register;
