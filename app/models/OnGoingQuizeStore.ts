import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const OnGoingQuizeModel = types
  .model("OnGoingQuizeStore")
  .props({
    courseId: types.maybeNull(types.number),
    currentCourseName: types.maybeNull(types.string),
  }) // fix: use types.model instead of types.array
  .actions(withSetPropAction)
  .views((store) => ({
    get getCurrentCourseId() {
      return store?.courseId
    },
    get getCurrentCourseName() {
      return store?.currentCourseName
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    setCurrentCouserId(currentCourseId: number) {
      if (currentCourseId) {
        store.setProp("courseId", currentCourseId)
      } else {
        console.tron.error(`Quize can not be empty`, [])
      }
    },
    setCurrentCourseName(currentCourseName: string) {
      if (currentCourseName) {
        store.setProp("currentCourseName", currentCourseName)
      } else {
        console.tron.error(`Quize can not be empty`, [])
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface OnGoingQuizeStore extends Instance<typeof OnGoingQuizeModel> {}
export interface OnGoingQuizeStoreSnapshotOut extends SnapshotOut<typeof OnGoingQuizeModel> {}
export interface OnGoingQuizeStoreSnapshotIn extends SnapshotIn<typeof OnGoingQuizeModel> {}
