import {
  CourseSubjectQuize,
  CourseSubjectQuizMultiAnswerModel,
  CourseSubjectQuizQuestion,
  GovernmentExams,
  QuizeStore,
  SubscriptionSnapshotIn,
} from "./../../../app/models"
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
import { UserType } from "../models/user"
import {
  SaveQuizAndGenerateReportResponse,
  SaveQuizAndGenerateReportRequest,
  CourseSubjectQuizUserDtls,
} from "../models/saveQuizAndGenerateReport"
import { Alert } from "react-native"

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
        languageCode: "en",
      },
    })
  }

  setJwtToken(jwtToken?: string) {
    this.apisauce.setHeader("Authorization", `Bearer ${jwtToken}`)
  }

  // Function to update language header dynamically
  setLanguage(languageCode: string) {
    this.apisauce.setHeader("languageCode", languageCode)
  }

  async getQuize(): Promise<{ kind: "ok"; quize: QuizeStore[] } | GeneralApiProblem> {
    const response = await this.apisauce.get("/course", {
      username: "ketan@gmail.com",
      password: "password",
    })
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      const rawData = response.data
      const quize: QuizeStore[] = rawData as QuizeStore[]
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
    const response = await this.apisauce.get("/userDetails")
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

  async fetchGovermentExamList(): Promise<
    { kind: "ok"; exams: GovernmentExams[] } | GeneralApiProblem
  > {
    const response = await this.apisauce.get("/event")
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    try {
      const rawData = response.data
      const govermentExams: GovernmentExams[] = rawData as GovernmentExams[]
      console.log("🚀 ~ Api ~ fetchGovermentExamList:", govermentExams)
      return { kind: "ok", exams: govermentExams }
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

  async signUp(user: UserType): Promise<{ kind: "ok" } | GeneralApiProblem> {
    const response = await this.apisauce.post("/user", user)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data
      console.log("🚀 ~ Api ~ signUp :", rawData)
      return { kind: "ok" }
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

  async saveQuizAndGenerateReport(
    quiz: CourseSubjectQuize[],
  ): Promise<{ kind: "ok"; quiz: SaveQuizAndGenerateReportResponse } | GeneralApiProblem> {
    const questions: CourseSubjectQuizUserDtls[] = []

    var myCourseSubjectQuizId: number | null = 0

    quiz.map((currentQuiz: CourseSubjectQuize, index: number) => {
      myCourseSubjectQuizId = currentQuiz?.courseSubjectQuizId
      let quizes: CourseSubjectQuizQuestion[] = currentQuiz?.courseSubjectQuizQuestion
      quizes?.map((myQuiz: CourseSubjectQuizQuestion, index: number) => {
        var courseSubjectQuizQuestionId: number | null = 0
        var courseSubjectQuizMultiAnsId: number | null = 0
        if (myQuiz?.attempted) {
          courseSubjectQuizMultiAnsId = myQuiz?.attemptedCourseSubjectQuizMultiAnsId
          const questoinObj = myQuiz?.courseSubjectQuizMultiAnswer?.filter(
            (multiAns, index) =>
              myQuiz?.attemptedCourseSubjectQuizMultiAnsId == multiAns?.courseSubjectQuizMultiAnsId,
          )
          const myCourseSubjectQuizQuestionId = questoinObj[0]?.courseSubjectQuizQuestionId
          if (myCourseSubjectQuizQuestionId) {
            courseSubjectQuizQuestionId = myCourseSubjectQuizQuestionId
          } else {
            courseSubjectQuizQuestionId = -1
          }
          questions.push({
            courseSubjectQuizQuestionId: courseSubjectQuizQuestionId as number,
            courseSubjectQuizMultiAnsId: courseSubjectQuizMultiAnsId as number,
            createdBy: "",
            createdDate: "",
            updatedBy: "",
            updatedDate: "",
          })
        }
      })
    })

    const attemptedQuiz: SaveQuizAndGenerateReportRequest = {
      courseSubjectQuizId: myCourseSubjectQuizId,
      startTime: "",
      endTime: "",
      courseSubjectQuizUserDtls: questions,
    }

    const response = await this.apisauce.post("/saveQuizAndGenerateReport", attemptedQuiz)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const quizResult: SaveQuizAndGenerateReportResponse =
        response.data as SaveQuizAndGenerateReportResponse
      console.log("🚀 ~ Api ~ saveQuizAndGenerateReport :", quizResult)

      return { kind: "ok", quiz: quizResult }
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

  async getSubscriptions(): Promise<
    { kind: "ok"; subscription: SubscriptionSnapshotIn[] } | GeneralApiProblem
  > {
    const response = await this.apisauce.get("/subscription")
    console.log("🚀 ~ Api ~ getSubscriptions ~ response:", response)
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {
      const rawData = response.data as any[]
      const subscription: SubscriptionSnapshotIn[] = rawData as SubscriptionSnapshotIn[]
      return { kind: "ok", subscription }
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
}

// Singleton instance of the API for convenience
export const api = new Api()
