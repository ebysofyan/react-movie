import React from 'react';

class MovieForm extends React.Component {

    render() {
        const {storeMovie, handleChange, state, buttonText} = this.props
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h4>{buttonText}</h4>
                </div>
                <div className="panel-body">
                    <form action="" onSubmit={storeMovie}>
                        <div className="form-group">
                            <label htmlFor="" className="control-label">Title</label>
                            <input
                                name="title"
                                type="text"
                                className="form-control"
                                onChange={handleChange}
                                value={state.title}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="control-label">Genre</label>
                            <input
                                name="genre"
                                type="text"
                                className="form-control"
                                onChange={handleChange}
                                value={state.genre}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="control-label">Year</label>
                            <input
                                name="year"
                                type="text"
                                className="form-control"
                                onChange={handleChange}
                                value={state.year}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="control-label">Author</label>
                            <input
                                name="author"
                                type="text"
                                className="form-control"
                                onChange={handleChange}
                                value={state.author}/>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary pull-right">{buttonText}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default MovieForm