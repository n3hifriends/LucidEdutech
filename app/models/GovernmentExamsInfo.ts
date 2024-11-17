import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const GovernmentExamsInfoModelProps = {
  eventInfoId: types.maybeNull(types.number), // Corresponds to event_info_id
  eventId: types.maybeNull(types.number), // Corresponds to event_id
  eventInfoName: types.maybeNull(types.string), // Corresponds to event_info_name
  eventInfoDescription: types.maybeNull(types.string), // Corresponds to event_info_description
  eventInfoLink: types.maybeNull(types.string), // Corresponds to event_info_link
  startDate: types.maybeNull(types.string), // Needs conversion from Date
  endDate: types.maybeNull(types.string), // Needs conversion from Date
  createdBy: types.maybeNull(types.string), // Corresponds to created_by
  createdDate: types.maybeNull(types.Date), // Needs conversion from Timestamp
  updatedBy: types.maybeNull(types.string), // Corresponds to updated_by
  updatedDate: types.maybeNull(types.Date), // Needs conversion from Timestamp
}
export const GovernmentExamsInfoModel = types
  .model("GovernmentExamsInfo")
  .props(GovernmentExamsInfoModelProps)
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface GovernmentExamsInfo extends Instance<typeof GovernmentExamsInfoModel> {}
export interface GovernmentExamsInfoSnapshotOut
  extends SnapshotOut<typeof GovernmentExamsInfoModel> {}
export interface GovernmentExamsInfoSnapshotIn
  extends SnapshotIn<typeof GovernmentExamsInfoModel> {}
export const createGovernmentExamsInfoDefaultModel = () =>
  types.optional(GovernmentExamsInfoModel, {})
