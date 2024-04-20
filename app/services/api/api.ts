import { QuizeStoreSnapshotIn } from "./../../../app/models"
/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import {
  ApiResponse, // @demo remove-current-line
  ApisauceInstance,
  create,
} from "apisauce"
import Config from "../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem" // @demo remove-current-line
import type {
  ApiConfig,
  ApiFeedResponse, // @demo remove-current-line
} from "./api.types"
import type { EpisodeSnapshotIn } from "../../models/Episode" // @demo remove-current-line
import { AuthenticateSnapshotIn } from "./../../../app/models/AuthenticationStore"
import { ProfileSnapshotIn } from "./../../../app/models"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  setJwtToken(jwtToken?: string) {
    this.apisauce.setHeader("Authorization", `Bearer ${jwtToken}`)
  }

  async getQuize(): Promise<{ kind: "ok"; quize: QuizeStoreSnapshotIn } | GeneralApiProblem> {
    const response = await this.apisauce.get("/quize")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      const rawData = response.data
      const quize: QuizeStoreSnapshotIn = rawData as QuizeStoreSnapshotIn
      return { kind: "ok", quize: quize }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(
          `Bad data: ${(e as Error).message}\n${response.data}`,
          (e as Error).stack,
        )
      }
      return { kind: "bad-data" }
    }
  }

  async getProfile(): Promise<{ kind: "ok"; profile: ProfileSnapshotIn } | GeneralApiProblem> {
    const response = await this.apisauce.get("/user")
    console.log("🚀 ~ Api ~ getProfile ~ response:", response)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = (response.data as any[])[0]
      const profile: ProfileSnapshotIn = rawData as ProfileSnapshotIn
      return { kind: "ok", profile }
    } catch (e) {
      // Explicitly type 'e' as an error object
      if (__DEV__) {
        console.tron.error(
          `Bad data: ${(e as Error).message}\n${response.data}`,
          (e as Error).stack,
        ) // Cast 'e' as Error to access 'message' and 'stack' properties
      }
      return { kind: "bad-data" }
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ kind: "ok"; auth: AuthenticateSnapshotIn } | GeneralApiProblem> {
    const response = await this.apisauce.post("/authenticate", {
      username: email,
      password: password,
    })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data
      const auth: AuthenticateSnapshotIn = rawData as AuthenticateSnapshotIn
      this.setJwtToken(auth.jwtToken)
      return { kind: "ok", auth }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(
          `Bad data: ${(e as Error).message}\n${response.data}`,
          (e as Error).stack,
        )
      }
      return { kind: "bad-data" }
    }
  }
  // @demo remove-block-start
  /**
   * Gets a list of recent React Native Radio episodes.
   */
  async getEpisodes(): Promise<{ kind: "ok"; episodes: EpisodeSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(
      `api.json?rss_url=https%3A%2F%2Ffeeds.simplecast.com%2FhEI_f9Dx`,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      // This is where we transform the data into the shape we expect for our MST model.
      const episodes: EpisodeSnapshotIn[] =
        rawData?.items.map((raw) => ({
          ...raw,
        })) ?? []

      return { kind: "ok", episodes }
    } catch (e) {
      if (__DEV__ && e instanceof Error) {
        console.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
