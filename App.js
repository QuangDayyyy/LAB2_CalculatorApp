import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons'; 

export default function App() {
  const [theme, setTheme] = useState('light');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (value) => {
    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === 'DEL') {
      setInput(input.slice(0, -1));
    } else {
      if (
        ['+', '-', '*', '/'].includes(value) &&
        ['+', '-', '*', '/'].includes(input[input.length - 1])
      ) {
        return;
      }
      setInput(input + value);
    }
  };

  const calculateResult = () => {
    try {
      if (['+', '-', '*', '/'].includes(input[input.length - 1])) {
        setResult('Error');
        return;
      }
      const evalResult = new Function('return ' + input)();
      setResult(evalResult.toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <View style={theme === 'light' ? styles.lightContainer : styles.darkContainer}>
      <TouchableOpacity onPress={toggleTheme} style={styles.themeSwitch}>
        <Feather name={theme === 'light' ? 'sun' : 'moon'} size={24} color={theme === 'light' ? '#000' : '#fff'} />
      </TouchableOpacity>
      <Text style={theme === 'light' ? styles.lightInput : styles.darkInput}>
        {input || '0'}
      </Text>
      <Text style={theme === 'light' ? styles.lightResult : styles.darkResult}>
        {result || ''}
      </Text>
      <View style={styles.row}>
        <Button label="7" onPress={() => handleInput('7')} theme={theme} />
        <Button label="8" onPress={() => handleInput('8')} theme={theme} />
        <Button label="9" onPress={() => handleInput('9')} theme={theme} />
        <Button label="/" onPress={() => handleInput('/')} theme={theme} />
      </View>
      <View style={styles.row}>
        <Button label="4" onPress={() => handleInput('4')} theme={theme} />
        <Button label="5" onPress={() => handleInput('5')} theme={theme} />
        <Button label="6" onPress={() => handleInput('6')} theme={theme} />
        <Button label="*" onPress={() => handleInput('*')} theme={theme} />
      </View>
      <View style={styles.row}>
        <Button label="1" onPress={() => handleInput('1')} theme={theme} />
        <Button label="2" onPress={() => handleInput('2')} theme={theme} />
        <Button label="3" onPress={() => handleInput('3')} theme={theme} />
        <Button label="-" onPress={() => handleInput('-')} theme={theme} />
      </View>
      <View style={styles.row}>
        <Button label="0" onPress={() => handleInput('0')} theme={theme} />
        <Button label="." onPress={() => handleInput('.')} theme={theme} />
        <Button label="=" onPress={() => handleInput('=')} theme={theme} />
        <Button label="+" onPress={() => handleInput('+')} theme={theme} />
      </View>
      <View style={styles.row}>
        <Button label="C" onPress={() => handleInput('C')} theme={theme} />
        <Button label="DEL" onPress={() => handleInput('DEL')} theme={theme} />
      </View>
    </View>
  );
}

const Button = ({ label, onPress, theme }) => {
  return (
    <TouchableOpacity onPress={onPress} style={theme === 'light' ? styles.lightButton : styles.darkButton}>
      <Text style={theme === 'light' ? styles.lightButtonText : styles.darkButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  darkContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#333333',
    padding: 20,
  },
  themeSwitch: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  lightInput: {
    fontSize: 36,
    textAlign: 'right',
    color: '#000000',
  },
  darkInput: {
    fontSize: 36,
    textAlign: 'right',
    color: '#ffffff',
  },
  lightResult: {
    fontSize: 24,
    textAlign: 'right',
    color: '#000000',
    marginBottom: 20,
  },
  darkResult: {
    fontSize: 24,
    textAlign: 'right',
    color: '#ffffff',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  lightButton: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    margin: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  darkButton: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    margin: 5,
    backgroundColor: '#444444',
    borderRadius: 5,
  },
  lightButtonText: {
    fontSize: 24,
    color: '#000000',
  },
  darkButtonText: {
    fontSize: 24,
    color: '#ffffff',
  },
});
