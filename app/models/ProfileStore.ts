import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { api } from "./../../app/services/api"

/**
 * Model description here for TypeScript hints.
 */
export const ProfileStoreModel = types
  .model("ProfileStore")
  .props({
    userId: types.maybeNull(types.number),
    role: types.maybeNull(types.string),
    firstName: types.maybeNull(types.string),
    lastName: types.maybeNull(types.string),
    userName: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    mobileNumber: types.maybeNull(types.string),
    userPassword: types.maybeNull(types.string),
    statusId: types.maybeNull(types.string),
    createdBy: types.maybeNull(types.string),
    createdDate: types.maybeNull(types.string),
    updatedBy: types.maybeNull(types.string),
    updatedDate: types.maybeNull(types.string),
  })
  .actions(withSetPropAction)
  .views((store) => ({
    get storeUserPassword() {
      return store.userPassword
    },
    get storeFullName() {
      return `${store.firstName} ${store.lastName}`
    },
    get storeEmail() {
      return store.email
    },
    get storeUserId() {
      return store.userId
    },
    get storeRole() {
      return store.role
    },
    get storeMobileNumber() {
      return store.mobileNumber
    },
  }))
  .actions((store) => ({
    async getProfile() {
      const response = await api.getProfile()
      if (response.kind === "ok") {
        store.setProp("userId", response.profile.userId)
        store.setProp("role", response.profile.role)
        store.setProp("firstName", response.profile.firstName)
        store.setProp("lastName", response.profile.lastName)
        store.setProp("userName", response.profile.userName)
        store.setProp("email", response.profile.email)
        store.setProp("mobileNumber", response.profile.mobileNumber)
        store.setProp("userPassword", response.profile.userPassword)
        store.setProp("statusId", response.profile.statusId)
        store.setProp("createdBy", response.profile.createdBy)
        store.setProp("createdDate", response.profile.createdDate)
        store.setProp("updatedBy", response.profile.updatedBy)
        store.setProp("updatedDate", response.profile.updatedDate)
      } else {
        console.tron.error(`Error fetching profile: ${JSON.stringify(response)}`, [])
      }
    },
  }))

export interface Profile extends Instance<typeof ProfileStoreModel> {}
export interface ProfileSnapshotOut extends SnapshotOut<typeof ProfileStoreModel> {}
export interface ProfileSnapshotIn extends SnapshotIn<typeof ProfileStoreModel> {}
export const createProfileDefaultModel = () => types.optional(ProfileStoreModel, {})
