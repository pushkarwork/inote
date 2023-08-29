import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext'
const NoteItem = (props) => {
    const { noteValue, updateNote } = props

    const NotesContext = useContext(NoteContext)
    let { deleteNote} = NotesContext
    const OuterDivStyle = { "display": "inline-block" }
    const innerDivStyle = { "minWidth": "18rem", "display": "flex", "flexWrap": "wrap", "margin": "10px" }



    return (
        <>
            <div style={OuterDivStyle}>
                <div className="card" style={innerDivStyle}>
                    <div className="card-body">
                        <h5 className="card-title"> {noteValue.Title}</h5>
                        <p className="card-text"> {noteValue.Description}</p>
                        <i className="fa-solid fa-trash-can mx-2" onClick={() => deleteNote(noteValue._id)}  ></i>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={() => updateNote(noteValue)}></i>

                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem
