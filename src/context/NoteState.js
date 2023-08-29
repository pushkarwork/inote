import NoteContext from "./NoteContext";
import { useState } from "react";
// import { useNavigate } from 'react-router-dom'
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkZmE4YmRmYzEwNmM5ZmE2ZjExMWY0In0sImlhdCI6MTY5MjM5ODQyMn0.ipPw_GrtoKhTnKwDxj4TDcVBb--wwsu3EhGv_K7zBF8"

const port = "http://localhost:5000"
const NoteState = (props) => {

    const notesInitial = []
    const [notes, setnotes] = useState(notesInitial)
    // let navigate = useNavigate();

    const GetNotes = async () => {
        const response = await fetch(`${port}/v1/notes/Notes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem("token")
            },
        });
        // body: JSON.stringify({ response });
        const anc = await response.json();
        setnotes(anc)
    }



    // ADD A NOTE USING API
    const addNote = async (Title, Description) => {
        const response = await fetch(`${port}/v1/notes/Notes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem("token")
            },
            body: JSON.stringify({ Title, Description })
        });
        const anc = await response.json();
        setnotes(notes.concat(anc))
    }

    // FOR Deleting the note
    const deleteNote = async (id) => {
        const response = await fetch(`${port}/v1/notes/Notes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem("token")
            },
        });
        // body: JSON.stringify({ response })
        const anc = await response.json();
        setnotes(anc)
        const abc = notes.filter((notex) => {
            return notex._id !== id
        });
        setnotes(abc)
    }


    // FOR Updating the note
    const updateTheNote = async (Title, Description, id) => {
        const response = await fetch(`${port}/v1/notes/Notes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authtoken": localStorage.getItem("token")
            },
            body: JSON.stringify({ Title, Description }),
        });
        const json = await response.json();
        let newNOTES = await JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < notes.length; index++) {
            const element = newNOTES[index];
            if (element._id === id) {
                newNOTES[index].Description = Description;
                newNOTES[index].Title = Title;
                break;
            }
        }
        setnotes(newNOTES);
    }




    return (
        <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote, GetNotes, updateTheNote }}>
            {props.children}
        </NoteContext.Provider>

    )

}
export default NoteState;
