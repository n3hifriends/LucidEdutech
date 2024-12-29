import { Linking } from "react-native"

/**
 * Helper for opening a give URL in an external browser.
 */
export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => true && Linking.openURL(url))
}
