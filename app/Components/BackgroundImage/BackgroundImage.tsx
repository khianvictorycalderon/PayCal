import React, { ReactNode } from 'react';
import { ImageBackground, StyleSheet, ImageSourcePropType } from 'react-native';

interface BackgroundImageProps {
  ImagePath: ImageSourcePropType;
  Resize?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  children?: ReactNode;
}

export default function BackgroundImage({
  ImagePath,
  Resize = 'cover',
  children,
}: BackgroundImageProps) {
  return (
    <ImageBackground
      source={ImagePath}
      style={styles.background}
      resizeMode={Resize}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
});
