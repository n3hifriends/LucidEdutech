import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */

export const CourseSubjectMediaProps = {
  courseSubjectMediaId: types.maybeNull(types.number), // Integer
  courseSubjectId: types.maybeNull(types.number), // Integer
  mediaLink: types.maybeNull(types.string),
  type: types.maybeNull(types.string),
  description: types.maybeNull(types.string),
  createdBy: types.maybeNull(types.string),
  createdDate: types.maybeNull(types.Date), // Timestamp
  updatedBy: types.maybeNull(types.string),
  updatedDate: types.maybeNull(types.Date), // Timestamp
}

export const CourseSubjectMediaModel = types
  .model("CourseSubjectMedia")
  .props(CourseSubjectMediaProps)
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface CourseSubjectMedia extends Instance<typeof CourseSubjectMediaModel> {}
export interface CourseSubjectMediaSnapshotOut
  extends SnapshotOut<typeof CourseSubjectMediaModel> {}
export interface CourseSubjectMediaSnapshotIn extends SnapshotIn<typeof CourseSubjectMediaModel> {}
export const createCourseSubjectMediaDefaultModel = () =>
  types.optional(CourseSubjectMediaModel, {})
