import React from "react"

const Note = ({note, handleClick}) => {
    const label = note.important ? "make not important" : "make important"
    return (
        <div className="wrapper">
            <div className="content">
                {note.content}
            </div>
            <div>
                <button onClick={handleClick}>{label}</button>
            </div>
        </div>
    )
}

export default Note