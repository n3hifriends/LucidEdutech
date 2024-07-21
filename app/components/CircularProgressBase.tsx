import React, { useState, useEffect, useRef } from "react"
import { View, Animated, Text, StyleSheet } from "react-native"
import CircularProgress from "react-native-circular-progress-indicator"
import { Question } from "app/mocks/demoQuestions"
import { spacing } from "app/theme/spacing"
import { navigate } from "app/navigators/navigationUtilities"
interface CircularProgressBarProps {
  initialProgress?: number | undefined // Progress value (0 to 1, default: 0)
  maxProgess?: number | undefined // Diameter (default: 100)
}

var myInterval: any = undefined
const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  // initialProgress = 0,
  // maxProgess = 100,
  initialProgress = 0,
  maxProgess = 100,
  // callback = () => {},
  // clearIntervalRef = undefined,
}) => {
  const [timeLeft, setTimeLeft] = useState(maxProgess)

  function handleNextQuestion() {
    setTimeout(() => {
      // callback?.()
      navigate({ name: "Score", params: undefined })
    }, 1000)
  }

  function clearIntervalRefFunction() {
    if (myInterval) {
      clearInterval(myInterval)
    }
  }

  useEffect(() => {
    // clearIntervalRef.current = clearIntervalRefFunction
    if (myInterval) {
      clearInterval(myInterval)
    }
    const partToReduce = timeLeft / 100
    const period = partToReduce * 60 * 1000 // in milisec
    myInterval = setInterval(() => {
      setTimeLeft((prevTime: number) => {
        const remTime = Math.max(prevTime - partToReduce, 0)
        if (remTime <= 0) {
          clearInterval(myInterval)
          handleNextQuestion()
        }
        // console.log("🚀 ~ setTimeLeft ~ remTime:", remTime)
        return remTime
      }) // Ensure time doesn't go below 0
    }, period) // Update every second

    return () => clearInterval(myInterval) // Cleanup function to clear interval
  }, []) // Dependency array: trigger effect only on timeLeft change

  // useEffect(() => {
  //   if (myInterval) {
  //     clearInterval(myInterval)
  //   }
  //   myInterval = setInterval(() => {
  //     setTimeLeft((prevTime: any) => {
  //       const remTime = Math.max(prevTime - 1, 0)
  //       if (remTime === 0) {
  //         // handleNextQuestion()
  //       }
  //       return remTime
  //     }) // Ensure time doesn't go below 0
  //   }, 1000) // Update every second

  //   return () => clearInterval(myInterval) // Cleanup function to clear interval
  // }, []) // Dependency array: trigger effect only on timeLeft change

  return (
    <View style={{ alignItems: "center", paddingRight: spacing.sm }}>
      <CircularProgress
        value={timeLeft}
        progressValueColor="black"
        initialValue={initialProgress}
        radius={20}
        duration={maxProgess}
        activeStrokeWidth={2}
        inActiveStrokeWidth={2}
        maxValue={maxProgess}
        title={"Min."}
        titleColor={"black"}
        titleStyle={{ fontWeight: "bold" }}
      />
    </View>
  )
}

export default CircularProgressBar
