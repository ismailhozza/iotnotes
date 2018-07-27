import React from "react"
import { connect } from "react-redux"

import { initializeNotes } from "./reducers/noteReducer"

import NoteForm from "./components/NoteForm"
import NoteList from "./components/NoteList"
import VisibilityFilter from "./components/VisibilityFilter"

class App extends React.Component {

    componentDidMount() {
        this.props.initializeNotes()
    }

    render() {
        return (
            <div>
                <NoteForm />
                <VisibilityFilter />
                <NoteList />
            </div>
        )
    }
}

export default connect(
    null,
    { initializeNotes }
)(App)