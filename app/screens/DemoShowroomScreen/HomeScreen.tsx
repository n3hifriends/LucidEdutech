import { Link, RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import React, { FC, ReactElement, useCallback, useEffect, useRef, useState } from "react"
import {
  Alert,
  Image,
  ImageStyle,
  Linking,
  Platform,
  SectionList,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { Drawer } from "react-native-drawer-layout"
import { type ContentStyle } from "@shopify/flash-list"
import { Button, ListItem, ListView, ListViewRef, Screen, Text } from "../../components"
import { isRTL, translate } from "../../i18n"
import { DemoTabParamList, DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { colors, spacing } from "../../theme"
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"
import * as Demos from "./demos"
import { DrawerIconButton } from "./DrawerIconButton"
import { ProfileSnapshotIn, useStores } from "./../../../app/models"
import { GeneralApiProblem } from "app/services/api/apiProblem"
import YoutubePlayer, { PLAYER_STATES } from "react-native-youtube-iframe"
import { AppStackScreenProps, navigate } from "./../../../app/navigators"

const logo = require("../../../assets/images/logo.png")

export interface Demo {
  name: string
  description: string
  data: ReactElement[]
}

interface DemoListItem {
  item: { name: string; useCases: string[] }
  sectionIndex: number
  handleScroll?: (sectionIndex: number, itemIndex?: number) => void
}

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")

const WebListItem: FC<DemoListItem> = ({ item, sectionIndex }) => {
  const sectionSlug = item.name.toLowerCase()

  return (
    <View>
      <Link to={`/showroom/${sectionSlug}`} style={$menuContainer}>
        <Text preset="bold">{item.name}</Text>
      </Link>
      {item.useCases.map((u) => {
        const itemSlug = slugify(u)

        return (
          <Link key={`section${sectionIndex}-${u}`} to={`/showroom/${sectionSlug}/${itemSlug}`}>
            <Text>{u}</Text>
          </Link>
        )
      })}
    </View>
  )
}

const NativeListItem: FC<DemoListItem> = ({ item, sectionIndex, handleScroll }) => (
  <View>
    <Text onPress={() => handleScroll?.(sectionIndex)} preset="bold" style={$menuContainer}>
      {item.name}
    </Text>
    {item.useCases.map((u, index) => (
      <ListItem
        key={`section${sectionIndex}-${u}`}
        onPress={() => handleScroll?.(sectionIndex, index + 1)}
        text={u}
        rightIcon={isRTL ? "caretLeft" : "caretRight"}
      />
    ))}
  </View>
)

const ShowroomListItem = Platform.select({ web: WebListItem, default: NativeListItem })

export const HomeScreen: FC<DemoTabScreenProps<"Home">> = function HomeScreen(_props) {
  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const listRef = useRef<SectionList>(null)
  const menuRef = useRef<ListViewRef<DemoListItem["item"]>>(null)
  const route = useRoute<RouteProp<DemoTabParamList, "Home">>()
  const params = route.params
  const {
    authenticationStore: { logout, jwtToken },
    profileStore: { getProfile },
  } = useStores()

  function logoutApp() {
    logout()
  }

  // handle Web links
  React.useEffect(() => {
    if (params !== undefined && Object.keys(params).length > 0) {
      const demoValues = Object.values(Demos)
      const findSectionIndex = demoValues.findIndex(
        (x) => x.name.toLowerCase() === params.queryIndex,
      )
      let findItemIndex = 0
      if (params.itemIndex) {
        try {
          findItemIndex =
            demoValues[findSectionIndex].data.findIndex(
              (u) => slugify(u.props.name) === params.itemIndex,
            ) + 1
        } catch (err) {
          console.error(err)
        }
      }
      handleScroll(findSectionIndex, findItemIndex)
    }
  }, [params])

  async function userProfile() {
    const profileRes = await getProfile()
    console.log("🚀 ~ userProfile ~ profileRes:", profileRes)
    const myRes: string = profileRes?.kind || "" // Provide a default value for undefined case
    if (myRes === "unauthorized") {
      Alert.alert(translate("common.loginAgain"), translate("common.tokenNotFound"), [
        { text: translate("common.ok"), onPress: () => logout() },
      ])
    }
  }

  useEffect(() => {
    userProfile()
  }, [])

  const toggleDrawer = () => {
    if (!open) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }

  const handleScroll = (sectionIndex: number, itemIndex = 0) => {
    listRef.current?.scrollToLocation({
      animated: true,
      itemIndex,
      sectionIndex,
    })
    toggleDrawer()
  }

  const scrollToIndexFailed = (info: {
    index: number
    highestMeasuredFrameIndex: number
    averageItemLength: number
  }) => {
    listRef.current?.getScrollResponder()?.scrollToEnd()
    timeout.current = setTimeout(
      () =>
        listRef.current?.scrollToLocation({
          animated: true,
          itemIndex: info.index,
          sectionIndex: 0,
        }),
      50,
    )
  }

  useEffect(() => {
    return () => timeout.current && clearTimeout(timeout.current)
  }, [])

  const $drawerInsets = useSafeAreaInsetsStyle(["top"])

  const onStateChange = useCallback((state: PLAYER_STATES) => {
    if (state === "ended") {
      setPlaying(false)
      Alert.alert("video has finished playing!")
    }
  }, [])

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev)
  }, [])

  return (
    <Drawer
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerType={"slide"}
      drawerPosition={isRTL ? "right" : "left"}
      renderDrawerContent={() => (
        <View style={[$drawer, $drawerInsets]}>
          <View style={$logoContainer}>
            <Image source={logo} style={$logoImage} />
          </View>

          <ListView<DemoListItem["item"]>
            ref={menuRef}
            contentContainerStyle={$listContentContainer}
            estimatedItemSize={250}
            data={Object.values(Demos).map((d) => ({
              name: d.name,
              useCases: d.data.map((u) => u.props.name as string),
            }))}
            keyExtractor={(item) => item.name}
            renderItem={({ item, index: sectionIndex }) => (
              <ShowroomListItem {...{ item, sectionIndex, handleScroll }} />
            )}
          />
          <View style={[$titleWrapperCenter]}>
            <Text
              weight="medium"
              onPress={logoutApp}
              size="md"
              tx="common.logOut"
              style={[$title]}
            />
          </View>
        </View>
      )}
    >
      <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={$screenContainer}>
        <DrawerIconButton onPress={toggleDrawer} />
        <YoutubePlayer
          height={300}
          play={playing}
          videoId={"2ouN6xeF6Hk"}
          onChangeState={onStateChange}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Button
            text="Follow Us"
            onPress={() => navigate({ name: "FollowUsScreen" })}
            style={$follow}
          />
          <Button
            text="YouTube"
            onPress={() =>
              Linking.openURL("https://www.youtube.com/channel/UClxduICYrEk23b45F79PDZA")
            } // Replace with your YouTube channel URL
            style={$youtube}
            // icon={() => <FontAwesomeIcon icon={faYoutube} />} // YouTube icon
          />
        </View>
        <SectionList
          ref={listRef}
          contentContainerStyle={$sectionListContentContainer}
          stickySectionHeadersEnabled={false}
          // sections={Object.values(Demos)}
          // renderItem={({ item }) => item}
          sections={[]}
          renderItem={({ item }) => <View />}
          renderSectionFooter={() => <View style={$demoUseCasesSpacer} />}
          ListHeaderComponent={
            <View style={$heading}>
              <Text preset="heading" tx="homeScreen.jumpStart" />
            </View>
          }
          onScrollToIndexFailed={scrollToIndexFailed}
          renderSectionHeader={({ section }) => {
            return (
              <View>
                <Text preset="heading" style={$demoItemName}>
                  {section.name}
                </Text>
                <Text style={$demoItemDescription}>{section.description}</Text>
              </View>
            )
          }}
        />
      </Screen>
    </Drawer>
  )
}

const $screenContainer: ViewStyle = {
  flex: 1,
}

const $drawer: ViewStyle = {
  backgroundColor: colors.background,
  flex: 1,
}

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
}

const $sectionListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
}

const $heading: ViewStyle = {
  marginBottom: spacing.xxxl,
}

const $logoImage: ImageStyle = {
  height: 42,
  width: 77,
}

const $logoContainer: ViewStyle = {
  alignSelf: "flex-start",
  justifyContent: "center",
  height: 56,
  paddingHorizontal: spacing.lg,
}

const $menuContainer: ViewStyle = {
  paddingBottom: spacing.xs,
  paddingTop: spacing.lg,
}

const $demoItemName: TextStyle = {
  fontSize: 24,
  marginBottom: spacing.md,
}

const $demoItemDescription: TextStyle = {
  marginBottom: spacing.xxl,
}

const $demoUseCasesSpacer: ViewStyle = {
  paddingBottom: spacing.xxl,
}
const $titleWrapperCenter: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  paddingHorizontal: spacing.xxl,
}

const $title: TextStyle = {
  textAlign: "center",
  color: colors.palette.red60,
  padding: spacing.md,
}

const $youtube: TextStyle = {
  color: colors.palette.red60,
  padding: spacing.xxl,
}
const $follow: TextStyle = {
  color: colors.palette.blue,
}
