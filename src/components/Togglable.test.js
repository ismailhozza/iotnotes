import React from "react"
import { shallow, mount } from "enzyme"
// import Adapter from "enzyme-adapter-react-16"
import Note from "./Note"
import Togglable from "./Togglable"


describe.only("<Togglable />", () => {
    let togglableComponent

    beforeEach(() => {
        togglableComponent = shallow(
            <Togglable buttonLabel="show...">
                <div className="testDiv" />
            </Togglable>
        )
        // console.log(togglableComponent.debug())
    })

    it("renders its childen", ()=> {
        expect(togglableComponent.contains(<div className="testDiv" />)).toEqual(true)
    })

    it("at start the child are not displayed", () => {
        const div = togglableComponent.find(".togglableContent")
        expect(div.getElement().props.style).toEqual({ display: "none" })
    })

    it("after clicking the button, children are displayed", () => {
        const button = togglableComponent.find("button")

        button.at(0).simulate("click")

        const div = togglableComponent.find(".togglableContent")
        expect(div.getElement().props.style).toEqual({ display: "" })
    })

    it("mount renders all components", () => {
        const note1 = {
            content: "Kompponenttitestaus tapahtuu jestillä ja enzymellä",
            important: true
        }
        const note2 = {
            content: "mount renderöi myös alikomponentit",
            important: true
        }

        const noteComponent = mount(
            <Togglable buttonLabel="show...">
                <Note note={note1} />
                <Note note={note2} />
            </Togglable>
        )

        console.log(noteComponent.debug())
    })
})