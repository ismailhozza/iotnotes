import React from 'react';

class Picture extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pictureName: props.picture.name,
            editing: false
        }
    }

    handleNameChange = (event) => {
        this.setState({ pictureName: event.target.value })
    }

    handleUpdate = () => {
        this.props.handleUpdate(this.state.pictureName)
            .then(() => {

                this.setState({editing: false, pictureName: this.state.pictureName})

            })
    }

    edit = () => {
        this.setState({editing: true})
    }

    render() {

        const label = this.state.editing
            ? <input value={this.state.pictureName} onChange={this.handleNameChange} />
            : <div>{this.state.pictureName} <button onClick={this.edit}>edit</button></div>

        return (
            <figure>
                <img src={this.props.picture.directory} alt={this.props.picture.name}/>
                <figcaption>
                    {label}<br />
                    <button onClick={this.handleUpdate}>Update</button>
                    <button onClick={this.props.handleDelete}>Delete</button>

                </figcaption>
            </figure>
        )
    }
}

export default Picture;