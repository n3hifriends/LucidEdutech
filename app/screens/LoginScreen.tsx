import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, TextStyle, View, ViewStyle, Linking, Dimensions } from "react-native"
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
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin"
import { api } from "app/services/api"
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

  // const { quizeStore } = useStores()

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
    },
  } = useStores()

  // Handle user state changes
  function onAuthStateChanged(user: string) {
    setUser(user)
  }

  useEffect(() => {
    // This need to configure in GCP as per Debug / Release configuration
    GoogleSignin.configure({
      webClientId: "1027729156446-rl67ttisfc4j3j76dr5b5v65eiqnj66o.apps.googleusercontent.com",
      offlineAccess: true,
      // iosClientId: "840573394871-ejhu0tfi50jp8qj9n826oir3v6867pto.apps.googleusercontent.com",
      scopes: [
        "https://www.googleapis.com/auth/plus.login",
        "https://www.googleapis.com/auth/user.gender.read",
        "https://www.googleapis.com/auth/user.phonenumbers.read",
        "https://www.googleapis.com/auth/user.birthday.read",
        "https://www.googleapis.com/auth/userinfo.profile",
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
        const email = userInfo?.user?.email
        const firstName = userInfo?.user?.givenName
        const lastName = userInfo?.user?.familyName
        // const mobileNumber = userInfo?.user?.phonenumbers

        // const idToken = userInfo?.idToken
        async function loginServer(email: string) {
          await login(email, "password")
          api.setJwtToken(jwtToken)
          setAuthEmail(email)
          if (firstName) {
            setFirstName(firstName)
          }
          if (lastName) {
            setLastName(lastName)
          }
          // setMobileNumber(mobileNumber)
          setAuthPassword("password")
        }
        if (__DEV__) {
          loginServer("ketan@gmail.com")
        } else {
          loginServer(email)
        }
        setSignInError(undefined)
      } else {
        setSignInError("loginScreen.noService")
      }
    } catch (error: any) {
      setIsSigninInProgress(false)
      console.log("🚀 ~ login ~ error:", error)
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
