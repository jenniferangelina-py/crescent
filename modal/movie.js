class Movie {
    constructor(id, poster_path, title) {
        this.id = id;
        this.poster_path = poster_path;
        this.title = title;
    }

    printMovieDetails() {
        console.log(`This movie with ${this.id} has the title ${this.title}`);
    }
}