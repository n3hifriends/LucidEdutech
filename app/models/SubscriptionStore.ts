import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { SubscriptionModel, SubscriptionSnapshotIn } from "./Subscription"
import { api } from "app/services/api"
import { GeneralApiProblem } from "app/services/api/apiProblem"

/**
 * Model description here for TypeScript hints.
 */
export const SubscriptionStoreModel = types
  .model("SubscriptionStore")
  .props({
    suscription: types.array(SubscriptionModel),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    get getAllSubscriptions() {
      return self?.suscription
    },
    get getTotalNumberSubscriptions() {
      return self?.suscription?.length
    },
    get getSubscriptionById() {
      return (subscriptionId: number) => {
        return self?.suscription?.find(
          (subscription) => subscription?.subscriptionContentId == subscriptionId,
        )
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    async fetchSubscription() {
      // Simulate an API call
      const response: { kind: "ok"; subscription: SubscriptionSnapshotIn[] } | GeneralApiProblem =
        await api.getSubscriptions()
      console.log("🚀 ~ getSubscriptions ~ response:", response)
      if (response.kind === "ok") {
        self.setProp("suscription", response.subscription)
      } else {
        console.tron.error(`Error fetching Subscription: ${JSON.stringify(response)}`, [])
      }
      return response
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface SubscriptionStore extends Instance<typeof SubscriptionStoreModel> {}
export interface SubscriptionStoreSnapshotOut extends SnapshotOut<typeof SubscriptionStoreModel> {}
export interface SubscriptionStoreSnapshotIn extends SnapshotIn<typeof SubscriptionStoreModel> {}
export const createSubscriptionStoreDefaultModel = () => types.optional(SubscriptionStoreModel, {})
