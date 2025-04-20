import { SubscriptionStoreModel } from "./SubscriptionStore"

test("can be created", () => {
  const instance = SubscriptionStoreModel.create({})

  expect(instance).toBeTruthy()
})
