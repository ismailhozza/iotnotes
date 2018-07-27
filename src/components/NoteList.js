import React from "react"
// import PropTypes from "prop-types"
import { connect } from "react-redux"

import Note from "./Note"
import { importanceToggling } from "../reducers/noteReducer"

class NoteList extends React.Component {
    render() {
        const notesToShow = () => {
            const { notes, filter } = this.props
            if (filter === "ALL") {
                return notes
            }
            return filter === "IMPORTANT"
                ? notes.filter((note) => note.important)
                : notes.filter((note) => !note.important)
        }
        return (
            <ul>
                {notesToShow().map((note) =>
                    <Note
                        key={note.id}
                        note={note}
                        handleClick={() => this.props.importanceToggling(note.id)}
                    />
                )}
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notes: state.notes,
        filter: state.filter
    }
}

const ConnectedNoteList = connect(
    mapStateToProps,
    {
        importanceToggling
    }
)(NoteList)

export default ConnectedNoteList