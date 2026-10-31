import { StyleSheet, Text, type TextProps } from 'react-native';

import { colors, fontFamilies, fontSizes } from '@/theme';

interface AppTextProps extends TextProps {
  size?: number;
  weight?: keyof typeof fontFamilies;
  color?: string;
}

// All text in the app goes through here so it always uses Geist.
export function AppText({
  size = fontSizes.body,
  weight = 'regular',
  color = colors.text,
  style,
  ...textProps
}: AppTextProps) {
  return (
    <Text
      style={[styles.text, { fontFamily: fontFamilies[weight], fontSize: size, color }, style]}
      {...textProps}
    />
  );
}

const styles = StyleSheet.create({
  // Android adds extra space around text by default, which would shift the layout.
  text: { includeFontPadding: false },
});
