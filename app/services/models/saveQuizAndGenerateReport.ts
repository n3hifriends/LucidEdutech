export type CourseSubjectQuizUserDtls = {
  courseSubjectQuizQuestionId: number
  courseSubjectQuizMultiAnsId: number
  createdBy: string
  createdDate: string
  updatedBy: string
  updatedDate: string
}

export type SaveQuizAndGenerateReportRequest = {
  courseSubjectQuizId: number
  startTime: string
  endTime: string
  courseSubjectQuizUserDtls: CourseSubjectQuizUserDtls[]
}

export type SaveQuizAndGenerateReportResponse = {
  courseSubjectQuizResultId: number
  courseSubjectQuizId: number
  userId: number
  score: number
  startTime: string
  endTime: string
  totalAttemptCount: number
  createdBy: string
  createdDate: string
  updatedBy: string
  updatedDate: string
}
