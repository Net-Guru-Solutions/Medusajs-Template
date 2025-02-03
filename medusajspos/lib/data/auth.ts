import AsyncStorage from '@react-native-async-storage/async-storage';
import { sdk } from '../config';
import { router } from 'expo-router';

export async function Login({ email, password }: { email: string, password: string }) {
    try {
        const response = await sdk.auth.login("user", "emailpass", { email, password });

        // Store the token or user data in AsyncStorage
        await AsyncStorage.setItem('userToken', JSON.stringify(response));

        return response;
    } catch (error) {
        throw new Error("Login failed");
    }
}


export const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    router.push('/'); // Redirect to login screen
};
