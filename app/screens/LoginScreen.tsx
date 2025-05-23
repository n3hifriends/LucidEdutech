import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, View, ViewStyle, Linking, Dimensions, Alert } from "react-native"
import {
  AutoImage,
  Button,
  Icon,
  Screen,
  Text,
  TextField,
  TextFieldAccessoryProps,
} from "../components"
import { useStores } from "../models"
import { AppStackScreenProps, navigate } from "../navigators"
import { colors, spacing } from "../theme"
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin"
import AsyncStorage from "@react-native-async-storage/async-storage"
import I18n from "i18n-js"
import { AuthenticateSnapshotIn } from "app/models/AuthenticationStore"
import { GeneralApiProblem, getGeneralApiProblem } from "app/services/api/apiProblem"
const { width, height } = Dimensions.get("window")
interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>()
  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const [signInError, setSignInError] = useState<string | undefined>(undefined)
  const [user, setUser] = useState("")
  const [isSigninInProgress, setIsSigninInProgress] = useState(false)
  const [googleAccessToken, setGoogleAccessToken] = useState("")
  const { navigation } = _props
  // const { quizeStore } = useStores()
  // github: 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
  function openLinkInBrowser(url: string) {
    Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
  }

  const {
    authenticationStore: {
      authEmail,
      setAuthEmail,
      setUsername,
      jwtToken,
      validationError,
      setFirstName,
      setLastName,
      setMobileNumber,
      login,
      signUp,
    },
  } = useStores()

  // Handle user state changes
  function onAuthStateChanged(user: string) {
    setUser(user)
  }

  useEffect(() => {
    // This need to configure in GCP as per Debug / Release configuration
    GoogleSignin.configure({
      webClientId: "6544635437-pge1mbvu2l2p6vtrbkcmanhvi639un6t.apps.googleusercontent.com",
      offlineAccess: true,
      // iosClientId: "840573394871-ejhu0tfi50jp8qj9n826oir3v6867pto.apps.googleusercontent.com",
      scopes: [
        "https://www.googleapis.com/auth/plus.login",
        "https://www.googleapis.com/auth/user.gender.read",
        "https://www.googleapis.com/auth/user.phonenumbers.read",
        "https://www.googleapis.com/auth/user.birthday.read",
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/youtube",
        "https://www.googleapis.com/auth/youtube.readonly",
      ],
    })
    // Here is where you could fetch credentials from keychain or storage
    // and pre-fill the form fields.
    // setAuthEmail("ignite@infinite.red")
    // setAuthPassword("ign1teIsAwes0m3")
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

    // Return a "cleanup" function that React will run when the component unmounts
    return () => {
      setAuthPassword("")
      // setAuthEmail("")
      setUsername("")
      // subscriber()
    }
  }, [])

  async function loadLanguage() {
    const storedLang = await AsyncStorage.getItem("language")
    console.log("🚀 ~ LoginScreen ~ storedLang:", storedLang)

    if (storedLang) {
      I18n.locale = storedLang
    }
  }

  useEffect(() => {
    loadLanguage()
  }, [])

  async function getLiveBroadcastSchedules(accessToken: string) {
    try {
      const response = await fetch(
        "https://youtube.googleapis.com/youtube/v3/liveBroadcasts?part=snippet,contentDetails,status&mine=true&broadcastType=all&key=" +
          "AIzaSyBq5-xtDH7XizJXBxJtiXmOtIFb8ljBiQA",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      const json = await response.json()
      console.log("JSON DATA", JSON.stringify(json))

      // setLiveBroadcast(json.items)
    } catch (error) {
      console.error(error)
    } finally {
      // setLoading(false)
    }
  }
  // const error = isSubmitted ? validationError : ""

  async function loginAndSignIn() {
    // if (__DEV__) {
    //   setAuthEmail("n3.hifriends@gmail.com")
    //   setUsername("mk15")
    //   setJwtToken("r3eroiuoiuerqewrer")
    //   setAuthPassword("n3.hifriends@gmail.com")
    //   setSignInError(undefined)
    //   setJwtToken(String(Date.now()))
    //   setIsSigninInProgress(false)
    // }
    try {
      setIsSigninInProgress(true)
      setSignInError(undefined)
      const hasPlayServices = await GoogleSignin.hasPlayServices()
      if (hasPlayServices === true) {
        const userInfo = await GoogleSignin.signIn()
        console.log("🚀 ~ google login ~ userInfo:", userInfo)
        const { accessToken } = await GoogleSignin.getTokens()
        console.log("accessToken ::", accessToken)
        setGoogleAccessToken(accessToken)
        // getLiveBroadcastSchedules(accessToken)

        const email = userInfo?.user?.email
        const firstName = userInfo?.user?.givenName
        const lastName = userInfo?.user?.familyName
        if (firstName) {
          setFirstName(firstName)
        }
        if (lastName) {
          setLastName(lastName)
        }
        // const mobileNumber = userInfo?.user?.phonenumbers

        // const idToken = userInfo?.idToken
        async function loginServer(email: string) {
          const response: { kind: "ok"; auth: AuthenticateSnapshotIn } | GeneralApiProblem =
            await login(email, "password")

          if (response.kind == "unauthorized") {
            setAuthEmail(email)
            navigate("Welcome")
          } else if (response.kind == "ok") {
            setAuthEmail(email)
            // setMobileNumber(mobileNumber)
            setAuthPassword("password")
            // navigate("Welcome")
          }
          setIsSigninInProgress(false)
        }
        // if (__DEV__) {
        // loginServer("shivanjalidalvi11@gmail.com")
        // } else {
        loginServer(email)
        // }
        setSignInError(undefined)
      } else {
        setSignInError("loginScreen.noService")
      }
    } catch (error: any) {
      setIsSigninInProgress(false)
      console.log("🚀 ~ login ~ error:", JSON.stringify(error))
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setSignInError("loginScreen.oops")
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setSignInError("loginScreen.getting")
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setSignInError("loginScreen.noService")
      } else {
        setSignInError("loginScreen.somethingWrong")
      }
    }

    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    // setIsSubmitted(false)
    // setAuthPassword("")

    // We'll mock this with a fake token.
    // setJwtToken(String(Date.now()))
    setIsSigninInProgress(false)
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )
  const err: any = signInError
  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />
      {/* <Text testID="login-heading" text={JSON.stringify(user)} preset="heading" style={$signIn} /> */}
      <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} />
      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}
      <GoogleSigninButton
        style={$tapButton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={loginAndSignIn}
        disabled={isSigninInProgress}
      />
      {signInError && <Text tx={err} size="sm" weight="light" style={$hint} />}
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text tx="loginScreen.termConditionPretext" preset="formLabel" style={$termCondition} />
        <Text
          tx="loginScreen.termConditionText"
          preset="formLabel"
          style={$termConditionClickable}
          onPress={() => {
            openLinkInBrowser("https://classplusapp.com/termsOfUse")
          }}
        />
      </View>
    </Screen>
  )
})

const $termCondition: TextStyle = {
  marginTop: spacing.sm,
  marginBottom: 0,
  marginLeft: spacing.xs,
  marginRight: 0,
  top: height * 0.35,
}
const $termConditionClickable: TextStyle = {
  color: colors.palette.blue,
  height: "100%",
  width: "100%",
  position: "absolute",
  top: height * 0.39,
  textAlign: "center",
}
const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xl,
  height: "100%",
  paddingHorizontal: spacing.lg,
}

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
  marginTop: "50%",
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
}

const $tapButton: ViewStyle = { alignSelf: "center", padding: 35, width: "100%" }

// @demo remove-file
