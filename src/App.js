import React from 'react'

import Note from './components/Note'
import notesService from './services/notes'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            newNote: "uusi muistiinpano",
            showAll: true
        }
        console.log("constructor")
    }

    componentDidMount() {
        console.log("did mount")
        notesService
            .getAll()
            .then(notes => {
                this.setState({ notes: notes })
            })
    }

    addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: this.state.newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            // id: this.state.notes.length + 1
        }

        // const notes = this.state.notes.concat(noteObject)

        // this.setState({
        //     notes,
        //     newNote: ''
        // })
        notesService
            .create(noteObject)
            .then((response) => {
                this.setState({
                    notes: this.state.notes.concat(response.data),
                    newNote: ''
                })
            })
    }

    handleNoteChange = (event) => {
        console.log(event.target.value)
        this.setState({ newNote: event.target.value })
    }

    toggleVisible = () => {
        this.setState({showAll: !this.state.showAll})
    }

    toggleImportanceOf = (id) => {
        return () => {
            const url = `http://localhost:3001/notes/${id}`
            const note = this.state.notes.find(n=> n.id === id)
            const changedNote = { ...note, important: !note.important }

            notesService
                .update(id, changedNote)
                .then( (response) => {
                    this.setState({
                        notes: this.state.notes.map( note => note.id !== id ? note: response.data)
                    })
                })
        }
    }

    render() {
        console.log("render")
        const notesToShow = this.state.showAll ?
            this.state.notes :
            this.state.notes.filter(note => note.important)

        const label = this.state.showAll ? "vain tärkeät" : "kaikki"

        return (
            <div>
                <h1>Muistiinpanot</h1>
                <div>
                    <button onClick={this.toggleVisible}>
                        näytä {label}
                    </button>
                </div>

                <ul>
                    {notesToShow.map((note) =>
                        <Note
                            key={note.id}
                            note={note}
                            toggleImportance={this.toggleImportanceOf(note.id)}
                        />
                    )}
                </ul>
                <form onSubmit={this.addNote}>
                    <input
                        value={this.state.newNote}
                        onChange={this.handleNoteChange}
                    />
                    <button type="submit">tallenna</button>
                </form>
            </div>
        )
    }
}

export default App;