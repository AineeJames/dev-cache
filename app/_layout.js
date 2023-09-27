import { Slot } from 'expo-router';
import { TodosProvider } from '../context/TodosContext';
import { View } from 'react-native';
import { colors } from '../constants/colors';

export default function HomeLayout() {
  return (
    <View style={{ width: "100%", height: "100%", backgroundColor: colors.bg}}>
    <TodosProvider>
        <Slot />
    </TodosProvider>
    </View>
  );
}
