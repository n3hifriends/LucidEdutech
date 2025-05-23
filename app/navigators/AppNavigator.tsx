/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import { useColorScheme } from "react-native"
import * as Screens from "./../../app/screens"
import Config from "../config"
import { useStores } from "../models"
import { DemoNavigator, DemoTabParamList } from "./DemoNavigator"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "./../../app/theme"
import AsyncStorage from "@react-native-async-storage/async-storage"
import I18n from "i18n-js"
import { LanguageProvider, useLanguage } from "app/i18n/LanguageContext"
import { api } from "app/services/api"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  Login: undefined // @demo remove-current-line
  Demo: NavigatorScreenParams<DemoTabParamList> // @demo remove-current-line
  GeneralInstruction: undefined
  QuestionScreen: undefined
  // 🔥 Your screens go here
  TestOverview: undefined
  Score: undefined
  ExamList: undefined
  FollowUsScreen: undefined
  Practise: undefined
  ReferenceMaterial: undefined
  ReferencePdf: undefined
  UpcomingExams: undefined
  Subscriptions: undefined
  Language: { lastScreen: "" } // from which screen Language being called
  Courses: undefined
  LiveClasses: undefined
	CurrentAffairs: undefined
	Books: undefined
	Support: undefined
	Downloads: undefined
	// IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={isAuthenticated ? "Welcome" : "Login"}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
          <Stack.Screen name="Demo" component={DemoNavigator} />
        </>
      ) : (
        <>
          {/* <Stack.Screen name="Demo" component={DemoNavigator} /> */}
          <Stack.Screen name="Login" component={Screens.LoginScreen} />
          <Stack.Screen name="Welcome" component={Screens.WelcomeScreen} />
        </>
      )}
      {/** 🔥 Your screens go here */}
      <Stack.Screen name="LiveClasses" component={Screens.LiveClassesScreen} />
			<Stack.Screen name="CurrentAffairs" component={Screens.CurrentAffairsScreen} />
			<Stack.Screen name="Books" component={Screens.BooksScreen} />
			<Stack.Screen name="Support" component={Screens.SupportScreen} />
			<Stack.Screen name="Downloads" component={Screens.DownloadsScreen} />
			{/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
      {isAuthenticated ? (
        <>
          {/* <Stack.Screen name="Demo" component={DemoNavigator} /> */}
          <Stack.Screen name="Courses" component={Screens.CoursesScreen} />
          <Stack.Screen name="FollowUsScreen" component={Screens.FollowUsScreen} />
          <Stack.Screen name="TestOverview" component={Screens.TestOverviewScreen} />
          <Stack.Screen name="QuestionScreen" component={Screens.QuestionScreen} />
          <Stack.Screen name="Score" component={Screens.ScoreScreen} />
          <Stack.Screen name="ExamList" component={Screens.ExamListScreen} />
          <Stack.Screen name="Subscriptions" component={Screens.SubscriptionsScreen} />
          <Stack.Screen name="GeneralInstruction" component={Screens.GeneralInstructionScreen} />
          <Stack.Screen name="ReferencePdf" component={Screens.ReferencePdfScreen} />
          <Stack.Screen name="UpcomingExams" component={Screens.UpcomingExamsScreen} />
          <Stack.Screen name="Language" component={Screens.LanguageScreen} />
        </>
      ) : (
        <></>
      )}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()
  const {
    authenticationStore: { jwtToken },
  } = useStores()
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  async function loadLanguage() {
    const storedLang = await AsyncStorage.getItem("language")
    if (storedLang) {
      I18n.locale = storedLang
      api.setLanguage(storedLang) // makes default/previously set language
    }

    if (jwtToken) {
      api.setJwtToken(jwtToken)
    }
  }

  useEffect(() => {
    loadLanguage()
  }, [])

  return (
    <LanguageProvider>
      <NavigationContainer
        ref={navigationRef}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        {...props}
      >
        <AppStack />
      </NavigationContainer>
    </LanguageProvider>
  )
})
