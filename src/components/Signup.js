import React, { useState } from 'react'
// import NoteContext from '../context/NoteContext'
import { useNavigate } from 'react-router-dom'
const port = "http://localhost:5000"


const Signup = () => {
    let navigate = useNavigate();
    // const NotesContext = useContext(NoteContext)
    // const { UserSignUp } = NotesContext


    const [signUp, setsignUp] = useState({
        name: "", email: "", password: "", cpassword: ""
    })
    const onchanges = (e) => {
        let name = e.target.name
        let value = e.target.value
        setsignUp({ ...signUp, [name]: value })
        // console.log(login)
    }
    const submitData = (e) => {
        e.preventDefault();
        if (signUp.password !== signUp.cpassword) {
            alert("Please Check the password again")

        } else {

            console.log(signUp)
            UserSignUp(signUp)
        }


    }


    const UserSignUp = async (signup) => {
        const { name, email, password } = signup;
        const response = await fetch(`${port}/v1/auth/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: name, email: email, password: password })
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



    return (
        <div style={{ "padding": "10vw" }}>
            <form onSubmit={submitData} method='POST'>
                {/* name */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input type="name" className="form-control" value={signUp.name} name='name' onChange={onchanges} required id="name" aria-describedby="emailHelp" />
                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                {/* email address */}
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={signUp.email} name='email' onChange={onchanges} required id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                {/* password */}
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" value={signUp.password} onChange={onchanges} name='password' required className="form-control" id="password" />
                </div>
                {/* confirm password */}
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Password</label>
                    <input type="password" value={signUp.cpassword} onChange={onchanges} name='cpassword' required className="form-control" id="cpassword" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form >
        </div >
    )
}

export default Signup
