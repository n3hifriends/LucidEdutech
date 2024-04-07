import * as React from "react"
import { TouchableOpacity, TextStyle, ViewStyle, View } from "react-native"
import { mergeAll, flatten } from "ramda"
import { colors, spacing } from "app/theme"
import { Text } from "./Text"
import { TxKeyPath } from "app/i18n"

export interface CheckboxProps {
  /**
   * Additional container style. Useful for margins.
   */
  style?: ViewStyle | ViewStyle[]

  /**
   * Additional outline style.
   */
  outlineStyle?: ViewStyle | ViewStyle[]

  /**
   * Additional fill style. Only visible when checked.
   */
  fillStyle?: ViewStyle | ViewStyle[]

  /**
   * Is the checkbox checked?
   */
  value?: boolean

  /**
   * The text to display if there isn't a tx.
   */
  text?: string

  /**
   * The i18n lookup key.
   */
  tx?: string

  /**
   * Multiline or clipped single line?
   */
  multiline?: boolean

  /**
   * Fires when the user tabs to change the value.
   */
  onToggle?: (newValue: boolean) => void
}

const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingVertical: spacing.xxs,
  alignSelf: "flex-start",
}

const DIMENSIONS = { width: 16, height: 16 }

const OUTLINE: ViewStyle = {
  ...DIMENSIONS,
  marginTop: 2, // finicky and will depend on font/line-height/baseline/weather
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: 1,
}

const FILL: ViewStyle = {
  width: DIMENSIONS.width - 4,
  height: DIMENSIONS.height - 4,
  backgroundColor: colors.palette.overlay50,
}

const LABEL: TextStyle = { paddingLeft: spacing.sm }

export function Checkbox(props: CheckboxProps) {
  const numberOfLines = props.multiline ? 0 : 1

  const rootStyle = mergeAll(flatten([ROOT, props.style]))
  const outlineStyle = mergeAll(flatten([OUTLINE, props.outlineStyle]))
  const fillStyle = mergeAll(flatten([FILL, props.fillStyle]))

  const onPress = props.onToggle ? () => props.onToggle && props.onToggle(!props.value) : undefined

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={!props.onToggle}
      onPress={onPress}
      style={rootStyle}
    >
      <View style={outlineStyle}>{props.value && <View style={fillStyle} />}</View>
      <Text
        text={props.text}
        tx={props.tx as TxKeyPath}
        numberOfLines={numberOfLines}
        style={LABEL}
      />
    </TouchableOpacity>
  )
}
