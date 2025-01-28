import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function Home() {
  return (
    <View className='container mx-auto'>
      <View className='p-[20px]'>
        <Text className='text-3xl uppercase'>Welcome To Athena POS!</Text>
      </View>
      <View className='flex-row justify-center gap-5 mb-16'>
        <Link href={'/login'} asChild>
          <TouchableOpacity className=''>
            <Text> Login </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}