import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { CourseSubjectMediaModel } from "./CourseSubjectMedia"
import { CourseSubjectQuizeModel } from "./CourseSubjectQuize"

/**
 * Model description here for TypeScript hints.
 */
export const CourseSubjectsProps = {
  courseSubjectId: types.number,
  courseSubjectMedia: types.array(CourseSubjectMediaModel),
  courseSubjectQuize: types.array(CourseSubjectQuizeModel),
  courseId: types.number,
  subjectName: types.string,
  subjectDescription: types.string,
  subjectHeader: types.string,
  created_by: types.maybeNull(types.string),
  created_date: types.maybeNull(types.string),
  updated_by: types.maybeNull(types.string),
  updatedDate: types.maybeNull(types.string),
}
export const CourseSubjectsModel = types
  .model("CourseSubjects")
  .props(CourseSubjectsProps)
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface CourseSubjects extends Instance<typeof CourseSubjectsModel> {}
export interface CourseSubjectsSnapshotOut extends SnapshotOut<typeof CourseSubjectsModel> {}
export interface CourseSubjectsSnapshotIn extends SnapshotIn<typeof CourseSubjectsModel> {}
export const createCourseSubjectsDefaultModel = () => types.optional(CourseSubjectsModel, {})
