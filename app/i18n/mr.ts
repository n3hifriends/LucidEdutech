const mr = {
  common: {
    ok: "ठीक आहे!",
    cancel: "रद्द करा",
    back: "परत",
    logOut: "बाहेर पडा", // @demo remove-current-line
    tokenNotFound: "आम्हाला काही तांत्रिक अडचणी येत आहेत. कृपया पुन्हा प्रयत्न करा.",
    loginAgain: "पुन्हा लॉगिन करा.",
    youtbe: "यूट्यूब",
    followus: "फॉलो करा",
  },
  welcomeScreen: {
    postscript:
      "प्स्ट  — आम्ही लवकरच छान कंटेंट आपल्यासाठी येत आहोत! तब्बल, आपण आमच्या मुक्त सामग्र्यांमध्ये देखील देखील देखू शकता.",
    readyForLaunch: "तुमची माहिती भरा!",
    exciting: "(हो, हे आवडतंय!)",
    emailFieldLabel: "ई-मेल",
    emailFieldPlaceholder: "आपला ईमेल पत्ता टाका",
    goNext: "पुढे जा",
    yourName: "नाव",
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
  questionScreen: {
    testSeries: "टेस्ट सीरीज",
    countDown: "काउंटडाउन",
    previous: "मागील",
    next: "पुढे जा",
    submit: "सबमिट",
    yes: "होय",
    no: "नाही",
  },
  errorScreen: {
    title: "काहीतरी चुकलं!",
    friendlySubtitle:
      "हे एक तुमच्या वापरकर्त्यांना उत्पन्न होणार्‍या त्रुटीप्रकारे प्रदर्शित होईल डिफॉल्ट स्थिती आहे. आपल्याला हे संदेश (ज्याचं स्थान `app/i18n/en.ts` आहे) आणि शायद लेआऊट आणि (`app/screens/ErrorScreen`). आपण हे पूर्णपणे काढच आपलं असलं तर, <ErrorBoundary> कॉम्पोनेंटसाठी `app/app.tsx` तपासा.",
    reset: "एप रिसेट करा",
    traceTitle: "%{name} स्टॅकमधील त्रुटी", // @demo remove-current-line
  },
  emptyStateComponent: {
    generic: {
      heading: "आम्हाला डेटा सपडला नाही",
      content:
        "अद्याप कोणताही डेटा आढळला नाही. ॲप रिफ्रेश करण्यासाठी किंवा रीलोड करण्यासाठी बटणावर क्लिक करा.",
      button: "पुन्हा प्रयत्न करा",
    },
  },
  // @demo remove-block-start
  errors: {
    invalidEmail: "अवैध ईमेल पत्ता.",
  },
  loginScreen: {
    signIn: "साइन इन करा",
    enterDetails: "कृपया आपल्या Google खात्याने लॉगिन करा",
    emailFieldLabel: "ईमेल",
    passwordFieldLabel: "पासवर्ड",
    emailFieldPlaceholder: "आपला ईमेल पत्ता टाका",
    passwordFieldPlaceholder: "सुपर सीक्रेट पासवर्ड इथे",
    tapToSignIn: "साइन इन!",
    termConditionPretext: "तुम्ही सहमत आहात",
    termConditionText: "मुदत आणि अटी",
    hint: "सुचना: आप कोणत्याही ईमेल पत्त्याचा वापर करू शकता आणि आपल्या आवडत्या पासवर्डसह :)",
    oops: "अरेरे!!",
    getting: "लॉग इन करत आहे!!",
    noService:
      "हे ॲप वापरणे सुरू ठेवण्यासाठी, तुम्हाला Google Play Store/Services अपडेट करणे आवश्यक आहे.",
    somethingWrong: "काहीतरी चुकलं!",
  },
  demoNavigator: {
    componentsTab: "संरचना",
    debugTab: "प्रोफाइल",
    communityTab: "समुदाय",
    podcastListTab: "सूचना",
    educationTab: "शिक्षण",
    referenceMaterialTab: "संदर्भ",
  },
  demoCommunityScreen: {
    title: "येथे आपल्या बॅचमेटसाठी कनेक्ट करा",
    tagLine:
      "Infinite Red चे React Native अभियंतेसाठी समुदायात जोडा आणि आमच्या साथींच्या सहाय्याने आपल्या अ‍ॅप विकासात स्तर वाढवा!",
    joinUsOnSlackTitle: "स्लॅकवर आमचं सहभागी व्हा",
    joinUsOnSlack:
      "आपल्याकडे पृथक भूमिका साधण्याचं एक स्थान असल्यास काही वेळ घेऊ का? Infinite Red Community Slack मध्ये चरचा साधा! आमचं वाढतंय भूमिका आहे की तुमचं प्रश्ने किंवा इतरांकडून काही शिका, आणि आपल्या नेटवर्कला वाढवा.",
    joinSlackLink: "स्लॅक समुदायात सामील व्हा",
    makeIgniteEvenBetterTitle: "इग्नायट आणि बेहतर करा",
    makeIgniteEvenBetter:
      "इग्नायट आपल्याकडून बेहतर कसंतर हवंय? आम्ही विचार करू शकतो! आम्ही नेहमीची आमचं सर्वोत्तम React Native टूलिंग तयार करणार्‍यांकिंवा सहाय्य करणार्‍यांकिंवा इतरांसाठी त्यांचं साथी सापडून त्यांना जॉईन करण्यासाठी GitHub वर जॉईन करा.",
    contributeToIgniteLink: "इग्नायटला योगदान करा",
    theLatestInReactNativeTitle: "React Native मध्ये नवीनतम",
    theLatestInReactNative: "आम्ही तुमचं सर्व अद्यतित React Native आहे त्याच्या प्रस्तावात ठेवतो.",
    reactNativeRadioLink: "React Native रेडिओ",
    reactNativeNewsletterLink: "React Native न्यूझलेटर",
    reactNativeLiveLink: "React Native लाइव",
    chainReactConferenceLink: "Chain React कॉन्फरेन्स",
    hireUsTitle: "आपल्या पुढील परियोजनेसाठी Infinite Red हायर करा",
    hireUs:
      "पूर्ण प्रकल्प चालवता किंवा आमच्या हस्तशिक्षा सहित दलांना तुमच्या आपल्या परियोजनेसाठी Infinite Red मदत करू शकतं.",
    hireUsLink: "आम्हाला संदेश पाठवा",
  },
  homeScreen: {
    jumpStart: "येथे आपण YouTube व्हिडिओ दाखवू",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "खारे",
    demoViaTxProp: "`tx` प्रॉपद्वारे",
    demoViaSpecifiedTxProp: "`{{prop}}Tx` प्रॉपद्वारे",
  },
  demoDebugScreen: {
    howTo: "कसं",
    title: "प्रोफाइल",
    tagLine:
      "अभिनंदन, आपल्याकडे एक अत्यंत उन्नत React Native अ‍ॅप टेंपलेट आहे. हे बॉइलरप्लेट वापरा!",
    reactotron: "Reactotronला पाठवा",
    reportBugs: "रिपोर्ट",
    demoList: "डेमो यादी",
    demoPodcastList: "डेमो पॉडकास्ट यादी",
    androidReactotronHint:
      "आशा आहे की हे काम करेल, तुमच्या टर्मिनलमधून adb reverse tcp:9090 tcp:9090 चालवा आणि अ‍ॅपला पुन्हा लोड करा.",
    iosReactotronHint: "आशा आहे की हे काम करेल, तुमच्या टर्मिनलमधून अ‍ॅपला पुन्हा लोड करा.",
    macosReactotronHint:
      "आशा आहे की हे काम करेल, Reactotron डेस्कटॉप अ‍ॅप सुरू आहे आणि अ‍ॅपला पुन्हा लोड करा.",
    webReactotronHint:
      "आशा आहे की हे काम करेल, Reactotron डेस्कटॉप अ‍ॅप सुरू आहे आणि अ‍ॅपला पुन्हा लोड करा.",
    windowsReactotronHint:
      "आशा आहे की हे काम करेल, Reactotron डेस्कटॉप अ‍ॅप सुरू आहे आणि अ‍ॅपला पुन्हा लोड करा.",
  },
  demoPodcastListScreen: {
    title: "येथे सर्व क्लास घोषणा आणि सुचना येतात",
    onlyFavorites: "फक्त आवडतंयत दाखवा",
    favoriteButton: "आवडतंय",
    unfavoriteButton: "आवडतंय नसतंय",
    accessibility: {
      cardHint:
        "एपिसोड सुनवण्यासाठी दोन वेळा टॅप करा. एपिसोडला {{action}} करण्यासाठी दोन वेळा टॅप करा आणि धरा.",
      switch: "फक्त आवडतंयत दाखवण्यासाठी स्विच करा",
      favoriteAction: "आवडतंय विचारा",
      favoriteIcon: "एपिसोड आवडतंय नसतंय",
      unfavoriteIcon: "एपिसोड आवडतंय",
      publishLabel: "{{date}} ला प्रकाशित",
      durationLabel: "कालावधी: {{hours}} तास {{minutes}} मिनिटे {{seconds}} सेकंद",
    },
    noFavoritesEmptyState: {
      heading: "हे किंवा कमी दिसतंय",
      content:
        "अजून कोणताही आवडतंय नसतंय. आपल्या आवडत्या एपिसोडवर हृदयाक टॅप करा आणि त्यांना आपल्या आवडत्या जोडल्यासाठी!",
    },
  },
  generalInstruction: {
    generalInstructionTitle: "सामान्य सूचना",
    continue: "सुरू ठेवा",
  },
  testOverview: {
    testName: "चाचणी नाव",
    question: "प्रश्न",
    duration: "मिनिटे",
    marks: "मार्क्स",
    section: "विभाग",
    attempt: "चाचणी सुरू करा",
    accept: "कृपया अटी स्वीकारा",
  },
  score: {
    score: "निकाल",
    testName: "चाचणी नाव",
    question: "प्रश्न",
    duration: "तास",
    marks: "मार्क्स",
    myscore: "गुण मिळाले",
    reattempt: "पुन्हा प्रयत्न करा",
    home: "मुख्य पृष्ठ",
    accept: "कृपया अटी स्वीकारा",
  },
  examList: {
    testSeriesList: "सराव पेपर्सची यादी",
    continue: "सुरू ठेवा",
  },
  referenceMaterial: {
    references: "संदर्भ",
    upcomingExams: "येणाऱ्या परीक्षा",
    referenceMaterialTxt: "परीक्षेच्या योजना",
  },
}

export default mr
export type Translations = typeof mr
