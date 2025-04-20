import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const SubscriptionModelProps = {
  subscriptionContentId: types.maybeNull(types.number),
  subscriptionName: types.maybeNull(types.string),
  subscriptionDescription: types.maybeNull(types.string),
  subscription_link: types.maybeNull(types.string),
  startDate: types.maybeNull(types.string),
  endDate: types.maybeNull(types.string),
  isPaid: types.maybeNull(types.boolean),
  createdBy: types.maybeNull(types.string),
  createdDate: types.maybeNull(types.string),
  updatedBy: types.maybeNull(types.string),
  updatedDate: types.maybeNull(types.string),
}

export const SubscriptionModel = types
  .model("Subscription")
  .props(SubscriptionModelProps)
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Subscription extends Instance<typeof SubscriptionModel> {}
export interface SubscriptionSnapshotOut extends SnapshotOut<typeof SubscriptionModel> {}
export interface SubscriptionSnapshotIn extends SnapshotIn<typeof SubscriptionModel> {}
export const createSubscriptionDefaultModel = () => types.optional(SubscriptionModel, {})
