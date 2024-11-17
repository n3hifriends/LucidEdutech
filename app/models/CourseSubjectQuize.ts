import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { CourseSubjectQuizQuestionModel } from "./CourseSubjectQuizQuestion"

/**
 * Model description here for TypeScript hints.
 */

export const CourseSubjectQuizeModelProps = {
  courseSubjectQuizId: types.maybeNull(types.number), // Integer
  courseSubjectId: types.maybeNull(types.number), // Integer
  quizName: types.maybeNull(types.string),
  description: types.maybeNull(types.string),
  isPaid: types.maybeNull(types.boolean),
  totalQuestion: types.maybeNull(types.number), // Integer
  totalMarks: types.maybeNull(types.number), // Integer
  timeInMinute: types.maybeNull(types.number), // Integer
  startTimestamp: types.maybeNull(types.string), // Timestamp
  endTimestamp: types.maybeNull(types.string), // Timestamp
  isActive: types.maybeNull(types.boolean),
  createdBy: types.maybeNull(types.string),
  createdDate: types.maybeNull(types.string), // Timestamp
  updatedBy: types.maybeNull(types.string),
  updatedDate: types.maybeNull(types.string), // Timestamp
  // Omitted for simplicity: CourseSubjectQuizFeedback and CourseSubjectQuizResult
  courseSubjectQuizQuestion: types.array(CourseSubjectQuizQuestionModel),
}

export const CourseSubjectQuizeModel = types
  .model("CourseSubjectQuize")
  .props(CourseSubjectQuizeModelProps)
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface CourseSubjectQuize extends Instance<typeof CourseSubjectQuizeModel> {}
export interface CourseSubjectQuizeSnapshotOut
  extends SnapshotOut<typeof CourseSubjectQuizeModel> {}
export interface CourseSubjectQuizeSnapshotIn extends SnapshotIn<typeof CourseSubjectQuizeModel> {}
export const createCourseSubjectQuizeDefaultModel = () =>
  types.optional(CourseSubjectQuizeModel, {})
