import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const Menu = ({ open, onClose }) => {
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isInsideMenu(event)) {
        onClose(); // Close the menu when clicking outside
      }
    };

    const isInsideMenu = (event) => {
      const { locationX, locationY } = event.nativeEvent;
      const menuPosition = findMenuPosition();
      const isInsideX = locationX >= menuPosition.left && locationX <= menuPosition.right;
      const isInsideY = locationY >= menuPosition.top && locationY <= menuPosition.bottom;
      return isInsideX && isInsideY;
    };

    const findMenuPosition = () => {
      const { x, y, width, height } = menuRef.current.measureLayout();
      return {
        left: x,
        top: y,
        right: x + width,
        bottom: y + height
      };
    };

    const touchEventHandler = open ? 'touchStart' : 'none';
    ScrollView.props.onTouchStart = touchEventHandler === 'none' ? null : handleClickOutside;

    return () => {
      // Cleanup event listener
      ScrollView.props.onTouchStart = null;
    };
  }, [open, onClose]);

  return (
    <View style={styles.overlay}>
      {open && (
        <View style={styles.overlay} onTouchStart={onClose} />
      )}
      <ScrollView 
        contentContainerStyle={styles.container} 
        open={open} 
        ref={menuRef}
        onTouchStart={() => {}} // Ensure ScrollView is touchable
      >
        <View style={styles.menuItem}>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    width: '50%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 10,
  },
  menuText: {
    color: '#eee',
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 10,
  },
});

export default Menu;
