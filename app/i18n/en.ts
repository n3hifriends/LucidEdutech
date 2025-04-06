const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out", // @demo remove-current-line
    tokenNotFound: "We are experiencing some technical issues. Please try again later",
    loginAgain: "Relogin requierd",
    youtbe: "YouTube",
    followus: "Follow Us",
  },
  welcomeScreen: {
    letsGo: "Let's go!", // @demo remove-current-line
    postscript:
      "P.S. — We've got some great content coming for you soon! You can also check out our free content.",
    readyForLaunch: "Fill in your information!",
    exciting: "(Yes, I love this!)",
    emailFieldLabel: "E-mail",
    emailFieldPlaceholder: "Enter your email address",
    goNext: "Next",
    yourName: "Name",
    firstName: "First Name",
    secondName: "Second Name",
    mobileNumber: "Mobile No.",
    firstNamePlaceholder: "Enter your first name",
    secondNamePlaceholder: "Enter your last name",
    mobileNumberPlaceholder: "Enter your mobile number",
    fillAllFields: "Please fill in all fields",
    unableToProcess:
      "Currently we are unable to process your request. Please contact administration.",
    appBuildNumber: "App Build Number",
    changeLanguage: "Change Language",
  },
  profileScreen: {
    emailFieldLabel: "E-mail",
    firstName: "First Name",
    secondName: "Second Name",
    mobileNumber: "Mobile No.",
  },
  questionScreen: {
    testSeries: "Test Series",
    countDown: "CountDown",
    previous: "Previous",
    next: "next",
    submit: "Submit",
    yes: "yes",
    no: "no",
    confirm: "Confirm Submission",
    reConfirm: "Are you sure you want to submit the  test?",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle: "Oops!!! We couldn't find what you were looking for. Please try again.",
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
    referenceMaterialTab: "Material",
    subscriptionTab: "Subscriptions",
    Courses: "Courses",
    TestSeries: "Test Series",
    LiveClasses: "Live Classes",
    CurrentAffair: "Current Affairs",
    Books: "Books",
    Support: "Support",
    Download: "Download",
    Welcome: "Welcome",
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
    one: "This is a timed test; the running time is displayed on top left corner of the screen.",
    two: "The bar above the question text displays the question numbers in the current section of the test. You can move to any question by clicking on the respective number.",
    three:
      "The question screen displays the question number along with the question and respective options.",
    four: "The top right of section above the question has an option to mark the question for review. You can later view the marked question.",
    five: "You can mark or unmark any option you have chosen by tapping on the respective option.",
    six: "The bottom left corner contains the option to move to the previous question.",
    seven: "The bottom right corner contains the option to move to the next question.",
    eight:
      "You can jump between sections(if allowed by tutor) by choosing the section in bottom centre drop down.",
    nine: "You can submit the test at any point of time by clicking the Submit button on top right corner of the screen.",
    ten: "Test must be completed in one attempt. Test once submitted cannot be re-attempted or started again.",
    eleven: "You should not change or close the test screen while attempting test.",
    twelve:
      "If the app is closed or screen is changed more than three times by any means, the test will be submitted automatically.",
    thirteen:
      "After completion of test, a test summary screen will be displayed with section details & solutions.",
    fourteen: "If something goes wrong, contact your tutor and communicate the problem.",
  },
  testOverview: {
    testName: "Test Name",
    question: "Question(s)",
    duration: "Minutes",
    marks: "Marks",
    section: "Sections",
    attempt: "Attempt Test",
    accept: "Please accept terms.",
    checkbox:
      "I have read and understood the instructions. I agree that failure to follow the instructions may result in my exclusion from this test and/or disciplinary action, which may include a ban from future tests.",
  },
  score: {
    score: "Score",
    testName: "Test Name",
    question: "Question(s)",
    duration: "Hours",
    marks: "Marks",
    myscore: "is your score",
    reattempt: "Reattempt Test",
    home: "Home",
    accept: "Please accept terms.",
    totalQuestions: "Questions",
    correctAnswers: "Correct",
    wrongAnswers: "In-Correct",
    partialCorrectAnswers: "Partial Correct",
    unattemptedQuestion: "Unattempted",
  },
  examList: {
    testSeriesList: "Test Series List",
    continue: "Continue",
  },
  subscriptionList: {
    subscription: "Subscription List",
  },
  referenceMaterial: {
    references: "References",
    upcomingExams: "Upcoming Exams",
    noUpcomingExams: "No Upcoming Exams",
    referenceMaterialTxt: "Scheme of Examination",
    noExamsAvailable: "No exam available",
  },
  languageChange: {
    English: "English",
    Marathi: "Marathi",
    Hindi: "Hindi",
  },
  // @demo remove-block-end
}

export default en
export type Translations = typeof en
