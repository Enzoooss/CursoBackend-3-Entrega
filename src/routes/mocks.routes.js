// routes/mocks.router.js
const Router = require("./router");
const { generateMockUsers } = require("../controllers/moking/generateData");
const { generateAndSaveUsers } = require("../controllers/moking/saveData");

class MocksRouter extends Router {
  init() {
    this.get("/mockingusers", ["PUBLIC"], generateMockUsers);
    this.post("/generateData", ["PUBLIC"], generateAndSaveUsers);
  }
}

module.exports = new MocksRouter();
