import { Quize, QuizeModel } from "./Course"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { api } from "../services/api"
import { CourseSubjectQuize } from "./CourseSubjectQuize"
import { CourseSubjectQuizQuestion } from "./CourseSubjectQuizQuestion"

export type ScoreBoard = {
  totalTimeInMinute: number
  totalQuestion: number
  totalMarks: number
  totalAchievedMarks: number
  totalCorrectAns: number
  totalWrongAns: number
  totalAttempted: number
  totalNotAttempted: number
}

/**
 * Model description here for TypeScript hints.
 */
export const QuizeStoreModel = types
  .model("QuizeStore")
  .props({
    quize: types.array(QuizeModel),
  }) // fix: use types.model instead of types.array
  .actions(withSetPropAction)
  .views((store) => ({
    get getAllQuizes() {
      return store?.quize
    },
    get getTotalNumberQuizes() {
      return store?.quize?.length
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    async fetchQuize() {
      const response = await api.getQuize()
      console.log("🚀 ~ fetchQuize ~ response:", response)
      if (response.kind === "ok") {
        store.setProp("quize", response.quize)
      } else {
        console.tron.error(`Error fetching Quize: ${JSON.stringify(response)}`, [])
      }
      return response
    },
    attendQuestion(
      myCurrentCourseId: number,
      myCourseSubjectQuizQuestionId: number,
      isCorrect: boolean,
      userAnswer: string,
    ) {
      const courseSubjects: Quize[] = store?.quize?.filter(
        (quize) => quize?.courseId == myCurrentCourseId,
      )
      const allQuizOfCourseId: CourseSubjectQuize[] =
        courseSubjects?.[0].courseSubjects?.[0]?.courseSubjectQuiz

      allQuizOfCourseId.filter((currentQuiz: CourseSubjectQuize) =>
        currentQuiz?.courseSubjectQuizQuestion?.filter(
          (courseSubjectQuizQuestion: CourseSubjectQuizQuestion) => {
            if (
              courseSubjectQuizQuestion?.courseSubjectQuizQuestionId ==
              myCourseSubjectQuizQuestionId
            ) {
              courseSubjectQuizQuestion?.setUserAnswer(userAnswer)
              courseSubjectQuizQuestion?.setAttempted(true)
              courseSubjectQuizQuestion?.setIsCorrect(isCorrect)
              return true
            } else {
              return false
            }
          },
        ),
      )
    },
    getScoreBoard(myCurrentCourseId: number) {
      const courseSubjects: Quize[] = store?.quize.filter(
        (quize) => quize?.courseId == myCurrentCourseId,
      )
      const allQuizOfCourseId: CourseSubjectQuize[] =
        courseSubjects?.[0].courseSubjects?.[0]?.courseSubjectQuiz
      let totalTimeInMinute: number = 0
      let totalQuestion: number = 0
      let totalMarks: number = 0
      let totalAchievedMarks: number = 0
      let totalCorrectAns: number = 0
      let totalWrongAns: number = 0
      let totalAttempted: number = 0
      let totalNotAttempted: number = 0
      allQuizOfCourseId.map((currentQuiz: CourseSubjectQuize, index: number) => {
        totalTimeInMinute += Number(currentQuiz?.timeInMinute)
        totalMarks += Number(currentQuiz?.totalMarks)
        let quizes: CourseSubjectQuizQuestion[] = currentQuiz?.courseSubjectQuizQuestion
        quizes?.map((myQuiz: CourseSubjectQuizQuestion, index: number) => {
          totalQuestion += 1
          totalCorrectAns += myQuiz?.isCorrect ? 1 : 0
          totalWrongAns += myQuiz?.attempted && myQuiz?.isCorrect == false ? 1 : 0
          totalAchievedMarks += myQuiz?.isCorrect ? (myQuiz?.maxScore as number) : 0
          totalAttempted += myQuiz?.attempted ? 1 : 0
          totalNotAttempted += myQuiz?.attempted ? 0 : 1
        })
      })

      return {
        totalTimeInMinute,
        totalQuestion,
        totalMarks,
        totalAchievedMarks,
        totalCorrectAns,
        totalWrongAns,
        totalAttempted,
        totalNotAttempted,
      } as ScoreBoard
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface QuizeStore extends Instance<typeof QuizeStoreModel> {}
export interface QuizeStoreSnapshotOut extends SnapshotOut<typeof QuizeStoreModel> {}
export interface QuizeStoreSnapshotIn extends SnapshotIn<typeof QuizeStoreModel> {}
export const createQuizeStoreDefaultModel = () => types.optional(QuizeStoreModel, {})
