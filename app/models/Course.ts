import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { CourseSubjectsModel } from "./CourseSubjects"

/**
 * Model description here for TypeScript hints.
 */
export const CourseModelProps = {
  courseId: types.maybeNull(types.number),
  courseSubjects: types.array(CourseSubjectsModel),
  courseName: types.maybeNull(types.string),
  courseDescription: types.maybeNull(types.string),
  start_date: types.maybeNull(types.string),
  end_date: types.maybeNull(types.string),
  days: types.maybeNull(types.string),
  hours: types.maybeNull(types.string),
  created_by: types.maybeNull(types.string),
  created_date: types.maybeNull(types.string),
  updated_by: types.maybeNull(types.string),
  updatedDate: types.maybeNull(types.string),
}
export const QuizeModel = types
  .model("Course")
  .props(CourseModelProps)
  .actions(withSetPropAction)
  .views((courseObj) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((courseObj) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Quize extends Instance<typeof QuizeModel> {}
export interface QuizeSnapshotOut extends SnapshotOut<typeof QuizeModel> {}
export interface QuizeSnapshotIn extends SnapshotIn<typeof QuizeModel> {}
