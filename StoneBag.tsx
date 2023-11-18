import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

interface StoneBagProps {}

const StoneBag: React.FC<StoneBagProps> = () => {
  const colors = ['Red', 'Black', 'Green', 'Blue', 'White'];

  const [drawnStones, setDrawnStones] = useState<string[]>([]);
  const [stones, setStones] = useState<string[]>([]);
  const [stoneCounts, setStoneCounts] = useState<{ [color: string]: number }>({
    Red: 5,
    Black: 5,
    Green: 5,
    Blue: 5,
    White: 5,
  });
  const [stonesToDraw, setStonesToDraw] = useState<number>(1);

  const initializeBag = () => {
    const initialStones: string[] = [];
    Object.entries(stoneCounts).forEach(([color, count]) => {
      for (let i = 0; i < count; i++) {
        initialStones.push(color);
      }
    });
    setStones(initialStones);
  };

  const pullStone = () => {
    const pulledStones: string[] = [];

    for (let i = 0; i < stonesToDraw; i++) {
      if (stones.length > 0) {
        const randomIndex = Math.floor(Math.random() * stones.length);
        const selectedStone = stones.splice(randomIndex, 1)[0];
        pulledStones.push(selectedStone);
      } else {
        pulledStones.push('No stones left in the bag');
      }
    }

    setDrawnStones(pulledStones);

    // Simulate some action based on the pulled stones (e.g., check theme)
    console.log(`Pulled stones: ${pulledStones.join(', ')}`);
  };

  const expendStone = () => {
    if (drawnStones.length > 0) {
      const stoneToExpend = drawnStones.pop()!;
      // Simulate some action based on expended stone
      console.log(`Expend stone: ${stoneToExpend}`);
    } else {
      console.log('No stones to expend');
    }
  };

  const rummageStone = (desiredColor: string) => {
    if (drawnStones.length > 0) {
      const selectedStone = drawnStones.pop()!;
      if (selectedStone === desiredColor) {
        // Return the stone to the pouch
        console.log(`Rummaged and got the desired color: ${selectedStone}`);
      } else {
        // Expend the stone
        console.log(`Rummaged, but got the wrong color. Expend: ${selectedStone}`);
        expendStone();
      }
    } else {
      console.log('No stones to rummage');
    }
  };

  const removeStone = () => {
    if (drawnStones.length > 0) {
      const stoneToRemove = drawnStones.pop()!;
      // Return the stone to the Font pool
      console.log(`Remove stone: ${stoneToRemove}`);
    } else {
      console.log('No stones to remove');
    }
  };

  const emptyPouch = () => {
    setDrawnStones([]);
    // Some additional action or logic if needed
    console.log('Emptied pouch');
  };

  const updateStoneCount = (color: string, count: number) => {
    setStoneCounts((prevCounts) => ({ ...prevCounts, [color]: count }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.drawnStones}>
        {drawnStones.length > 0 ? `Drawn Stones: ${drawnStones.join(', ')}` : ''}
      </Text>
      <View style={styles.settingsContainer}>
        {colors.map((color) => (
          <View key={color} style={styles.colorSetting}>
            <Text style={styles.colorLabel}>{color}:</Text>
            <TextInput
              style={styles.colorInput}
              keyboardType="numeric"
              value={stoneCounts[color].toString()}
              onChangeText={(text) => updateStoneCount(color, parseInt(text, 10))}
            />
          </View>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Stones to Draw"
        keyboardType="numeric"
        value={stonesToDraw.toString()}
        onChangeText={(text) => setStonesToDraw(parseInt(text, 10))}
      />
      <TouchableOpacity style={styles.drawButton} onPress={() => initializeBag()}>
        <Text style={styles.buttonText}>Initialize Bag</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => pullStone()}>
        <Text style={styles.buttonText}>Pull</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => expendStone()}>
        <Text style={styles.buttonText}>Expend</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => rummageStone('Green')}>
        <Text style={styles.buttonText}>Rummage (Green)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => removeStone()}>
        <Text style={styles.buttonText}>Remove</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => emptyPouch()}>
        <Text style={styles.buttonText}>Empty Pouch</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawnStones: {
    fontSize: 20,
    marginBottom: 20,
  },
  settingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  colorSetting: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  colorLabel: {
    fontSize: 18,
    marginHorizontal: 5,
  },
  colorInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 40,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    textAlign: 'center',
    width: 100,
  },
  drawButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default StoneBag;
