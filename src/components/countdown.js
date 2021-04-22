import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';

const formatTime = (time) => (time < 10 ? `0${time}` : time);

const minutsTomilliseconds = (min) => min * 60 * 1000;

export const Countdown = ({ minuts = 2, isPaused, onProgress ,onEnd }) => {
  const [millis, setMillis] = useState(minutsTomilliseconds(minuts));
  const intervell = React.useRef(null);

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(intervell.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      onProgress(timeLeft/minutsTomilliseconds(minuts))
      return timeLeft;
    });
  };

   useEffect(() => {
    setMillis(minutsTomilliseconds(minuts))
    },[minuts]);
  useEffect(() => {
    console.log(millis)
    },[millis]);
  useEffect(() => {
    if (isPaused) {
      if(intervell.current) clearInterval(intervell.current);
      return;
    }
    intervell.current = setInterval(countDown, 1000);

    return () => clearInterval(intervell.current);
  },[isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <Text style={styles.text}>
      {formatTime(minute)} : {formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.md,
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
