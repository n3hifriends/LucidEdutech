import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { QuizeStoreModel } from "./QuizeStore"
import { AuthenticationStoreModel } from "./AuthenticationStore" // @demo remove-current-line
import { EpisodeStoreModel } from "./EpisodeStore" // @demo remove-current-line
import { ProfileStoreModel } from "./ProfileStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  quizeStore: types.optional(QuizeStoreModel, {} as any),
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  episodeStore: types.optional(EpisodeStoreModel, {}),
  profileStore: types.optional(ProfileStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
