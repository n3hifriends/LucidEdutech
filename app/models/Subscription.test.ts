import { SubscriptionModel } from "./Subscription"

test("can be created", () => {
  const instance = SubscriptionModel.create({})

  expect(instance).toBeTruthy()
})
