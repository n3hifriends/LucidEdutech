import { api } from "./../../app/services/api"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { Alert } from "react-native"
import { GeneralApiProblem } from "app/services/api/apiProblem"
import { UserType } from "app/services/models/user"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    jwtToken: types.maybe(types.string),
    authEmail: "",
    username: "",
    firstName: "",
    lastName: "",
    mobileNumber: "",
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.jwtToken
    },
    get validationError() {
      if (store.authEmail.length === 0) return "can't be blank"
      if (store.username.length === 0) return "can't be blank"
      if (store.authEmail.length < 6) return "must be at least 6 characters"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
        return "must be a valid email address"
      return ""
    },
  }))
  .actions(withSetPropAction)
  .actions((store) => ({
    async login(
      username: string,
      password: string,
    ): Promise<{ kind: "ok"; auth: AuthenticateSnapshotIn } | GeneralApiProblem> {
      // if (__DEV__) {
      //   store.setProp("jwtToken", "response.auth.jwtToken")
      //   store.setProp("username", "response.auth.username")
      // } else {
      const response: { kind: "ok"; auth: AuthenticateSnapshotIn } | GeneralApiProblem =
        await api.login(username, password)
      console.log("🚀 ~ login ~ response:", response)
      if (response.kind != "ok") {
        return response
      }
      if (response.kind === "ok") {
        store.setProp("jwtToken", response.auth.jwtToken)
        store.setProp("username", response.auth.username)
        // store.authEmail = username
      } else {
        console.tron.error(`Error fetching authenticate: ${JSON.stringify(response)}`, [])
      }
      // }
      return response
    },
    async signUp(user: UserType): Promise<{ kind: "ok" } | GeneralApiProblem> {
      const response = await api.signUp(user)
      console.log("🚀 ~ signUp ~ response:", response)
      if (response.kind === "ok") {
        // store.authEmail = username
      } else {
        console.tron.error(`Error fetching signUp: ${JSON.stringify(response)}`, [])
      }
      // }
      return response
    },
    setJwtToken(value?: string) {
      store.jwtToken = value
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },
    setUsername(value: string) {
      store.username = value.replace(/ /g, "")
    },
    setFirstName(value: string) {
      store.firstName = value.replace(/ /g, "")
    },
    setLastName(value: string) {
      store.lastName = value.replace(/ /g, "")
    },
    setMobileNumber(value: string) {
      store.mobileNumber = value.replace(/ /g, "")
    },
    logout() {
      store.jwtToken = undefined
      store.authEmail = ""
      store.username = ""
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> {}
export interface AuthenticateSnapshotIn extends SnapshotIn<typeof AuthenticationStoreModel> {}
export const createProfileDefaultModel = () => types.optional(AuthenticationStoreModel, {})

// @demo remove-file
