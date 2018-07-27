import notesService from "../services/notes"

const initialState = []

const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case "NEW_NOTE":
            return [...state, action.data]
        case "INIT_NOTES":
            return action.data
        case "TOGGLE_IMPORTANCE":
            const id = action.data.id
            const noteToChange = state.find((n) => n.id === id)
            const changedNote = { ...noteToChange, important: !noteToChange.important }
            return state.map((note) => note.id !== id ? note : changedNote)
        default:
            return state
    }
}

// const generateId = () => Number((Math.random() * 1000000).toFixed(0))

export const createNew = (content) => {
    return async (dispatch) => {
        const newNote = await notesService.createNew(content)
        dispatch({
            type: "NEW_NOTE",
            data: newNote
        })
    }
}

export const importanceToggling = (id) => {
    return {
        type: "TOGGLE_IMPORTANCE",
        data: { id }
    }
}

export const initializeNotes = () => {
    return async (dispatch) => {
        const notes = await notesService.getAll()
        dispatch(
            {
                type: "INIT_NOTES",
                data: notes
            }
        )
    }
}

export default noteReducer