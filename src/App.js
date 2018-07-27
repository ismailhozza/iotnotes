import React from "react"
import NoteForm from "./components/NoteForm"
import NoteList from "./components/NoteList"
import VisibilityFilter from "./components/VisibilityFilter"

class App extends React.Component {

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

export default App