import React from "react"
import PropTypes from "prop-types"
// import Note from "./components/Note"

const actionFor = {
  noteCreation(content) {
    return {
      type: "NEW_NOTE",
      data: {
        content,
        important: false,
        id: generateId()
      }
    }
  },
  importanceToggling(id) {
    return {
      type: "TOGGLE_IMPORTANCE",
      data: {
        id: id
      }
    }
  }
}

const generateId = () => Number((Math.random()*1000000).toFixed(0))

class NoteForm extends React.Component {
    addNote = (event) => {
        event.preventDefault()
        const content = event.target.note.value
        this.context.store.dispatch(actionFor.noteCreation(content))
        event.target.note.value = ""
    }

    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    componentWillUnMount() {
        this.unsubscribe()
    }

    render() {
        return (
            <form onSubmit={this.addNote}>
                <input name="note" />
                <button type="submit">lisaa</button>
            </form>
        )
    }
}

NoteForm.contextTypes = {
    store: PropTypes.object
}

const Note = ({note, handleClick}) => {
    return (
      <li key={note.id} onClick={handleClick}>
        {note.content} <strong>{note.important ? "tarkea" : ""} </strong>
      </li>
    )
}

class NoteList extends React.Component {
    toggleImportance = (id) => () => {
        this.context.store.dispatch(actionFor.importanceToggling(id))
      }

    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() => this.forceUpdate())
    }

    componentWillUnMount() {
        this.unsubscribe()
    }

    render() {
        return (
            <ul>
                {this.context.store.getState().map((note) => 
                    <Note
                        key={note.id}
                        note={note}
                        handleClick={this.toggleImportance(note.id)}
                    />
                )}
            </ul>
        )
    }
}

NoteList.contextTypes = {
    store: PropTypes.object
}

class App extends React.Component {
  addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    this.props.store.dispatch(actionFor.noteCreation(content))
    event.target.note.value = ""
  }

  toggleImportance = (id) => () => {
    this.props.store.dispatch(actionFor.importanceToggling(id))
  }

  render() {
    return (
        <div>
            <NoteForm />
            <NoteList />
        </div>
    )
}
}

export default App