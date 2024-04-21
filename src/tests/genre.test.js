const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/genres'

let genre

genre = {
    name: 'Ficcion'
}

let genreId

test("POST 'BASE_URL', should return status code 201 and res.body.name === genre.name", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(genre)

    genreId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
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
        name: "Psicologico"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${genreId}`)
        .send(bodyUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(bodyUpdate.name)
    expect(res.body.genreId).toBe(genre.genreId)
})

test("DELETE 'BASE_URL/:id', should status code 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${genreId}`)

    expect(res.status).toBe(204)
})