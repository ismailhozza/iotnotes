import React from 'react';

const Picture = ({picture, handleUpdate, handleDelete}) => {
    return (
        <div>
            <figure>
                <img src={picture.directory} alt={picture.name}/>
                <figcaption>
                    {picture.name} <br />
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={handleDelete}>Delete</button>
                </figcaption>
            </figure>
        </div>
    )
}

export default Picture;