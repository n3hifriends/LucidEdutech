import { GovernmentExamsModel } from "./GovernmentExams"

test("can be created", () => {
  const instance = GovernmentExamsModel.create({})

  expect(instance).toBeTruthy()
})
