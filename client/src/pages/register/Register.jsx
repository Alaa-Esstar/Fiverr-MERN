import React, { useState } from 'react'
import "./Register.scss"
import upload from '../../utils/upload';
import newRequest from '../../utils/newRequest';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [user, setUser] = useState({
        username: "", password: "", email: "",
        img: "", country: "", isSeller: false,
        desc: ""
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setUser((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    const handleSeller = (e) => {
        setUser((prev) => {
            return { ...prev, isSeller: e.target.checked }
        })
    }

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            if (file) {
                const url = await upload(file);
                await newRequest.post("auth/register", { ...user, img: url })
            }
            await newRequest.post("auth/register", user)
            navigate("/")
        } catch (err) {
            console.error("Registration failed:", err.response.data.message);
            setError("Registration failed: " + err.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="register">
            <form onSubmit={handleSubmit}>
                <div className="left">
                    <h1>Create a new account</h1>
                    <label htmlFor="">Username</label>
                    <input
                        name="username"
                        type="text"
                        placeholder="johndoe"
                        onChange={handleChange} required />
                    <label htmlFor="">Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="email"
                        onChange={handleChange} required />
                    <label htmlFor="">Password</label>
                    <input name="password" type="password"
                        onChange={handleChange} required />
                    <label htmlFor="">Profile Picture</label>
                    <input type="file"
                        onChange={(e) => setFile(e.target.files[0])} />
                    <label htmlFor="">Country</label>
                    <input
                        name="country"
                        type="text"
                        placeholder="Usa"
                        onChange={handleChange} />
                    <button type="submit" disabled={loading}>{loading ? "Registration in progress" : "Register"}</button>
                </div>
                <div className="right">
                    <h1>I want to become a seller</h1>
                    <div className="toggle">
                        <label htmlFor="">Activate the seller account</label>
                        <label className="switch">
                            <input type="checkbox"
                                onChange={handleSeller} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    <label htmlFor="">Phone Number</label>
                    <input
                        name="phone"
                        type="text"
                        placeholder="+1 234 567 89"
                        onChange={handleChange} />
                    <label htmlFor="">Description</label>
                    <textarea
                        placeholder="A short description of yourself"
                        name="desc"
                        id=""
                        cols="30"
                        rows="10"
                        onChange={handleChange}
                    ></textarea>
                    <button type="submit" className='bRight' disabled={loading}>{loading ? "Registration in progress" : "Register"}</button>
                </div>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Register