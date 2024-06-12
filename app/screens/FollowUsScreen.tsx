import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Linking, TextStyle, Platform } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"
import { colors, spacing } from "../theme"
import { CardImage } from "app/components/CardImage"
interface FollowUsScreenProps extends AppStackScreenProps<"FollowUsScreen"> {}

export const FollowUsScreen: FC<FollowUsScreenProps> = observer(function FollowUsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  const openApp = (packageName: string) => {
    const appLink = Platform.select({
      ios: `itms-apps://apps.apple.com/app/id${packageName}`,
      android: `market://details?id=${packageName}`,
    })
    console.log(appLink)
    Linking.canOpenURL("" + appLink).then((supported) => {
      if (supported) {
        Linking.openURL("" + appLink)
      } else {
        alert("sorry invalid url")
      }
    })
  }
  return (
    <Screen style={$root} preset="scroll">
      <Text text="FollowUs" style={$text} />
      <View style={$container}>
        <CardImage
          style={$follow}
          source={require("../../assets/images/MyImages/facebook.png")}
          preset="reversed"
          verticalAlignment="space-between"
          // LeftComponent={<Text>Left</Text>}
          // RightComponent={<Text>Right</Text>}
          headingStyle={{ color: "#a511dc" }}
          HeadingTextProps={{ weight: "bold" }}
          content="Card Content"
          contentStyle={{ color: "#a511dc" }}
          ContentTextProps={{ weight: "light" }}
          footer="Facebook"
          footerStyle={{ color: "#000000" }}
          FooterTextProps={{ weight: "medium" }}
          onPress={() => openApp("com.facebook.katana")}
        />
        <CardImage
          style={$follow}
          source={require("../../assets/images/MyImages/youtube.png")}
          preset="reversed"
          verticalAlignment="space-between"
          // LeftComponent={<Text>Left</Text>}
          // RightComponent={<Text>Right</Text>}
          headingStyle={{ color: "#a511dc" }}
          HeadingTextProps={{ weight: "bold" }}
          content="Card Content"
          contentStyle={{ color: "#a511dc" }}
          ContentTextProps={{ weight: "light" }}
          footer="YouTube"
          footerStyle={{ color: "#000000" }}
          FooterTextProps={{ weight: "medium" }}
          onPress={() => openApp("com.google.android.youtube")}
        />
      </View>
      <View style={$container}>
        <CardImage
          style={$follow}
          source={require("../../assets/images/MyImages/telegram.png")}
          preset="reversed"
          verticalAlignment="space-between"
          // LeftComponent={<Text>Left</Text>}
          // RightComponent={<Text>Right</Text>}
          headingStyle={{ color: "#a511dc" }}
          HeadingTextProps={{ weight: "bold" }}
          content="Card Content"
          contentStyle={{ color: "#a511dc" }}
          ContentTextProps={{ weight: "light" }}
          footer="Telegram"
          footerStyle={{ color: "#000000" }}
          FooterTextProps={{ weight: "medium" }}
          onPress={() =>
            openApp(
              " https://www.instagram.com/central_police_bharti_guidance?igsh=bnp5NXM5MHF6N3pl&utm_source=qr",
            )
          }
        />
        <CardImage
          style={$follow}
          source={require("../../assets/images/MyImages/whatsapp.png")}
          preset="reversed"
          verticalAlignment="space-between"
          // LeftComponent={<Text>Left</Text>}
          // RightComponent={<Text>Right</Text>}
          headingStyle={{ color: "#a511dc" }}
          HeadingTextProps={{ weight: "bold" }}
          content="Card Content"
          contentStyle={{ color: "#a511dc" }}
          ContentTextProps={{ weight: "light" }}
          footer="WhatsApp"
          footerStyle={{ color: "#000000" }}
          FooterTextProps={{ weight: "medium" }}
          onPress={() => openApp(" https://chat.whatsapp.com/J1CI5Bj20FZJzuBLl8hZgl")}
        />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  margin: 10,
}

const $follow: TextStyle = {
  color: colors.palette.neutral900,
  padding: spacing.lg,
}
const $container: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-around",
  gap: 50,
  borderRadius: 10,
  margin: 40,
}
const $text: TextStyle = {
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
  margin: 10,
  color: colors.palette.neutral900,
}
