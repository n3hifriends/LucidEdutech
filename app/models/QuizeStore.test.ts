import { QuizeStoreModel } from "./QuizeStore"

test("can be created", () => {
  const instance = QuizeStoreModel.create({})

  expect(instance).toBeTruthy()
})
