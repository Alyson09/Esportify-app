import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BlockListScreen } from '../screens/BlockListScreen'
import { BlocksDetailScreen } from '../screens/BlocksDetailScreen'

const Stack = createNativeStackNavigator()

export default function StackRoutes() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="BlockListScreen"
                component={BlockListScreen}
                options={{
                    title: 'Lista de Quadras'
                }}
            />
            <Stack.Screen
                name="BlocksDetailScreen"
                component={BlocksDetailScreen}
                options={{
                    title: 'Quadra'
                }}
            />
        </Stack.Navigator>
    )
}
