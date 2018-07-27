import React from "react"
import { connect } from "react-redux"

import {noteCreation} from "../reducers/noteReducer"

class NoteForm extends React.Component {

    addNote = (event) => {
        event.preventDefault()
        this.props.noteCreation(event.target.note.value)
        event.target.note.value = ""
    }

    render() {
        return (
            <div>
                <h2>Luo uusi muistiinpano</h2>
    
                <form onSubmit={this.addNote}>
                    <input name="note"/>
                    <button type="submit">tallenna</button>
                </form>
            </div>
        )
    }
}

export default connect(
    null,
    { noteCreation }
)(NoteForm)