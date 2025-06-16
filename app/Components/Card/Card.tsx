import { View, StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  Styles?: Pick<ViewStyle, 'padding' | 'margin' | 'backgroundColor' | 'borderRadius'>;
  center?: boolean; // lowercase and optional
}

const defaultStyles = StyleSheet.create({
  card: {
    padding: 18,
    marginTop: 18,
    marginLeft: 18,
    marginRight: 18,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  center: {
    alignItems: 'center',
  },
});

export default function Card({ children, Styles = {}, center = false }: CardProps) {
  return (
    <View style={[defaultStyles.card, Styles, center && defaultStyles.center]}>
      {children}
    </View>
  );
}