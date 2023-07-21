const app = require("../src/app");
const session = require("supertest");
const request = session(app);

const character = {
  id: 923,
  name: "Rick",
  species: "Human",
  gender: "Female",
  status: "Alive",
  origin: { name: "Earth (C-137)" },
  image: "Image.jpg",
};

describe("test de Rutas", () => {
  describe("GET /rickandmorty/character/:id", () => {
    it("Responde con status: 200", async () => {
      const response = await request.get("/rickandmorty/character/1");
      expect(response.statusCode).toBe(200);
    });
    it("Responde un objeto con las propiedades: 'id','name','species','gender','status,'origin' e 'image'", async () => {
      const response = await request.get("/rickandmorty/character/1");
      for (const prop in character) {
        expect(response.body).toHaveProperty(prop);
      }
    });
    it("si hay un error responde con status: 500", async () => {
      const response = await request.get("/rickandmorty/character/1280");
      expect(response.statusCode).toBe(500);
    });
  });

  describe("GET /rickandmorty/login", () => {
    const access = { access: true };

    it("Responde con un objeto con la propiedad acces en true, si la informacion del usuario es valida", async () => {
      const response = await request.get(
        "/rickandmorty/login?email=giovannice22@hotmail.com&password=A123"
      );
      expect(response.body).toEqual(access);
    });

    it("Responde con un objeto con la propiedad acces en false, si la informacion del usuario no es valida", async () => {
      const response = await request.get(
        "/rickandmorty/login?email=giovannice22@hotmail.com&password=A123sdasd"
      );
      access.access = false;
      expect(response.body).toEqual(access);
    });
  });

  describe("POST /rickandmorty/fav", () => {
    it("Debe guardar el personaje en favoritos", async () => {
      const response = await request.post("/rickandmorty/fav").send(character);
      expect(response.body).toContainEqual(character);
    });

    it("Debe agregar personajes a favoritos sin eliminar a los existentes", async () => {
      character.id = 1923;
      character.name = "Juancito";
      const response = await request.post("/rickandmorty/fav").send(character);
      expect(response.body.length).toBe(2);
    });
  });

  describe("DELETE /rickandmorty/:id", () => {
    it("Si el ID solicitado no existe,deberia retornar un arreglo con todfos los favoritos", async () => {
      const response = await request.delete("/rickandmorty/fav/2");
      expect(response.body.length).toBe(2);
    });

    it("Si el ID enviado existe, deberia eliminarlo de favoritos", async () => {
      const response = await request.delete("/rickandmorty/fav/1923");
      expect(response.body.length).toBe(1);
    });
  });
});
