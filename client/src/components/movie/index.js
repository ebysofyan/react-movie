import React from 'react';
import MovieList from './list/MovieList'
import MovieForm from './add/MovieForm'
import {inject, observer} from 'mobx-react'
import Loading from 'react-loading-animation'

@inject('stores')@observer
class MoviePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            title: '',
            genre: '',
            year: '',
            author: ''
        }

        this.editMode = false
        this.buttonText = 'Add Movie'
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    storeMovie = (e) => {
        e.preventDefault();
        const movieStore = this.props.stores.movieStore

        const movie = {
                id: this.state.id,
                title: this.state.title,
                genre: this.state.genre,
                year: this.state.year,
                author: this.state.author
            }

        if (this.editMode === false) {
            movieStore.create(movie)

            this.buttonText = 'Add Movie'
        } else {
            movieStore.update(movie)
        }

        this.clear()
    }

    clear = () => {
        this.setState({title: '', genre: '', year: '', author: ''})
    }

    getMovie = movie => {
        let state = {
            id: '',
            title: '',
            genre: '',
            year: '',
            author: ''
        }

        this.editMode = movie.id
            ? true
            : false

        state.id = movie.id ? movie.id : ""
        state.title = movie.title
        state.genre = movie.genre
        state.year = movie.year
        state.author = movie.author

        this.setState(state)
        this.buttonText = 'Update Movie'
    }

    deleteMovie = id => {
        const movieStore = this.props.stores.movieStore
        movieStore.delete(id)
    }

    listMovie = () => (
        <div id="Layout" className="row">
            {this
                .props
                .stores
                .movieStore
                .movies
                .map(movie => <MovieList
                    key={movie.id}
                    {...movie}
                    deleteMovie={this.deleteMovie}
                    getMovie={this.getMovie}/>)}
        </div>
    )

    render() {
        const isLoading = this.props.stores.movieStore.isLoading
        let component = null

        if (isLoading === true) {
            component = <Loading className="middle"/>
        } else {
            component = this.listMovie()
        }

        const style = {
            container:{
                marginTop: 21
            }
        }

        return (
            <div className="container" style={style.container}>
                <div className="row">
                    <div className="col-md-4">
                        <MovieForm
                            storeMovie={this.storeMovie}
                            handleChange={this.handleChange}
                            state={this.state}
                            buttonText={this.buttonText}/>
                    </div>
                    <div className="col-md-6 col-md-offset-1">
                        {component}
                    </div>
                </div>

            </div>
        )
    }
}

export default MoviePage;