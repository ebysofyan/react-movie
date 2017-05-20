import {observable} from 'mobx'

export default class Movie {
    store;
    id;
    @observable title;
    @observable genre;
    @observable year;
    @observable author;

    constructor(store, id, title, genre, year, author) {
        this.store = store
        this.id = id
        this.title = title
        this.genre = genre
        this.year = year
        this.author = author
    }

    toJSON() {
        return {id: this.id, title: this.title, genre: this.genre, year: this.year, author: this.author}
    }

    static fromJSON(store, object) {
        return new Movie(store, object.id, object.title, object.genre, object.year, object.author)
    }
}