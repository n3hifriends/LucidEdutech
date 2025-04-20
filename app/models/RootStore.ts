import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { SubscriptionStoreModel } from "./SubscriptionStore"
import { QuizeStoreModel } from "./QuizeStore"
import { AuthenticationStoreModel } from "./AuthenticationStore" // @demo remove-current-line
import { EpisodeStoreModel } from "./EpisodeStore" // @demo remove-current-line
import { ProfileStoreModel } from "./ProfileStore"
import { OnGoingQuizeModel } from "./OnGoingQuizeStore"
import { AllGovermentExamsModel } from "./AllGovermentExams"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  subscriptionStore: types.optional(SubscriptionStoreModel, {} as any),
  quizeStore: types.optional(QuizeStoreModel, {}),
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  episodeStore: types.optional(EpisodeStoreModel, {}),
  profileStore: types.optional(ProfileStoreModel, {}),
  ongoingQuizeStore: types.optional(OnGoingQuizeModel, {}),
  govermentExamsStore: types.optional(AllGovermentExamsModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
