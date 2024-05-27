import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BlockListScreen } from '../screens/BlockListScreen';
import { BlocksDetailScreen } from '../screens/BlocksDetailScreen';
import TelaLogin  from '../components/TelaLogin';
import {TelaCadastro} from '../screens/TelaCadastro';

const Stack = createNativeStackNavigator()

export default function StackRoutes() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={TelaLogin}
                options={{
                    title: 'Login'
                }}
            />
            <Stack.Screen
                name="Cadastro"
                component={TelaCadastro}
                options={{
                    title: 'Cadastro'
                }}
            />
         
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
