import { memo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { useAppDispatch } from '../hooks/redux';

import { updateField } from '../store/cardSlice';

type Props = {
  idx: number;
  text: string;
  id: string;
  clearCountdown: Function;
};

const TextField = ({ text, idx, id, clearCountdown }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(text);

  const dispatch = useAppDispatch();

  const handleTextPress = () => setIsEditing(true);

  const handleSaveText = () => {
    setIsEditing(false);
    dispatch(updateField({ text: inputText, idx, id }));
    clearCountdown(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isEditing ? (
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          onEndEditing={handleSaveText}
          autoFocus
        />
      ) : (
        <Pressable onPress={handleTextPress}>
          <Text>{inputText}</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default memo(TextField);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
