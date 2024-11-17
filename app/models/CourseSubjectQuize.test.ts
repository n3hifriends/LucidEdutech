import { CourseSubjectQuizeModel } from "./CourseSubjectQuize"

test("can be created", () => {
  const instance = CourseSubjectQuizeModel.create({})

  expect(instance).toBeTruthy()
})
