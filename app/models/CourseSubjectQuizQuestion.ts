import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { CourseSubjectQuizMultiAnswerModel } from "./CourseSubjectQuizMultiAnswer"

/**
 * Model description here for TypeScript hints.
 */
export const CourseSubjectQuizQuestionProps = {
  courseSubjectQuizQuestionId: types.maybeNull(types.number), // Integer
  courseSubjectQuizId: types.maybeNull(types.number), // Integer
  userId: types.maybeNull(types.number), // Integer (might need adjustment based on your user data)
  question: types.maybeNull(types.string),
  correctAnswer: types.maybeNull(types.string),
  answerExplanation: types.maybeNull(types.string),
  createdBy: types.maybeNull(types.string),
  createdDate: types.maybeNull(types.string), // Timestamp
  updatedBy: types.maybeNull(types.string),
  updatedDate: types.maybeNull(types.string), // Timestamp
  attempted: types.maybeNull(types.boolean),
  isCorrect: types.maybeNull(types.boolean),
  maxScore: types.maybeNull(types.number), // missing parameter
  courseSubjectQuizMultiAnswer: types.array(CourseSubjectQuizMultiAnswerModel),
}
export const CourseSubjectQuizQuestionModel = types
  .model("CourseSubjectQuizQuestion")
  .props(CourseSubjectQuizQuestionProps)
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    setAttempted(isAttempted: boolean) {
      // store?.attempted = isAttempted
      store?.setProp("attempted", isAttempted)
    },
    setIsCorrect(isCorrect: boolean) {
      store?.setProp("isCorrect", isCorrect)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface CourseSubjectQuizQuestion
  extends Instance<typeof CourseSubjectQuizQuestionModel> {}
export interface CourseSubjectQuizQuestionSnapshotOut
  extends SnapshotOut<typeof CourseSubjectQuizQuestionModel> {}
export interface CourseSubjectQuizQuestionSnapshotIn
  extends SnapshotIn<typeof CourseSubjectQuizQuestionModel> {}
export const createCourseSubjectQuizQuestionDefaultModel = () =>
  types.optional(CourseSubjectQuizQuestionModel, {})
