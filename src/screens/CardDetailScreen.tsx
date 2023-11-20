import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';
import BackgroundTimer from 'react-native-background-timer';

import type { CardStackParamList } from '../types/navigation';
import TextField from '../components/TextField';
import { useAppDispatch } from '../hooks/redux';
import { countdown, setTimerIntervalId } from '../store/cardSlice';

type ScreenProps = NativeStackScreenProps<CardStackParamList, 'CardDetail'>;
type NavigationProps = NativeStackNavigationProp<CardStackParamList>;

const CardDetailScreen = ({ route }: ScreenProps) => {
  const { card, lastUpdate } = route.params;

  const navigation = useNavigation<NavigationProps>();
  const [time, setTime] = useState(lastUpdate);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const intervalId = BackgroundTimer.setInterval(() => {
      setTime(secs => secs + 1);
    }, 1000);

    dispatch(setTimerIntervalId({ id: card.id, intervalId }));

    return () => {
      BackgroundTimer.clearInterval(intervalId);
      dispatch(setTimerIntervalId({ id: card.id, intervalId: null }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: props => (
        <HeaderBackButton
          {...props}
          onPress={() => {
            dispatch(countdown({ id: card.id, time: time }));
            navigation.goBack();
          }}
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, time]);

  return (
    <SafeAreaView style={styles.container}>
      {card.fields.map((field, i) => (
        <TextField
          key={i}
          text={field}
          idx={i}
          id={card.id}
          clearCountdown={setTime}
        />
      ))}
      <Text>{time}</Text>
    </SafeAreaView>
  );
};

export default CardDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
