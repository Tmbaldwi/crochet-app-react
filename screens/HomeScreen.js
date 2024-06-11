import React, { useCallback , useState } from 'react';
import { View, ScrollView, Text, Pressable, StyleSheet } from 'react-native';
import { ColorCalculator } from '../components/Tools/ColorCalculator';
import { getPatternData } from '../services/CreatePatternService';
import { useFocusEffect } from '@react-navigation/native';

// Home screen
function HomeScreen({ navigation }) {
  const patternIds = ["Teddy Bear", "Peepo", "Forg", "Apa", "Polar Bear", "Dimple"];
  const gradientArray = ColorCalculator.createGradient('#0febff', '#ffc800', patternIds.length);

  const [patterns, setPatterns] = useState([]);
  
  useFocusEffect(
    useCallback(() => {
      const fetchPatterns = async () => {
        try {
          const fetchedPatterns = await getPatternData();
          setPatterns(fetchedPatterns);
        } catch (error) {
          console.log('Failed to fetch patterns:', error);
        }
      };

      fetchPatterns();
    }, [])
  );
  
  return (
    <View style={styles.screenContainer}>
      <View style={styles.patternNavigatorHeaderContainer}>
        <Text style={styles.patternNavigatorHeaderText}>
          My Patterns:
        </Text>
      </View>
      <View style={styles.patternNavigatorContainer}>
        {patterns.length == 0 && 
          <Text style={styles.emptyBoxText}>I am empty :(</Text>
        }
        {patterns.length > 0 &&  
          <ScrollView style={styles.patternNavigatorScrollView} contentContainerStyle={styles.patternNavigatorScrollViewContentContainer}>
            {patterns.map((patternData, index) => (
              <View key={patternData.ID} style={[styles.patternBox, {backgroundColor: gradientArray[index]}]}>
                <Text style={styles.patternBoxText}>{patternData.PatternName}</Text>
              </View>
            ))}
          </ScrollView>
        }
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Create Pattern')}>
          <Text>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  patternNavigatorHeaderContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    marginHorizontal: 25,
  },
  patternNavigatorHeaderText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  patternNavigatorContainer: {
    flex: 13,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 25,
    marginBottom: 50,
    padding: 20,
    backgroundColor: 'lightgrey',
    borderWidth: 2,
    borderRadius: 10,
  },
  emptyBoxText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  patternNavigatorScrollView: {
    flex: 1,
    alignSelf: 'stretch',
  },
  patternNavigatorScrollViewContentContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  patternBox: {
    width: 160,
    height: 160,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  patternBoxText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 60,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;