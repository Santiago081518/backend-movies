const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/actors'

let actor = {
    firstName: 'Santiago',
    lastName: 'Botero',
    nationality: 'Colombia',
    image: 'Random32',
    birthday: '18-09-2005',
}

test("POST 'BASE_URL', should return status code 201 and res.body.firstName === actor.firstName", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(actor)

    actorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})

test("GET ALL 'BASE_URL', should return status code 200 and body.length === 1", async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("PUT 'BASE_URL/:id', should status code 200, res.body.firstName === bodyUpdate.firstName", async () => {

    const bodyUpdate = {
        firstName: "Nelson"
    }

    const res = await request(app)
        .put(`${BASE_URL}/${actorId}`)
        .send(bodyUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(bodyUpdate.firstName)
    expect(res.body.actorId).toBe(actor.actorId)
})

test("DELETE 'BASE_URL/:id', should status code 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${actorId}`)

    expect(res.status).toBe(204)
})