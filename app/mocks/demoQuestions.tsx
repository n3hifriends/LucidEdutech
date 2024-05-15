export type Question = {
  index: number
  countdown: number
  title: string
  referenceUrl: string | undefined
  referenceImageUrl: string | undefined
  ansArr: string[]
  correctAns: string
  attemptTimestamp: number | undefined
  attempted: boolean
  isCorrect: boolean
  maxScore: number
}

export var mockQuestions: Question[] = [
  {
    index: 0,
    countdown: 3,
    title:
      "Who is the first programmer of the World? If the question contains image then question text size will be reduced to this level. Also the image being displayed to right side is coming from Nitin's Google Drive.",
    referenceUrl: undefined,
    referenceImageUrl:
      "https://drive.google.com/uc?export=view&id=14zQPC4_-NeAUVAgvNsAu3OptpR4SBxXM",
    ansArr: ["Ada Lovelace", "Charles Babbage", "K. Giloi", "Raúl Rojas"],
    correctAns: "Ada Lovelace",
    attemptTimestamp: undefined,
    attempted: false,
    isCorrect: false,
    maxScore: 10,
  },
  {
    index: 1,
    countdown: 3,
    title:
      " 1 Who is the first programmer of the World? If the question contains image then question text size will be reduced to this level. Also the image being displayed to right side is coming from Nitin's Google Drive.",
    referenceUrl: undefined,
    referenceImageUrl:
      "https://drive.google.com/uc?export=view&id=14zQPC4_-NeAUVAgvNsAu3OptpR4SBxXM",
    ansArr: ["1 Ada Lovelace", "Charles Babbage", "K. Giloi", "Raúl Rojas"],
    correctAns: "Charles Babbage",
    attemptTimestamp: undefined,
    attempted: false,
    isCorrect: false,
    maxScore: 10,
  },
  {
    index: 2,
    countdown: 5,
    title:
      " 2 Who is the first programmer of the World? If the question contains image then question text size will be reduced to this level. Also the image being displayed to right side is coming from Nitin's Google Drive.",
    referenceUrl: undefined,
    referenceImageUrl:
      "https://drive.google.com/uc?export=view&id=14zQPC4_-NeAUVAgvNsAu3OptpR4SBxXM",
    ansArr: ["2 Ada Lovelace", " 2 Charles Babbage", "K. Giloi", "Raúl Rojas"],
    correctAns: "Raúl Rojas",
    attemptTimestamp: undefined,
    attempted: false,
    isCorrect: false,
    maxScore: 40,
  },
]
