require('../models')

const request = require("supertest")
const app = require("../app")
const Director = require('../models/Director')
const Genre = require('../models/Genre')
const Actor = require('../models/Actor')

const BASE_URL = '/api/v1/movies'

let movie

movie = {
    name: 'Rapidos y Furiosos',
    image: 'Random333',
    synopsis: 'synopsis22',
    releaseYear: 2012,
}


let movieId

test("POST 'BASE_URL', should return status code 201 and res.body.name === movie.name", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(movie)

    movieId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("GET ALL 'BASE_URL', should return status code 200 and body.length === 1", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("PUT 'BASE_URL/:id', should status code 200, res.body.name === bodyUpdate.name", async () => {

    const bodyUpdate = {
        name: "Guardianes de la bahia"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${movieId}`)
        .send(bodyUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(bodyUpdate.name)
})

test("Post -> BASE_URL/:id/directors, should return statusCode 200 and res.body.length === 1 ", async () => {
    const createDirector = await Director.create({
        firstName: 'Diomedes',
        lastName: 'Florez',
        nationality: 'Mexico',
        image: 'Random34',
        birthday: '1999-12-24',
    })
    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/directors`)
        .send([createDirector.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].moviesDirectors.directorId).toBe(createDirector.id)
    expect(res.body[0].moviesDirectors.movieId).toBe(movieId)

    await createDirector.destroy()
})

test("Post -> BASE_URL/:id/genres, should return statusCode 200 and res.body.length === 1 ", async () => {
    const createGenre = await Genre.create({
        name: 'Terror'
    })
    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/genres`)
        .send([createGenre.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].moviesGenres.genreId).toBe(createGenre.id)
    expect(res.body[0].moviesGenres.movieId).toBe(movieId)

    await createGenre.destroy()
})

test("Post -> BASE_URL/:id/actors, should return statusCode 200 and res.body.length === 1 ", async () => {
    const createActor = await Actor.create({
        firstName: 'Nicolas',
        lastName: 'Salamanca',
        nationality: 'Argentina',
        image: 'Random100',
        birthday: '2008-10-15',
    })
    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/actors`)
        .send([createActor.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].moviesActors.actorId).toBe(createActor.id)
    expect(res.body[0].moviesActors.movieId).toBe(movieId)

    await createActor.destroy()
})

test("DELETE 'BASE_URL/:id', should status code 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${movieId}`)

    expect(res.status).toBe(204)
})