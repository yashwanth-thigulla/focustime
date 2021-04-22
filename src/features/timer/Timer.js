import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { Button } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { colors } from '../../utils/colors';
import { fontSizes, spacing } from '../../utils/sizes';
import { Countdown } from '../../components/countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

export const Timer = ({ focusSubject,onTimerend}) => {
  useKeepAwake();
  const [minuts, setminuts] = useState(0.1);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setprogress] = useState(1);
  const onProgress = (progress) => {
    setprogress(progress);
  };
  const vibrate=()=>{
    if (Platform.OS==='ios'){
      const intervel=setInterval(()=>Vibration.vibrate(),1000);
      setTimeout(()=>clearInterval(intervel),10000);
    }
    else{
      Vibration.vibrate(2000);
    }
  }
  const onEnd=()=>{
    vibrate();
    setminuts(0.1);
    setprogress(1);
    setIsStarted(false);
    onTimerend();
  }
  const changeTime = (min) => {
    setminuts(min);
    setprogress(1);
    setIsStarted(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minuts={minuts}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>focus on</Text>
        <Text style={styles.task}>{focusSubject}</Text>
        <View style={{ paddingTop: spacing.sm }}>
          <ProgressBar
            progress={progress}
            color="#5E84E2"
            style={{ height: 10 }}
          />
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <Timing changeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton
            title="Pause"
            size={80}
            onPress={() => setIsStarted(false)}
          />
        ) : (
          <RoundedButton
            title="Start"
            size={80}
            onPress={() => setIsStarted(true)}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
