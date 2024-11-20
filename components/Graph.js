import React, { useState, useEffect, useRef } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const BalanceGraph = () => {
    const [data, setData] = useState({ labels: [], datasets: [{ data: [] }] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchBalanceData = async () => {
        try {
          const response = await axios.get('https://chainfree.info:4000/balance-history');
          console.log('balances sent', response);
  
          // Prepare data for the chart
          const balances = response.data.balanceHistory || []; // Ensure this matches your server response
          const labels = balances.map((entry) => new Date(entry.date).toLocaleDateString());
          const balanceValues = balances.map((entry) => entry.balance);
          
          setData({
            labels: labels.length ? labels : ['No Data'],   // Use placeholder if no labels
            datasets: [{ data: balanceValues.length ? balanceValues : [0] }]  // Use 0 for data if empty
          });
        } catch (err) {
          console.error('Error fetching balance data:', err);
          setError('Failed to load balance data'); // Set error state
        } finally {
          setLoading(false); // End loading state
        }
      };
  
      fetchBalanceData();
    }, []); // Ensure dependency array is present
  
    // Show loading state
    if (loading) {
      return <Text>Loading...</Text>; 
    }

    const screenWidth = Dimensions.get('window').width;

  
    return (
      <View style={styles.container}>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100
                ]
              }
            ]
          }}
          
          width={screenWidth * 0.9} // from react-native
          height={220}
          yAxisLabel=""
          xAxisLabel=''
          xLabelsOffset={10}
          chartConfig={{
            
            backgroundColor: '#8e8e8e',
            backgroundGradientFrom: '#000000',
            backgroundGradientFromOpacity: 0.5,
            backgroundGradientTo: '#000000',
            backgroundGradientToOpacity: 0.5,
            decimalPlaces: 2,
            color: (opacity =1) => '#00FAD9',
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 4,
            },
            propsForBackgroundLines: {
              stroke: 'transparent',
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: 'white',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 4,
          }}
        />
      </View>
    );
  };

  const styles = StyleSheet.create({
      container: {
        width: '90%',
        borderRadius: 4,
        flex: 1,
        zIndex: 20,
      },
  })
  
  export default BalanceGraph;
  