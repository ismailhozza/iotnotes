import React from "react"
import { connect } from "react-redux"

import {createNew} from "../reducers/noteReducer"

class NoteForm extends React.Component {

    addNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ""
        this.props.createNew(content)
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
    { createNew }
)(NoteForm)