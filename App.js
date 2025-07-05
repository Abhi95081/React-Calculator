import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handlePress = (value: string) => {
    setError(false);
    if (value === 'C') {
      setInput('');
    } else if (value === '=') {
      try {
        if (input.trim() === '') return;

        // Safe expression evaluator using Function (avoid eval)
        const result = Function('"use strict"; return (' + input + ')')();
        setInput(result.toString());
      } catch (err) {
        setError(true);
        setInput('Error');
      }
    } else {
      if (input === 'Error') setInput('');
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', 'C', '+'],
    ['='],
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.display}>
        <Text style={[styles.displayText, error && styles.errorText]}>
          {input}
        </Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((button) => (
              <TouchableOpacity
                key={button}
                style={[
                  styles.button,
                  button === '=' && styles.equalButton,
                  button === 'C' && styles.clearButton,
                ]}
                onPress={() => handlePress(button)}
              >
                <Text style={styles.buttonText}>{button}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'flex-end',
  },
  display: {
    minHeight: 120,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: '#111',
  },
  displayText: {
    color: '#fff',
    fontSize: 48,
  },
  errorText: {
    color: '#ff5252',
  },
  buttons: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    margin: 5,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 28,
  },
  clearButton: {
    backgroundColor: '#ff6f00',
  },
  equalButton: {
    backgroundColor: '#00695c',
  },
});
