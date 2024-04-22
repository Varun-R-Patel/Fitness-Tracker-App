import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, TextInput, ScrollView, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AddDayScreen({ navigation, route }) {

  const [calories, setCalories] = useState("");
  const [getValue, setValue] = useState(0);
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

const getData = async () => {
  try{
    const jsonValue = await AsyncStorage.getItem("dayValue");
    const jsonValue2 = JSON.parse(jsonValue);
    if(jsonValue2 !== null){
      setNotes(jsonValue2)
    }
  } catch(e){
    alert(e)
  } finally{
    setLoading(false);
    console.log(notes)
  }
};

const storeData = async () => {
  if(!loading){
    try{
      const jsonValue = await AsyncStorage.setItem(
        "dayValue",
        JSON.stringify(notes)
      );
      return jsonValue;
    }catch (e){
      alert(e);
    }
  }
};

useEffect(() => {
  getData();
}, []);

useEffect(() => {
  storeData();
}, [notes]);

  const handleAddTask = () => {
    const newNote = {
      id: Date.now(),
      getValue,
      date: Date().toLocaleString(),
    }
    setNotes([...notes, newNote])
    setCalories("")
    closeShowDataInput();
  };


  const submitValues = () => {
    setValue(parseFloat(getValue) + parseFloat(calories));
    setCalories("");
  };

  const addWeightWorkout = () => {
    setValue(parseFloat(getValue) - 200)
  };

  const addRunWorkout = () => {
    setValue(parseFloat(getValue) - 250)
  };

  const showDataInput = () => {
    setOpen(true);
  };

  const closeShowDataInput = () => {
    setOpen(false);
    setCalories("");
    setValue(0);
  };

  const removeDayValue = (note) => {
    const updateRemoveNote = notes.filter((item) => item.id !== note.id);
    console.log(updateRemoveNote);
    setNotes(updateRemoveNote);
  };

  if (open == true){
    return(
        <View style={styles.farBackView}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Fitness APP</Text>
            </View>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.container}>
                    <View>
                        <Text style={[styles.calculatedNumber, { fontSize: 40 }]}>{getValue}</Text>
                    </View>
                    <TextInput 
                        style={styles.inputText} 
                        placeholder="Enter today's Calories"
                        value={calories}
                        onChangeText={setCalories}
                        keyboardType='number-pad'
                        
                    />
                    <Pressable style={styles.basicButtons} onPress={submitValues}>
                        <Text style={styles.submitText}>Save Calories</Text>
                    </Pressable>
                    <View style={styles.workoutButtonsContainer}>
                        <Pressable 
                        style={({ pressed }) => 
                            pressed 
                            ? [styles.workoutButtons, styles.pressed] 
                            : styles.workoutButtons
                        } 
                        onPress={addWeightWorkout}
                        >
                        <View>
                            <Ionicons name="barbell-outline" size={100} color="blue"/>
                        </View>
                        </Pressable>
                        <Pressable 
                        style={({ pressed }) => 
                            pressed 
                            ? [styles.workoutButtons, styles.pressed] 
                            : styles.workoutButtons
                        } 
                        onPress={addRunWorkout}
                        >
                        <View>
                            <Ionicons name="walk-outline" size={100} color="blue"/>
                        </View>
                        </Pressable>
                    </View>
                    <View style={styles.workoutButtonsContainer}>
                        <Pressable 
                        style={({ pressed }) => 
                            pressed 
                            ? [styles.workoutButtons, styles.pressed] 
                            : styles.workoutButtons
                        } 
                        onPress={addWeightWorkout}
                        >
                        <View>
                            <Ionicons name="golf-outline" size={100} color="blue"/>
                        </View>
                        </Pressable>
                        <Pressable 
                        style={({ pressed }) => 
                            pressed 
                            ? [styles.workoutButtons, styles.pressed] 
                            : styles.workoutButtons
                        } 
                        onPress={addRunWorkout}
                        >
                        <View>
                            <Ionicons name="football-outline" size={100} color="blue"/>
                        </View>
                        </Pressable>
                    </View>
                    <View style={styles.workoutButtonsContainer}>
                        <Pressable 
                        style={({ pressed }) => 
                            pressed 
                            ? [styles.workoutButtons, styles.pressed] 
                            : styles.workoutButtons
                        } 
                        onPress={addWeightWorkout}
                        >
                        <View>
                            <Ionicons name="footsteps-outline" size={100} color="blue"/>
                        </View>
                        </Pressable>
                        <Pressable 
                        style={({ pressed }) => 
                            pressed 
                            ? [styles.workoutButtons, styles.pressed] 
                            : styles.workoutButtons
                        } 
                        onPress={addRunWorkout}
                        >
                        <View>
                            <Ionicons name="baseball-outline" size={100} color="blue"/>
                        </View>
                        </Pressable>
                    </View>
                    <Pressable style={styles.basicButtons} onPress={handleAddTask}>
                        <Text style={styles.submitText}>Submit Todays Values</Text>

                    </Pressable>
                    <Pressable style={styles.basicButtons} onPress={closeShowDataInput}>
                        <Text style={styles.submitText}>Close</Text>
                    </Pressable>
                    </View>
                </ScrollView>

            </View>
        </View>
            
      
    );
  }

  return (
    <View style={styles.farBackView}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Fitness APP</Text>
      </View>
      <View style={styles.container}>
        <Pressable style={styles.basicButtons} onPress={showDataInput}>
          <Text style={styles.submitText}>Add a New Day</Text>
        </Pressable>
        <ScrollView style={styles.scrollViewStyle}>
          {notes.map((note) => (
            <Pressable style={styles.dataValue} key={`${note.id}`} onPress={() => removeDayValue(note)}>
              <View style={styles.finalCalcView}>
                <Text style={styles.finalCalText }>Remaining Calories of the Day</Text>
              </View>
              <Text style={styles.dateText}>{note.date}</Text>
              <Text style={styles.calText}>{note.getValue}</Text>
            </Pressable>
          ))}

        </ScrollView>

      </View>
      
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  farBackView: {
    backgroundColor: "#ff5349"
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5349',
  },
  container: {
    paddingTop: 5,
    paddingBottom: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 25,
    margin: 5,
    color: "white",
    backgroundColor: "#ff5349",
    fontWeight: "bold",
  },
  basicButtons: {
    width: '70%',
    backgroundColor: "#ff5349",
    borderRadius: 10,
    padding: 5,
    margin: 10,
  },
  submitText: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  headerContainer: {
    paddingTop: 5,
    width: '100%',
  },
  scrollViewStyle: {
    width: '100%',
    marginTop: 5,
  },
  dataValue: {
    margin: 20,
    borderColor: "#ff5349",
    borderWidth: 5,
    borderRadius: 10,
    padding: 5,
  },
  finalCalText: {
    margin: 10,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  dateText: {
    textAlign: 'center',
    color: '#808080',
    fontSize: 19,
    fontWeight: 'bold'
  },
  calText: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
  },
  calculatedNumber: {
    fontsize: 50,
    color: 'black',
    fontWeight: 'bold',
  },
  inputText: {
    fontSize: 30,
    backgroundColor: "#D3D3D3",
    padding: 5,
    borderWidth: 2,
    borderColor: 'black',
  },
  workoutButtonsContainer: {
    flexDirection: 'row',

  },
  workoutButtons: {
    backgroundColor: "#D3D3D3",
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 9,
    margin: 9,
    marginHorizontal: 24,
  },
  pressed: {
    backgroundColor: "grey",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5349',
  },
  finalCalcView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5349',
    borderRadius: 10,
    margin: 5,
  },
});


