const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out", // @demo remove-current-line
    tokenNotFound: "We are experiencing some technical issues. Please try again later",
    loginAgain: "Relogin requierd",
  },
  welcomeScreen: {
    letsGo: "Let's go!", // @demo remove-current-line
    postscript:
      "प्स्ट  — आम्ही लवकरच छान कंटेंट आपल्यासाठी येत आहोत! तब्बल, आपण आमच्या मुक्त सामग्र्यांमध्ये देखील देखील देखू शकता.",
    readyForLaunch: "तुमची माहिती भरा!",
    exciting: "(हो, हे आवडतंय!)",
    emailFieldLabel: "ईमेल",
    emailFieldPlaceholder: "आपला ईमेल पत्ता टाका",
    goNext: "पुढे जा",
    firstName: "पहिलं नाव",
    secondName: "आडनाव",
    mobileNumber: "मोबाइल नंबर",
    firstNamePlaceholder: "आपलं पहिलं नाव टाका",
    secondNamePlaceholder: "आपलं आडनाव टाका",
    mobileNumberPlaceholder: "आपला मोबाइल नंबर टाका",
    fillAllFields: "कृपया सर्व फील्ड भरा",
  },
  profileScreen: {
    emailFieldLabel: "ई-मेल",
    firstName: "पहिलं नाव",
    secondName: "आडनाव",
    mobileNumber: "मोबाइल नंबर",
  },
  questionScreen:{
    testSeries:"Test Series",
    countDown:"CountDown",
    previous:"Previous",
    next:"next",
    submit:"Submit"
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "Invalid email address.",
  },
  loginScreen: {
    signIn: "Sign In",
    enterDetails: "Please login with your Google Account",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Enter your email address",
    passwordFieldPlaceholder: "Super secret password here",
    tapToSignIn: "Sign in!",
    termConditionPretext: "By continuing, you agree to the",
    termConditionText: "term and condition",
    hint: "Hint: you can use any email address and your favorite password :)",
    oops: "Oops!!",
    getting: "Getting singed-in!!",
    noService:
      "To continue using this app, you need to update Google Play Store/Services to the latest version.",
    somethingWrong: "Something went wrong!",
  },
  demoNavigator: {
    componentsTab: "Ongoing",
    debugTab: "Profile",
    communityTab: "Discussion",
    podcastListTab: "Announcement",
    educationTab: "Education",
  },
  demoCommunityScreen: {
    title: "Connect with your batchmates here",
    tagLine:
      "Plug in to Infinite Red's community of React Native engineers and level up your app development with us!",
    joinUsOnSlackTitle: "Join us on Slack",
    joinUsOnSlack:
      "Wish there was a place to connect with React Native engineers around the world? Join the conversation in the Infinite Red Community Slack! Our growing community is a safe space to ask questions, learn from others, and grow your network.",
    joinSlackLink: "Join the Slack Community",
    makeIgniteEvenBetterTitle: "Make Ignite even better",
    makeIgniteEvenBetter:
      "Have an idea to make Ignite even better? We're happy to hear that! We're always looking for others who want to help us build the best React Native tooling out there. Join us over on GitHub to join us in building the future of Ignite.",
    contributeToIgniteLink: "Contribute to Ignite",
    theLatestInReactNativeTitle: "The latest in React Native",
    theLatestInReactNative: "We're here to keep you current on all React Native has to offer.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "Hire Infinite Red for your next project",
    hireUs:
      "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
    hireUsLink: "Send us a message",
  },
  homeScreen: {
    jumpStart: "You are on the Ongoing page",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "Via `tx` Prop",
    demoViaSpecifiedTxProp: "Via `{{prop}}Tx` Prop",
  },
  demoDebugScreen: {
    howTo: "HOW TO",
    title: "Profile",
    tagLine:
      "Congratulations, you've got a very advanced React Native app template here.  Take advantage of this boilerplate!",
    reactotron: "Send to Reactotron",
    reportBugs: "Report Bugs",
    demoList: "Demo List",
    demoPodcastList: "Demo Podcast List",
    androidReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload the app.",
    iosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    macosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    webReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    windowsReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
  },
  demoPodcastListScreen: {
    title: "Here all class announcement and notification comes",
    onlyFavorites: "Only Show Favorites",
    favoriteButton: "Favorite",
    unfavoriteButton: "Unfavorite",
    accessibility: {
      cardHint:
        "Double tap to listen to the episode. Double tap and hold to {{action}} this episode.",
      switch: "Switch on to only show favorites",
      favoriteAction: "Toggle Favorite",
      favoriteIcon: "Episode not favorited",
      unfavoriteIcon: "Episode favorited",
      publishLabel: "Published {{date}}",
      durationLabel: "Duration: {{hours}} hours {{minutes}} minutes {{seconds}} seconds",
    },
    noFavoritesEmptyState: {
      heading: "This looks a bit empty",
      content:
        "No favorites have been added yet. Tap the heart on an episode to add it to your favorites!",
    },
  },
  generalInstruction: {
    generalInstructionTitle: "General Instruction",
    continue: "Continue",
  },
  testOverview: {
    testName: "Test Name",
    question: "Question(s)",
    duration: "Hours",
    marks: "Marks",
    section: "Sections",
    attempt: "Attempt Test",
    accept: "Please accept terms.",
  },
  score: {
    score: "Score",
    testName: "Test Name",
    question: "Question(s)",
    duration: "Hours",
    marks: "Marks",
    myscore: "is your score",
    reattempt: "Reattempt Test",
    accept: "Please accept terms.",
  },
  examList: {
    testSeriesList: "Test Series List",
    continue: "सुरू ठेवा",
  },
  // @demo remove-block-end
}

export default en
export type Translations = typeof en
