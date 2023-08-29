import React, { useContext, useState, useEffect, useRef } from 'react'
import NoteContext from '../context/NoteContext'
import NoteItem from './NoteItem'
import { useNavigate } from 'react-router-dom'




const Home = () => {
    let navigate = useNavigate();
    const ref = useRef(null)
    const refClose = useRef(null)
    const NotesContext = useContext(NoteContext)
    const { notes, addNote, GetNotes, updateTheNote } = NotesContext
    const [notevalue, setnotevalue] = useState({
        Title: "",
        Description: "",
        id: ""
    })

    const [changedData, setchangedData] = useState({
        eTitle: "",
        eDescription: "",
        id: ""

    })

    useEffect(() => {
        if (localStorage.getItem("token")) {
            GetNotes()
        }
        else {
            navigate("/login")
        }
    })

    const onChanges = (e) => {
        let name = e.target.name
        let value = e.target.value
        let id = e._id
        return (
            setnotevalue({ ...notevalue, [name]: value, id })

        )
    }

    const submitData = (e) => {
        e.preventDefault();
        addNote(notevalue.Title, notevalue.Description, notevalue.id)
        setnotevalue({
            Title: "",
            Description: "",
            id: ""
        })

    }
    const updateNote = (note) => {
        ref.current.click()
        setchangedData({
            eTitle: note.Title,
            eDescription: note.Description,
            eid: note._id
        })
    }

    const submitChangedData = (e) => {
        e.preventDefault()
        updateTheNote(changedData.eTitle, changedData.eDescription, changedData.eid)
        refClose.current.click()


    }
    const ChangedDataUpdate = (e) => {
        setchangedData({ ...changedData, [e.target.name]: e.target.value })


    }

    return (<>
        {/* MODAL FOR  */}
        <div style={{ "display": "none" }}>
            <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div style={{ "padding": "0 15px" }} className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                            <div className="mb-3 my-4">
                                <label htmlFor="Title" className="form-label">Title of your note</label>
                                <input type="text" className="form-control" id="eTitle" value={changedData.eTitle} minLength={5} required name='eTitle' onChange={ChangedDataUpdate} aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="Description" className="form-label">Description</label>
                                <input type="text" className="form-control" value={changedData.eDescription} minLength={5} required onChange={ChangedDataUpdate} id="eDescription" name='eDescription' />
                            </div>
                        </form>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={changedData.eTitle.length < 5 || changedData.eTitle.length < 5} type="button" className="btn btn-primary" onClick={submitChangedData} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='container my-3'>
            <h1 style={{ "textAlign": "center", "marginTop": "5vh" }}>Welcome to i-Note</h1> <br /><br />
            <h3>Please add a Note</h3>
            <form method='POST'>
                <div className="mb-3 my-4">
                    <label htmlFor="Title" className="form-label">Title of your note</label>
                    <input type="text" className="form-control" id="Title" name='Title' minLength={5} required value={notevalue.Title} onChange={onChanges} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="Description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="Description" name='Description' minLength={5} required onChange={onChanges} value={notevalue.Description} />
                </div>

                <button disabled={notevalue.Title.length < 5 || notevalue.Description.length < 5} type="submit" className="btn btn-primary" onClick={submitData} >Submit</button>
            </form>
            <br /><br />
            <h6>Your Notes</h6>
            <div className='container' style={{ "margin": "20px 0" }} >
                {notes.length === 0 && "No Notes to Display"}
                {notes.map((note) => {
                    return (
                        < NoteItem noteValue={note} key={note._id} updateNote={updateNote} />
                    )
                })}
            </div>
        </div >
    </>
    )
}

export default Home
