import noteReducer from "./noteReducer"
import deepFreeze from "deep-freeze"

describe.only("noteReducer", () => {
    it("returns new state with action NEW_NOTE", () => {
        const state = []
        const action = {
            type: "NEW_NOTE",
            data: {
                content: "sovelluksen tila talletetaan storeen",
                important: true,
                id: 1
            }
        }

        deepFreeze(state)
        const newState = noteReducer(state, action)

        expect(newState.length).toBe(1)
        expect(newState).toContainEqual(action.data)
    })

    it("returns new state with action TOGGLE_IMPORTANCE", () => {
        const state = [
            {
                content: "sovelluksen tila talletetaan storeen",
                important: true,
                id: 1
            },
            {
                content: "tilan muutokset tehdaan actioneilla",
                important: false,
                id: 2
            },
        ]
        const action = {
            type: "TOGGLE_IMPORTANCE",
            data: {
                id: 2
            }
        }

        deepFreeze(state)
        const newState = noteReducer(state, action)

        expect(newState.length).toBe(2)
        expect(newState).toContainEqual(state[0])
        expect(newState).toContainEqual({
            content: "tilan muutokset tehdaan actioneilla",
            important: true,
            id: 2
        })
    })
})