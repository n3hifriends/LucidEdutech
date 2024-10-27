import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const CourseSubjectQuizMultiAnswerProps = {
  courseSubjectQuizMultiAnsId: types.maybeNull(types.number), // Integer
  courseSubjectQuizQuestionId: types.maybeNull(types.number), // Integer
  userId: types.maybeNull(types.number), // Integer (might need adjustment based on your user data)
  type: types.maybeNull(types.string),
  value: types.maybeNull(types.string),
  isCorrectAnswer: types.maybeNull(types.boolean), // This might need conversion based on your data storage (types.maybeNull(types.boolean) or types.maybeNull(types.string))
  description: types.maybeNull(types.string),
  isActive: types.maybeNull(types.boolean),
  createdBy: types.maybeNull(types.string),
  createdDate: types.maybeNull(types.Date), // Timestamp
  updatedBy: types.maybeNull(types.string),
  updatedDate: types.maybeNull(types.Date), // Timestamp
}
export const CourseSubjectQuizMultiAnswerModel = types
  .model("CourseSubjectQuizMultiAnswer")
  .props(CourseSubjectQuizMultiAnswerProps)
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface CourseSubjectQuizMultiAnswer
  extends Instance<typeof CourseSubjectQuizMultiAnswerModel> {}
export interface CourseSubjectQuizMultiAnswerSnapshotOut
  extends SnapshotOut<typeof CourseSubjectQuizMultiAnswerModel> {}
export interface CourseSubjectQuizMultiAnswerSnapshotIn
  extends SnapshotIn<typeof CourseSubjectQuizMultiAnswerModel> {}
export const createCourseSubjectQuizMultiAnswerDefaultModel = () =>
  types.optional(CourseSubjectQuizMultiAnswerModel, {})
