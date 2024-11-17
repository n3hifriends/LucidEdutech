import { CourseSubjectsModel } from "./CourseSubjects"

test("can be created", () => {
  const instance = CourseSubjectsModel.create({})

  expect(instance).toBeTruthy()
})
