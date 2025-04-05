import { Colors } from '@/constants/Colors';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React, { useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import Ionicons from "@expo/vector-icons/Ionicons";

export interface RelojComponentRef {
  getTime: () => { minutes: number; seconds: number };
}

const RelojComponent = forwardRef<RelojComponentRef>((_, ref) => {
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [isEditingMinutes, setIsEditingMinutes] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('0');

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

  const handleMinutesSubmit = () => {
    const parsedMinutes = parseInt(inputMinutes, 10);
    if (!isNaN(parsedMinutes) && parsedMinutes >= 0) {
      setTime((prev) => ({ ...prev, minutes: parsedMinutes }));
    }
    setIsEditingMinutes(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.stats}>
        <TouchableOpacity
          onPress={() => {
            setIsRunning((prev) => !prev);
          }}
        >
          <Text style={styles.icons}>
            {isRunning ? (
              <Ionicons name={"pause"} color={Colors.selected} size={30} />
            ) : (
              <Ionicons name={"play"} color={Colors.menuBackground} size={30} />
            )}
          </Text>
        </TouchableOpacity>
        {isEditingMinutes ? (
          <TextInput
            style={styles.reloj}
            value={inputMinutes}
            onChangeText={setInputMinutes}
            keyboardType="numeric"
            onBlur={handleMinutesSubmit}
            onSubmitEditing={handleMinutesSubmit}
            autoFocus
          />
        ) : (
          <Text
            style={styles.reloj}
            onPress={() => {
              setIsEditingMinutes(true);
              setInputMinutes(time.minutes.toString());
            }}
          >
            {formatTime(time.minutes)}
          </Text>
        )}
        <Text style={styles.reloj}>:</Text>
        <Text style={styles.reloj}>{formatTime(time.seconds)}</Text>
        <TouchableOpacity
          onPress={() => {
            setIsRunning(false);
            setTime({ minutes: 0, seconds: 0 });
          }}
        >
          <Text style={styles.icons}>
            <Ionicons name={"stop"} color={Colors.menuBackground} size={30} />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default RelojComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  stats: {
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: Colors.text,
    maxWidth: 200,
  },
  reloj: {
    color: Colors.menuBackground,
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  icons: {
    marginHorizontal: 5,
  },
});