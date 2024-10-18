import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';

const SmartHomeIcon = ({ 
  name, 
  imageUrl, 
  gradient, 
  color, 
  imageShape = 'square', 
  size = 'normal', 
  onPress 
}) => {
  const getImageShapeStyle = (shape) => {
    switch (shape) {
      case 'round':
        return styles.round;
      case 'square':
        return styles.square;
      case 'hexagon':
        return styles.hexagon;
      default:
        return styles.square;
    }
  };

  const imageShapeStyle = getImageShapeStyle(imageShape);
  const iconSize = size === 'large' ? styles.large : styles.normal;
  const fontSize = size === 'large' ? styles.largeText : styles.normalText;

  const gradientColors = gradient.match(/rgb\(.*?\)/g) || ['#000', '#000'];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          colors={gradientColors}
          style={[styles.iconContainer, iconSize, { borderColor: color }]}
        >
          <View style={[styles.imageContainer, imageShapeStyle]}>
            <Image source={{ uri: imageUrl }} style={[styles.image, imageShapeStyle]} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
      <Text style={[styles.text, fontSize]}>{name}</Text>
    </View>
  );
};

SmartHomeIcon.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  gradient: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  imageShape: PropTypes.oneOf(['round', 'square', 'hexagon']),
  size: PropTypes.oneOf(['normal', 'large']),
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconContainer: {
    borderWidth: 2,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  text: {
    marginTop: 8,
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
  },
  normal: {
    width: 64,
    height: 64,
  },
  large: {
    width: 96,
    height: 96,
  },
  normalText: {
    fontSize: 12,
  },
  largeText: {
    fontSize: 14,
  },
  round: {
    borderRadius: 32,
  },
  square: {
    borderRadius: 8,
  },
  hexagon: {
    // Hexagon shape can be implemented using a custom SVG or more complex styling
  },
});

export default SmartHomeIcon;