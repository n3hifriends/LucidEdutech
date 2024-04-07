import { QuizeModel } from "./Quize"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { api } from "../services/api"

/**
 * Model description here for TypeScript hints.
 */
export const QuizeStoreModel = types
  .model("QuizeStore")
  .props({
    quize: types.array(QuizeModel),
  }) // fix: use types.model instead of types.array
  .actions(withSetPropAction)
  .views((store) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    async fetchQuize() {
      const response = await api.getQuize()
      console.log("🚀 ~ fetchQuize ~ response:", response)
      if (response.kind === "ok") {
        store.setProp("quize", response.quize.quize)
      } else {
        console.tron.error(`Error fetching episodes: ${JSON.stringify(response)}`, [])
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface QuizeStore extends Instance<typeof QuizeStoreModel> {}
export interface QuizeStoreSnapshotOut extends SnapshotOut<typeof QuizeStoreModel> {}
export interface QuizeStoreSnapshotIn extends SnapshotIn<typeof QuizeStoreModel> {}
export const createQuizeStoreDefaultModel = () => types.optional(QuizeStoreModel, {})
