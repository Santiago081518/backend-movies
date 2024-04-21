const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/directors'

let director

director = {
    firstName: 'Quentin',
    lastName: 'Tarantino',
    nationality: 'USA',
    image: 'Random32',
    birthday: '1976-12-21',
}

let directorId

test("POST 'BASE_URL', should return status code 201 and res.body.firstName === director.firstName", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(director)

    directorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test("GET ALL 'BASE_URL', should return status code 200 and body.length === 1", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("PUT 'BASE_URL/:id', should status code 200, res.body.nationality === bodyUpdate.nationality", async () => {

    const bodyUpdate = {
        nationality: "Argetina"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${directorId}`)
        .send(bodyUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.nationality).toBe(bodyUpdate.nationality)
    expect(res.body.directorId).toBe(director.directorId)
})

test("DELETE 'BASE_URL/:id', should status code 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${directorId}`)

    expect(res.status).toBe(204)
})