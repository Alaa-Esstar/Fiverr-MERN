import React, { useState } from 'react'
import "./Login.scss"
import newRequest from '../../utils/newRequest';
import { useNavigate } from "react-router-dom"
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(null)
            setIsFetching(true)
            const res = await newRequest.post("auth/login", { username, password })
            localStorage.setItem("currentUser", JSON.stringify(res.data));
            navigate("/");
        } catch (err) {
            setError(err.response.data)
        }
        setIsFetching(false);
    };
    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <h1>Sign in</h1>
                <label htmlFor="">Username</label>
                <input
                    name="username"
                    type="text"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="">Password</label>
                <input
                    name="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={isFetching}>Login</button>
                <span>{error && error}</span>
            </form>
        </div>
    )
}

export default Login