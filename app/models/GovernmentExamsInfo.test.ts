import { GovernmentExamsInfoModel } from "./GovernmentExamsInfo"

test("can be created", () => {
  const instance = GovernmentExamsInfoModel.create({})

  expect(instance).toBeTruthy()
})
