import React, { useState } from "react"
import { StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { router, Stack } from "expo-router"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Login } from "@/lib/data/auth"

export default function LoginScreen() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: Login,
    onSuccess: (data) => {
      // Handle successful login
      console.log("Login successful", data)
      queryClient.setQueryData(["user"], data)
      // Navigate to the main app screen or update app state
      router.push('/(tabs)')
    },
    onError: (error) => {
      // Handle login error
      console.error("Login failed", error)
      // Show error message to the user
    },
  })

  const handleLogin = () => {
    loginMutation.mutate({ email, password })
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Welcome Back
        </ThemedText>

        <ThemedView style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </ThemedView>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loginMutation.isPending}>
          <ThemedText style={styles.loginButtonText}>{loginMutation.isPending ? "Logging in..." : "Log In"}</ThemedText>
        </TouchableOpacity>

        {loginMutation.isError && <ThemedText style={styles.errorText}>Login failed. Please try again.</ThemedText>}

        <ThemedText style={styles.forgotPassword}>Forgot your password?</ThemedText>
      </ThemedView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#F0F0F0",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  loginButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    marginTop: 15,
    color: "#007AFF",
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
})

