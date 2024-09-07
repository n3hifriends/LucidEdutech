import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { QuizeModelProps } from "./Quize"

/**
 * Model description here for TypeScript hints.
 */
export const OnGoingQuizeModel = types
  .model("OnGoingQuizeStore")
  .props(QuizeModelProps) // fix: use types.model instead of types.array
  .actions(withSetPropAction)
  .views((currentQuize) => ({
    get getCurrentQuize() {
      return currentQuize
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    setCurrentQuize(currentQuize: any) {
      if (currentQuize) {
        // store.setProp("quize", currentQuize)
      } else {
        console.tron.error(`Quize can not be empty`, [])
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface OnGoingQuizeStore extends Instance<typeof OnGoingQuizeModel> {}
export interface OnGoingQuizeStoreSnapshotOut extends SnapshotOut<typeof OnGoingQuizeModel> {}
export interface OnGoingQuizeStoreSnapshotIn extends SnapshotIn<typeof OnGoingQuizeModel> {}
