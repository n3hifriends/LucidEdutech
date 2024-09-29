import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, Linking, TextStyle, View, ViewStyle } from "react-native"
import { ListItem, Screen, Text } from "app/components"
import { DemoTabScreenProps } from "app/navigators/DemoNavigator"
import { spacing } from "app/theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
interface ReferenceMaterialScreenProps extends DemoTabScreenProps<"ReferenceMaterial"> {}

export const ReferenceMaterialScreen: FC<ReferenceMaterialScreenProps> = observer(
  function ReferenceMaterialScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    const systemInstructionsEng = [
      { name: "CGL", url: "https://drive.google.com/file/d/1a_7nvBcmkET7MHKW3PkQ1bFqM8q6tic8" },
      { name: "CHSL", uri: "https://drive.google.com/file/d/11EKkz_W29ljpMBhqcdBS6M6m3OIZe0-Y" },
      {
        name: "STENO C & D",
        url: "https://drive.google.com/file/d/1LnQBpQ5R_ze8QIfoeD_7ytMSloZZonhk",
      },
      { name: "JE", url: "https://drive.google.com/file/d/12fqQonLIpurKcwZbI-2QMVMtxYxYxvEQ" },
      { name: "CAPF", url: "https://drive.google.com/file/d/1a_7nvBcmkET7MHKW3PkQ1bFqM8q6tic8" },
      { name: "MTS(NT)", url: "https://drive.google.com/file/d/1chXndLCGCHtMyWBpOG7QewHXp5muoOQ8" },
      { name: "JHT", url: "https://drive.google.com/file/d/1ubyPEoBeuC5sMlNntPxORwGtL9g61H5r" },
    ]
    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={$container}>
        <Text style={$title} preset="heading" tx="examList.referenceMaterialTxt" />
        <View style={$itemsContainer}>
          {systemInstructionsEng.map((item, index) => (
            <ListItem
              myKey={index}
              key={index}
              text={item?.name}
              children={"children"}
              bottomSeparator
              rightIcon={"caretRight"}
              height={60}
              onPress={() => {
                try {
                  const myUrl = "" + item?.url
                  Linking.canOpenURL(myUrl)
                    .then(() => {
                      Linking.openURL(myUrl).catch((err) => {
                        console.log("🚀 ~ .then ~ err:", err)
                      })
                    })
                    .catch((err) => {
                      console.log("🚀 ~ ReferenceMaterialScreen ~ err:", err)
                    })
                } catch (error) {
                  console.log("🚀 ~ ReferenceMaterialScreen ~ error:", error)
                }
              }}
              // onPress={() => openLinkInBrowser("https://rn.live/")}
            />
          ))}
        </View>
      </Screen>
    )
  },
)

const $container: ViewStyle = {
  paddingBottom: spacing.sm,
  paddingHorizontal: spacing.lg,
}

const $title: TextStyle = {
  marginBottom: spacing.sm,
}

const $itemsContainer: ViewStyle = {
  marginBottom: spacing.xl,
}

const $leftImageContainer: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
}

const $leftImage: ImageStyle = {
  height: 35,
  width: 35,
  alignSelf: "center",
}
