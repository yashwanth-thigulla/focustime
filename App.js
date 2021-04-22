import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/features/focus/focus';
import { Timer } from './src/features/timer/Timer';
import { colors } from './src/utils/colors';
import { fontSizes, spacing } from './src/utils/sizes';


export default function App() {
  const [focusSubject, setfocusSubject] = useState(null);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer focusSubject={focusSubject} onTimerend={()=>{
          setfocusSubject(null);
        }} />
      ) : (
        <Focus addsubject={setfocusSubject} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});
