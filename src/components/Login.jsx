import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";

const Login = () => {
    const [email, setEmail] = useState(''); // Declare email state variable
    const [password, setPassword] = useState(''); // Declare password state variable
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const login = () => {
        loginWithEmailAndPassword(email, password); // Use email and password variables
    }

    useEffect(() => {
        if (!loading && user) {
            navigate('/countries');
        }
    }, [loading, user, navigate]);

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                placeholder="Password"
            />
            <Button onClick={login}>Login</Button>
            <div>
                Don't have an account?
                <Link to="/register">Register</Link>
            </div>
        </div>
    );
}

export default Login;
