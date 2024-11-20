import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Linking, Image, ScrollView } from 'react-native';
import axios from 'axios';

const UpdatesComponent = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const response = await axios.get('https://chainfree.info:4000/community_update');
      setUpdates(response.data); // Set updates to response.data
      console.log('Fetched Updates:', response.data); // Log the response data here
    } catch (error) {
      console.error('Error fetching row data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {updates.length > 0 ? (
        updates.map((item) => (
          <View key={item.id.toString()} style={styles.updateContainer}>
            <View style={styles.updteContainerInner}>
            <View style={styles.updateContainerColumn}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.link} onPress={() => Linking.openURL(item.link)}>
              Go!
            </Text>
            </View>
             
            {item.imageURL && (
              <Image source={{ uri: item.imageURL }} style={styles.image} />  
            )}
            </View>
          </View>
        ))
      ) : (
        <Text>No updates available.</Text> // Render a message if no updates
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  updateContainer: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },

  container: {
    flex: 1,
    width: '100%',
  },

  updteContainerInner: {
    marginBottom: 20,
    padding: 10,
    flexDirection: 'row',
    width: 320,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 120,
    zIndex: 999,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  updateContainerColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: '90%',
    zIndex: 20,
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    zIndex: 20,
  },

  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  image: {
    width: '50%',
    height: '100%',
    position: 'absolute',
    right: 10,
    borderRadius: 12,
    
  },
});

export default UpdatesComponent;
