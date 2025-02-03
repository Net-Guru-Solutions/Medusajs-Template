import React from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { getProductslist } from "@/lib/data/products";
import { Bell, User } from "lucide-react-native";

const categories = [
  { id: "coffee", icon: "☕", label: "Coffee" },
  { id: "beverages", icon: "🥤", label: "Beverages" },
  { id: "food", icon: "🍽️", label: "Food" },
  { id: "appetizer", icon: "🥗", label: "Appetizer" },
  { id: "bakeries", icon: "🥐", label: "Bakeries" },
  { id: "table", icon: "🪑", label: "Table" },
];

const coffeeTypes = ["All", "Ice Coffee", "American", "Café Noir", "Brewed Coffee", "Iced Coffee", "Flavored Coffee"];

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: getProductslist,
  });

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error fetching products.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Easy POS</Text>
        <View style={styles.headerRight}>
          <Text style={styles.headerLink}>Home</Text>
          <Text style={styles.headerLink}>Orders</Text>
          <Text style={styles.headerLink}>Customers</Text>
          <Text style={styles.headerLink}>Cashier</Text>
          <TouchableOpacity style={styles.newOrderButton}>
            <Text style={styles.newOrderButtonText}>New Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <User size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          {categories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.sidebarItem}>
              <Text style={styles.sidebarIcon}>{category.icon}</Text>
              <Text style={styles.sidebarLabel}>{category.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Coffee Type Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            {coffeeTypes.map((type) => (
              <TouchableOpacity key={type} style={styles.filterButton}>
                <Text style={styles.filterText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Products Grid */}
          <FlatList
            contentContainerStyle={styles.gridContainer}
            columnWrapperStyle={styles.columnWrapper}
            numColumns={4}
            data={data} // Use fetched product data
            keyExtractor={(item) => item.id} // Ensure the correct key extraction
            renderItem={({ item }) => (
              <View style={styles.productCard}>
                <Image source={{ uri: item.thumbnail! }} style={styles.productImage} />
                <Text style={styles.productName}>{item.title}</Text>
                {/* <Text style={styles.productPrice}>${item.price ? item.price.toFixed(2) : "N/A"}</Text> */}
                <View style={styles.quantityControl}>
                  <TouchableOpacity style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>1</Text>
                  <TouchableOpacity style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>

        {/* Right Sidebar - Order Summary */}
        <View style={styles.orderSummary}>
          <View style={styles.orderHeader}>
            <Text style={styles.orderTitle}>Current Order</Text>
            <Text style={styles.orderSubtitle}>Table 04</Text>
          </View>
          {/* Order items would go here */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  headerLink: {
    color: "#666",
  },
  newOrderButton: {
    backgroundColor: "#ff4d4f",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  newOrderButtonText: {
    color: "white",
    fontWeight: "500",
  },
  iconButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 80,
    backgroundColor: "white",
    padding: 8,
  },
  sidebarItem: {
    alignItems: "center",
    padding: 12,
    marginVertical: 4,
  },
  sidebarIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  sidebarLabel: {
    fontSize: 12,
    color: "#666",
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  filterScroll: {
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: "white",
    borderRadius: 20,
  },
  filterText: {
    color: "#666",
  },
  productsContainer: {
    flex: 1,
  },
  gridContainer: {
    padding: 12,
  },
  columnWrapper: {
    gap: 12,
    justifyContent: "flex-start",
  },
  productCard: {
    flex: 1,
    maxWidth: "23%",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  productImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: "#ff4d4f",
    marginBottom: 8,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
    padding: 4,
  },
  quantityButton: {
    padding: 4,
    width: 28,
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 16,
    color: "#666",
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "500",
  },
  orderSummary: {
    width: 300,
    backgroundColor: "white",
    padding: 16,
  },
  orderHeader: {
    marginBottom: 16,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  orderSubtitle: {
    color: "#666",
  },
});
