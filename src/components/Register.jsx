import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../auth/firebase";

const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        if (!name) {
            alert("Please enter your name");
        } else if (!isValidEmail(email)) {
            alert("Please enter a valid email address");
        } else {
            registerWithEmailAndPassword(name, email, password);
        }
    }

    useEffect(() => {
        if (!loading && user) {
            navigate('/countries');
        }
    }, [loading, user, navigate]);

    return (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <Button onClick={register}>Register</Button>
            <div>
                Already have an account?
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
}

export default Register;