import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';


const SemiCircleIndicator = () => {

    
    
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <AnimatedCircularProgress
        size={200}
        width={10}
        fill={percentage}  // Percentage to fill
        tintColor="#FF7966"
        backgroundColor="#FF7966"
        arcSweepAngle={180}     // Limit the arc to half a circle
        rotation={270}          // Rotate the semi-circle to start from the bottom
        lineCap="round"
      />

      {/* Display percentage text */}
      <Text style={{ position: 'absolute', fontSize: 24, color: '#FF7966' }}>
        {`${percentage}%`}
      </Text>
    </View>
  );
};

export default SemiCircleIndicator;
