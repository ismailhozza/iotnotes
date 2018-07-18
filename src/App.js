import React from 'react'

import Note from './components/Note'

const App = ({notes}) => {
    const rivit = () => notes.map((note) =>
        <Note key={note.id} note={note} />
    )

    return (
        <div>
            <h1>Muistiinpanot</h1>
            <ul>
                {rivit()}
            </ul>
        </div>
    )
}

export default App;