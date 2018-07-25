import React from 'react'

import Note from './components/Note'
import Notification from './components/Notification'

import notesService from './services/notes'
import loginService from './services/login'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
    return (
        <div>
            <h2>Kirjaudu</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    käyttäjätunnus
                    <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    salasana
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">kirjaudu</button>
            </form>
        </div>
    )
}

class Togglable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    toggleVisibility = () => {
        this.setState({visible: !this.state.visible})
    }

    render() {
        const hideWhenVisible = { display: this.state.visible ? "none": ""}
        const showWhenVisible = { display: this.state.visible ? "": "none"}

        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
                </div>
                <div style={showWhenVisible}>
                    {this.props.children}
                    <button onClick={this.toggleVisibility}>cancel</button>
                </div>
            </div>
        )      
    }
}

const NoteForm = ({onSubmit, handleChange, value}) => {
    return (
        <div>
            <h2>Luo uusi muistiinpano</h2>

            <form onSubmit={onSubmit}>
                <input
                    value={value}
                    onChange={handleChange}
                />
                <button type="submit">tallenna</button>
            </form>
        </div>
    )
}

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            newNote: "uusi muistiinpano",
            showAll: true,
            error: null,
            username: '',
            password: '',
            user: null,
            loginVisible: false
        }
    }

    componentDidMount() {
        notesService
            .getAll()
            .then(notes => {
                this.setState({ notes: notes })
            })

        const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            this.setState({user})
            notesService.setToken(user.token)
        }
    }

    addNote = async (event) => {
        event.preventDefault()
        this.noteForm.toggleVisibility()
        const noteObject = {
            content: this.state.newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: this.state.notes.length + 1
        }

        const note = await notesService
            .create(noteObject)

        this.setState({
            notes: this.state.notes.concat(note),
            newNote: ''
        })
}

    login = async (event) => {
        event.preventDefault()
        this.loginForm.toggleVisibility()
        try {
            const user = await loginService.login({
                username: this.state.username,
                password: this.state.password
            })

            window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user))
            notesService.setToken(user.token)
            this.setState({ username: "", password: "", user: user })
        } catch (error) {
            this.setState({ error: "käyttäjätunnus tai salasana virheellinen" })
            setTimeout(() => {
                this.setState({ error: null })
            }, 5000)
        }
        // console.log('logging in with', this.state.username, this.state.password)
    }

    handleLoginFieldChange = (event) => {
        // if (event.target.name === "password") {
        //     this.setState({ password: event.target.value })
        // } else if (event.target.name === "username") {
        //     this.setState({ [username]: event.target.value })
        // }
        this.setState({ [event.target.name]: event.target.value })
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
        const notesToShow = this.state.showAll ?
            this.state.notes :
            this.state.notes.filter(note => note.important)

        const label = this.state.showAll ? "vain tärkeät" : "kaikki"
    
        const notes = () => (
            <div>
                <h2>Muistiinpanot</h2>
    
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
            </div>
        )

        return (
            <div>
                <Notification message={this.state.error} />

                <Togglable buttonLabel="login" ref={(component) => this.loginForm = component}>
                    <LoginForm
                        username={this.state.username}
                        password={this.state.password}
                        handleChange={this.handleLoginFieldChange}
                        handleSubmit={this.login}
                    />
                </Togglable>

                {notes()}

                <Togglable buttonLabel="new note" ref={(component) => this.noteForm = component}>
                    <NoteForm
                        onSubmit={this.addNote}
                        value={this.state.newNote}
                        handleChange={this.handleNoteChange}
                    />
                </Togglable>

            </div>
        )
    }
}

export default App;