import React, { useState, useEffect, useRef } from "react"
import { View, Animated, Text, StyleSheet } from "react-native"
import CircularProgress from "react-native-circular-progress-indicator"
import { Question } from "app/mocks/demoQuestions"
interface CircularProgressBarProps {
  initialProgress?: number // Progress value (0 to 1, default: 0)
  maxProgess?: number // Diameter (default: 100)
}

var myInterval: any = undefined
const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  initialProgress = 0,
  maxProgess = 100,
}) => {
  const [timeLeft, setTimeLeft] = useState(maxProgess)

  useEffect(() => {
    if (myInterval) {
      clearInterval(myInterval)
    }
    myInterval = setInterval(() => {
      setTimeLeft((prevTime: any) => {
        const remTime = Math.max(prevTime - 1, 0)
        if (remTime === 0) {
          // handleNextQuestion()
        }
        return remTime
      }) // Ensure time doesn't go below 0
    }, 1000) // Update every second

    return () => clearInterval(myInterval) // Cleanup function to clear interval
  }, []) // Dependency array: trigger effect only on timeLeft change

  return (
    <View style={{ alignItems: "center" }}>
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
