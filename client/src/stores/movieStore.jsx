import Movie from './../models/Movie'
import {observable} from 'mobx'

class MovieStore {
    @observable movies = []
    @observable isLoading = false

    constructor() {
        this.fetchAllMovie()
    }

    async fetchAllMovie() {
        try {
            this.isLoading = true
            let response = await fetch('http://localhost:8085/service/movie/list');
            if (response.status === 200) {
                this.movies = await response.json();
                this.isLoading = false
            } else {
                console.log('Network Error !!!');
            }
        } catch (error) {
            console.error(error);
        }
    }

    async create(movie = {}) {
        const data = Movie.fromJSON(this, movie)
        let response = await fetch('http://localhost:8085/service/movie/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.status === 201) {
            this.fetchAllMovie()
        }
    }

    async update(movie = {}) {
        const data = Movie.fromJSON(this, movie)
        let response = await fetch(`http://localhost:8085/service/movie/update/${movie.id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (response.status === 201) {
            this.fetchAllMovie()
        }
    }

    async delete(id) {
        let response = await fetch(`http://localhost:8085/service/movie/delete/${id}`)
        const status = await response.status
        if (status === 200) {
            this.fetchAllMovie()
        } else {
            console.log('error delete')
        }
    }

    toJS() {
        return this
            .movies
            .map(movie => movie.toJS());
    }
}

export default new MovieStore()