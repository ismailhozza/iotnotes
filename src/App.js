import React from 'react'

import Picture from './components/Picture'
import pictureListService from './services/picturelist'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            newPictureName: "",
            newPictureDir: ""
        }
        console.log("constructor")
    }

    componentDidMount() {
        console.log("did mount")
        pictureListService
            .getAll()
            .then(pictures => {
                this.setState({ pictures: pictures })
            })
    }

    addPicture = (event) => {
        event.preventDefault()
        const noteObject = {
            name: this.state.newPictureName,
            directory: this.state.newPictureDir,
            // important: Math.random() > 0.5,
            // id: this.state.pictures.length + 1
        }

        pictureListService
            .create(noteObject)
            .then((response) => {
                this.setState({
                    pictures: this.state.pictures.concat(response.data),
                    newPictureName: '',
                    newPictureDir: '',
                    updateDesc: ''
                })
            })
    }

    handleNameChange = (event) => {
        console.log(event.target.value)
        this.setState({ newPictureName: event.target.value })
    }

    handleDirChange = (event) => {
        console.log(event.target.value)
        this.setState({ newPictureDir: event.target.value })
    }

    handleUpdate = (id) => {
        return (newName) => {
            console.log(`update ${id} with new name ${newName}`)
            const orig = this.state.pictures.find((p) => p._id === id)
            const newObj = {...orig, name: newName}
            delete newObj._id
            return pictureListService.updateOne(id, newObj)
                .then(() => console.log("Update completed"))
                .catch((error) => console.log(error))
        }
    }

    handleDelete = (id) => {
        return () => {
            pictureListService
                .deleteOne(id)
                .then(() => {
                    this.setState({
                        pictures: this.state.pictures.filter((pic) => id !== pic._id)
                    })
                })
        }
    }

    render() {
        console.log("render")
        const picturesToShow = this.state.pictures

        return (
            <div>
                <h1>Picture list</h1>

                <div>
                    {picturesToShow.map((pic) =>
                        <Picture
                            key={pic._id}
                            picture={pic}
                            handleUpdate={this.handleUpdate(pic._id)}
                            handleDelete={this.handleDelete(pic._id)}
                        />
                    )}
                </div>
                <form onSubmit={this.addPicture}>
                    Name: <input
                        value={this.state.newPictureName}
                        onChange={this.handleNameChange}
                    />
                    <br />
                    Location: <input
                        value={this.state.newPictureDir}
                        onChange={this.handleDirChange}
                    />
                    <br />
                    <button type="submit">tallenna</button>
                </form>
            </div>
        )
    }
}

export default App;