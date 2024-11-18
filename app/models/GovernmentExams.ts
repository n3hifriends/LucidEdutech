import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { GovernmentExamsInfoModel } from "./GovernmentExamsInfo"

/**
 * Model description here for TypeScript hints.
 */

export const GovernmentExamsProps = {
  eventId: types.maybeNull(types.number), // Corresponds to event_id
  eventName: types.maybeNull(types.string), // Corresponds to event_name
  eventDescription: types.maybeNull(types.string), // Corresponds to event_description
  eventLink: types.maybeNull(types.string), // Corresponds to event_link
  startDate: types.maybeNull(types.string), // Needs conversion from Date
  endDate: types.maybeNull(types.string), // Needs conversion from Date
  createdBy: types.maybeNull(types.string), // Corresponds to created_by
  createdDate: types.maybeNull(types.Date), // Needs conversion from Timestamp
  updatedBy: types.maybeNull(types.string), // Corresponds to updated_by
  updatedDate: types.maybeNull(types.Date), // Needs conversion from Timestamp
  eventInfo: types.array(GovernmentExamsInfoModel),
  isUpcoming: types.boolean,
}

export const GovernmentExamsModel = types
  .model("GovernmentExams")
  .props(GovernmentExamsProps)
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface GovernmentExams extends Instance<typeof GovernmentExamsModel> {}
export interface GovernmentExamsSnapshotOut extends SnapshotOut<typeof GovernmentExamsModel> {}
export interface GovernmentExamsSnapshotIn extends SnapshotIn<typeof GovernmentExamsModel> {}
export const createGovernmentExamsDefaultModel = () => types.optional(GovernmentExamsModel, {})
