import { AllGovermentExamsModel } from "./AllGovermentExams"

test("can be created", () => {
  const instance = AllGovermentExamsModel.create({})

  expect(instance).toBeTruthy()
})
