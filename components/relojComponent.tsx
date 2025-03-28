import { Colors } from '@/constants/Colors';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react';

export interface RelojComponentRef {
  getTime: () => { minutes: number; seconds: number };
}

const RelojComponent = forwardRef<RelojComponentRef>((_, ref) => {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prev) => {
          const newSeconds = prev.seconds + 1;
          const newMinutes = newSeconds === 60 ? prev.minutes + 1 : prev.minutes;
          return {
            minutes: newMinutes,
            seconds: newSeconds % 60,
          };
        });
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  const formatTime = (value: number) => (value < 10 ? `0${value}` : value);

  useImperativeHandle(ref, () => ({
    getTime: () => time,
  }));

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={styles.statsText}>
        {formatTime(time.minutes)}:{formatTime(time.seconds)}
      </Text>
      <TouchableOpacity
        style={[styles.stats, { backgroundColor: Colors.buttonBackground }]}
        onPress={() => {
          setIsRunning((prev) => !prev);
        }}
      >
        <Text style={styles.statsText}>{isRunning ? 'Pausar' : 'Continuar'}</Text>
      </TouchableOpacity>
    </View>
  );
});

export default RelojComponent;

const styles = StyleSheet.create({
  stats: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  statsText: {
    fontSize: 16,
    color: Colors.text,
  },
});