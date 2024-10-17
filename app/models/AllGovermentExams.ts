import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { GovernmentExamsModel } from "./GovernmentExams"
import { api } from "app/services/api"

/**
 * Model description here for TypeScript hints.
 */
export const AllGovermentExamsModel = types
  .model("AllGovermentExams")
  .props({
    exams: types.array(GovernmentExamsModel),
  })
  .actions(withSetPropAction)
  .views((store) => ({
    get allExams() {
      return store?.exams
    },
    get upcomingExams() {
      return store?.exams?.filter((exam) => {
        return exam?.startDate != undefined
      })
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    async fetchGovermentExamList() {
      const response = await api.fetchGovermentExamList()
      console.log("🚀 ~ fetchGovermentExamList ~ response:", response)
      if (response.kind === "ok") {
        store.setProp("exams", response?.exams)
      } else {
        console.tron.error(`Error fetching GovermentExamList: ${JSON.stringify(response)}`, [])
      }
      return response
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface AllGovermentExams extends Instance<typeof AllGovermentExamsModel> {}
export interface AllGovermentExamsSnapshotOut extends SnapshotOut<typeof AllGovermentExamsModel> {}
export interface AllGovermentExamsSnapshotIn extends SnapshotIn<typeof AllGovermentExamsModel> {}
export const createAllGovermentExamsDefaultModel = () => types.optional(AllGovermentExamsModel, {})
