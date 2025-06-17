import { View, StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  Styles?: ViewStyle;
  Align?: 'left' | 'right' | 'center' | 'justify';
}

const defaultStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    margin: 8,
  },
});

const getAlignmentStyle = (align: CardProps['Align']): ViewStyle => {
  switch (align) {
    case 'center':
      return { alignItems: 'center' };
    case 'right':
      return { alignItems: 'flex-end' };
    case 'justify': // Not directly supported in View; can be ignored or handled differently
      return { alignItems: 'stretch' };
    case 'left':
    default:
      return { alignItems: 'flex-start' };
  }
};

export default function Card({ children, Styles = {}, Align = 'left' }: CardProps) {
  const {
    padding = defaultStyles.card.padding,
    margin = defaultStyles.card.margin,
    backgroundColor = defaultStyles.card.backgroundColor,
    borderRadius = defaultStyles.card.borderRadius,
    marginTop,
    marginBottom,
    marginHorizontal,
  } = Styles;

  const combinedStyle: ViewStyle = {
    padding,
    margin,
    backgroundColor,
    borderRadius,
    ...(marginTop !== undefined && { marginTop }),
    ...(marginBottom !== undefined && { marginBottom }),
    ...(marginHorizontal !== undefined && { marginHorizontal }),
  };

  return (
    <View style={[defaultStyles.card, combinedStyle, getAlignmentStyle(Align)]}>
      {children}
    </View>
  );
}