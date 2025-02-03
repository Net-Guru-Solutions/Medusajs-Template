import React from 'react'
import { Tabs } from 'expo-router'
import { TabBarIcon } from '@/components/TabBarIcon'

export default function _layout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false, tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />, }} />
            <Tabs.Screen name="orders" options={{ title: 'Tab One', tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />, }} />
            <Tabs.Screen name="customers" options={{ title: 'Tab One', tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />, }} />
        </Tabs>
    )
}