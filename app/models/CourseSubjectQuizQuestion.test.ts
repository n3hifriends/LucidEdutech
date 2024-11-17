import { CourseSubjectQuizQuestionModel } from "./CourseSubjectQuizQuestion"

test("can be created", () => {
  const instance = CourseSubjectQuizQuestionModel.create({})

  expect(instance).toBeTruthy()
})
