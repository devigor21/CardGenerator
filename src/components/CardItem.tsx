import { memo, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackgroundTimer from 'react-native-background-timer';

import type { CardStackParamList } from '../types/navigation';
import type { Card } from '../types/card';
import { useAppDispatch } from '../hooks/redux';
import { countdown, setTimerIntervalId } from '../store/cardSlice';

type Props = { card: Card };
type NavigationProps = NativeStackNavigationProp<CardStackParamList>;

const CardItem = ({ card }: Props) => {
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const [lastUpdate, setLastUpdate] = useState<number>(card.lastUpdate);

  useEffect(() => {
    setLastUpdate(card.lastUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  useEffect(() => {
    dispatch(countdown({ id: card.id, time: lastUpdate }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastUpdate]);

  useEffect(() => {
    const intervalId = BackgroundTimer.setInterval(() => {
      setLastUpdate(secs => secs + 1);
    }, 1000);

    dispatch(setTimerIntervalId({ id: card.id, intervalId }));

    return () => {
      BackgroundTimer.clearInterval(intervalId);
      dispatch(setTimerIntervalId({ id: card.id, intervalId: null }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate('CardDetail', { card, lastUpdate });
        // dispatch(setTimerIntervalId({ id: card.id, intervalId: null }));
      }}>
      <View style={styles.item}>
        {card.fields.map((field, i) => (
          <Text key={i}>{field}</Text>
        ))}
        <Text>Обновлялось {lastUpdate} секунд назад</Text>
      </View>
    </Pressable>
  );
};

export default memo(CardItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  item: {
    height: 120,
  },
});
