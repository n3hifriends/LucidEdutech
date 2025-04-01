export type AnsAndId = {
  answer: string
  answerId: number
}

export type Question = {
  index: number
  countdown: number
  title: string
  referenceUrl: string | undefined
  referenceImageUrl: string | undefined
  ansArr: AnsAndId[]
  correctAns: string
  attemptTimestamp: number | undefined
  attempted: boolean
  isCorrect: boolean
  userAnswer: string
  maxScore: number
  answerExplanation: string
  courseSubjectQuizQuestionId: number
  attemptedCourseSubjectQuizMultiAnsId: number
}
export let initialQuestion: Question = {
  index: 0,
  countdown: 100,
  title: "Loading...",
  referenceUrl: undefined,
  referenceImageUrl: undefined,
  ansArr: [],
  correctAns: "",
  attemptTimestamp: undefined,
  attempted: false,
  isCorrect: false,
  userAnswer: "",
  maxScore: 0,
  answerExplanation: "",
  courseSubjectQuizQuestionId: 0,
  attemptedCourseSubjectQuizMultiAnsId: 0,
}
export const QuestionObject = {
  totalTime: 2, // min
  isSurpriseTest: false,
}
export var mockQuestions: Question[] = [
  {
    index: 0,
    countdown: 100,
    title:
      "Who is the first programmer of the World? If the question contains image then question text size will be reduced to this level. Also the image being displayed to right side is coming from Nitin's Google Drive.",
    referenceUrl: undefined,
    referenceImageUrl:
      "https://drive.google.com/uc?export=view&id=14zQPC4_-NeAUVAgvNsAu3OptpR4SBxXM",
    ansArr: [
      { answer: "Ada Lovelace", answerId: 0 },
      { answer: "Charles Babbage", answerId: 0 },
      { answer: "K. Giloi", answerId: 0 },
      { answer: "Raúl Rojas", answerId: 0 },
    ],
    correctAns: "Ada Lovelace",
    attemptTimestamp: undefined,
    attempted: false,
    isCorrect: false,
    userAnswer: "",
    maxScore: 10,
    answerExplanation: "hey",
    courseSubjectQuizQuestionId: 0,
    attemptedCourseSubjectQuizMultiAnsId: 0,
  },
]
