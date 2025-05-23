import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useRef, useState } from "react"
import { ImageStyle, TextInput, TextStyle, View, ViewStyle } from "react-native"
import {
  Button,
  Screen, // @demo remove-current-line
  Text,
  TextField,
} from "../components"
import { isRTL } from "../i18n"
import { useStores } from "../models" // @demo remove-current-line
import { AppStackScreenProps, navigate } from "../navigators" // @demo remove-current-line
import { colors, spacing } from "../theme"
import { useHeader } from "../utils/useHeader" // @demo remove-current-line
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { useNavigation } from "@react-navigation/native"
import { $nonEmptyObject } from "mobx-state-tree/dist/internal"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "app/services/api"
import { UserType, RoleType } from "app/services/models/user"
import { AuthenticateSnapshotIn } from "app/models/AuthenticationStore"
import { GeneralApiProblem } from "app/services/api/apiProblem"

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const {
    authenticationStore: {
      logout,
      jwtToken,
      isAuthenticated,
      authEmail,
      firstName,
      lastName,
      mobileNumber,
      setFirstName,
      setLastName,
      setMobileNumber,
      login,
      signUp,
    },
    // quizeStore: { fetchQuize, getAllQuizes },
    // profileStore: { getProfile, userPassword },
  } = useStores()
  const [myFirstName, setMyFirstName] = useState(firstName)
  const lastNameRef = useRef<TextInput>(null)
  const [myLastName, setMyLastName] = useState(lastName)
  const [myMobileNumber, setMyMobileNumber] = useState(mobileNumber)
  const mobileNoRef = useRef<TextInput>(null)
  const { navigation } = _props
  const [signInError, setSignInError] = useState<string | undefined>(undefined)

  async function goNext() {
    if (
      myFirstName.length === 0 ||
      myLastName.length === 0 ||
      myMobileNumber.length === 0 ||
      authEmail.length === 0
    ) {
      setSignInError("welcomeScreen.fillAllFields")
      return
    }

    if (isAuthenticated) {
      setSignInError(undefined)
      setFirstName(myFirstName)
      setLastName(myLastName)
      setMobileNumber(myMobileNumber)

      const storedLang = await AsyncStorage.getItem("language")
      if (storedLang) {
        navigation.navigate("Demo", { screen: "Home", params: {} })
      } else {
        navigate("Language", { lastScreen: "Login" })
      }
    } else {
      // Create New User
      const user: UserType = {
        firstName: myFirstName,
        lastName: myLastName,
        email: authEmail,
        mobileNumber: myMobileNumber,
        userName: myMobileNumber,
        role: "student",
        userPassword: "password",
        statusId: "ACTIVE",
      }
      const response = await signUp(user)
      if (response.kind == "ok") {
        const loginResponse: { kind: "ok"; auth: AuthenticateSnapshotIn } | GeneralApiProblem =
          await login(authEmail, user.userPassword)
        if (loginResponse.kind == "ok") {
          // navigation.pop()
          navigate("Demo", { screen: "Home" })
        } else {
          setSignInError("welcomeScreen.fillAllFields")
        }
      }
    }
  }

  // if (isAuthenticated) {
  useHeader(
    {
      rightTx: "common.logOut",
      onRightPress: () => {
        // navigation.pop()
        logout()
        setTimeout(() => {
          navigate("Login")
        }, 100)
      },
    },
    [logout],
  )
  // }

  function setMyMobileNumberWithLimit(value: string) {
    const maxLength = 10
    if (value.length <= maxLength) {
      setMyMobileNumber(value)
    }
  }

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  // const error = "Fill your details to continue"
  const error = undefined
  const err: any = signInError
  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
      <View style={$topContainer}>
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.readyForLaunch"
          preset="heading"
        />

        <TextField
          status="disabled"
          value={authEmail}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          keyboardType="default"
          labelTx="welcomeScreen.emailFieldLabel"
          placeholderTx="welcomeScreen.emailFieldPlaceholder"
          helper={error}
          onSubmitEditing={() => lastNameRef.current?.focus()}
        />

        <TextField
          value={myFirstName}
          onChangeText={setMyFirstName}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          keyboardType="default"
          labelTx="welcomeScreen.firstName"
          placeholderTx="welcomeScreen.firstNamePlaceholder"
          helper={error}
          status={error ? "error" : undefined}
          onSubmitEditing={() => lastNameRef.current?.focus()}
        />
        <TextField
          ref={lastNameRef}
          value={myLastName}
          onChangeText={setMyLastName}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          keyboardType="default"
          labelTx="welcomeScreen.secondName"
          placeholderTx="welcomeScreen.secondNamePlaceholder"
          helper={error}
          status={error ? "error" : undefined}
          onSubmitEditing={() => mobileNoRef.current?.focus()}
        />
        <TextField
          ref={mobileNoRef}
          value={myMobileNumber}
          onChangeText={setMyMobileNumberWithLimit}
          containerStyle={$textField}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          keyboardType="number-pad"
          labelTx="welcomeScreen.mobileNumber"
          placeholderTx="welcomeScreen.mobileNumberPlaceholder"
          helper={error}
          status={error ? "error" : undefined}
        />
      </View>
      {signInError && <Text tx={err} size="sm" weight="light" style={$hint} />}

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Button
          testID="next-screen-button"
          preset="reversed"
          tx="welcomeScreen.goNext"
          onPress={goNext}
        />
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  paddingBottom: spacing.sm,
  paddingHorizontal: spacing.lg,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "90%",
  paddingHorizontal: spacing.sm,
}

const $bottomContainer: ViewStyle = {
  flexBasis: "10%",
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
  marginBottom: spacing.xl,
}
const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.xxl,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}
