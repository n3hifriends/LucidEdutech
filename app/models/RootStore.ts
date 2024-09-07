import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { QuizeStoreModel } from "./QuizeStore"
import { AuthenticationStoreModel } from "./AuthenticationStore" // @demo remove-current-line
import { EpisodeStoreModel } from "./EpisodeStore" // @demo remove-current-line
import { ProfileStoreModel } from "./ProfileStore"
import { OnGoingQuizeModel } from "./OnGoingQuizeStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  quizeStore: types.optional(QuizeStoreModel, {}),
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  episodeStore: types.optional(EpisodeStoreModel, {}),
  profileStore: types.optional(ProfileStoreModel, {}),
  ongoingQuizeStore: types.optional(OnGoingQuizeModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
