import { CourseSubjectMediaModel } from "./CourseSubjectMedia"

test("can be created", () => {
  const instance = CourseSubjectMediaModel.create({})

  expect(instance).toBeTruthy()
})
