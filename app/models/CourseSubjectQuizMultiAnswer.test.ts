import { CourseSubjectQuizMultiAnswerModel } from "./CourseSubjectQuizMultiAnswer"

test("can be created", () => {
  const instance = CourseSubjectQuizMultiAnswerModel.create({})

  expect(instance).toBeTruthy()
})
