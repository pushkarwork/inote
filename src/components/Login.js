import React, { useState } from 'react'
// import NoteContext from '../context/NoteContext'
import { useNavigate } from 'react-router-dom'
const port = "http://localhost:5000"
const Login = () => {
    let navigate = useNavigate();
    // const NotesContext = useContext(NoteContext)
    // const { UserLogin } = NotesContext
    const [login, setlogin] = useState({
        email: "",
        password: ""
    })

    const onchanges = (e) => {
        let name = e.target.name
        let value = e.target.value
        setlogin({ ...login, [name]: value })
        // console.log(login)
    }


    const UserLogin = async (login) => {
        const { email, password } = login
        const response = await fetch(`${port}/v1/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem("token")
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem("token", json.authtoken)
            navigate("/")
        }
        else {
            alert(json.error)
        }
    }

    const submitData = (e) => {
        e.preventDefault();
        UserLogin(login)

    }
    return (
        <div style={{ "padding": "10vw" }}>
            <form onSubmit={submitData} method='POST'>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={login.email} name='email' onChange={onchanges} required id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={login.password} onChange={onchanges} name='password' required className="form-control" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div >
    )
}

export default Login
