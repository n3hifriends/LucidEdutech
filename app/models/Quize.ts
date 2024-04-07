import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
const QuizeModelProps = {
  courseId: types.number,
  courseSubjects: types.array(
    types.model({
      courseSubjectId: types.number,
      courseSubjectMedia: types.array(types.frozen()),
      courseSubjectQuize: types.array(types.frozen()),
      courseId: types.number,
      subjectName: types.string,
      subjectDescription: types.string,
      subjectHeader: types.string,
      created_by: types.maybeNull(types.string),
      created_date: types.maybeNull(types.string),
      updated_by: types.maybeNull(types.string),
      updatedDate: types.maybeNull(types.string),
    }),
  ),
  courseName: types.string,
  courseDescription: types.string,
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
  .model("Quize")
  .props(QuizeModelProps)
  .actions(withSetPropAction)
  .views((quizeObj) => ({
    get courseSubjects() {
      return quizeObj.courseSubjects
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((quizeObj) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Quize extends Instance<typeof QuizeModel> {}
export interface QuizeSnapshotOut extends SnapshotOut<typeof QuizeModel> {}
export interface QuizeSnapshotIn extends SnapshotIn<typeof QuizeModel> {}
export const createQuizeDefaultModel = () => types.optional(QuizeModel, {})
