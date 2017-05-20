import React from 'react';

const MovieList = props => (
    <div className="col-md-6">
        <h4>{props.id}. {props.title}</h4>
        <p>{props.genre}</p>
        <p>{props.year}</p>
        <p>{props.author}</p>
        <div className="btn-group">
            <button className="btn btn-primary" 
                onClick={function(){
                    props.getMovie(props)
                }}>Edit</button>
            <button
                className="btn btn-danger"
                onClick={function(){
                    props.deleteMovie(props.id)
                }}>Delete</button>
        </div>
    </div>
)

export default MovieList
