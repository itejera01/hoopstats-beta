import React from "react";
import { Tabs } from "expo-router";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors.selected,
          tabBarInactiveTintColor: Colors.notSelected,
          tabBarStyle: {
            backgroundColor: Colors.menuBackground,
            borderTopWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home-sharp" : "home-outline"}
                color={color}
                size={25}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="jugador"
          options={{
            headerShown: false,
            title: "",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "book" : "book-outline"}
                color={color}
                size={25}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="partidos"
          options={{
            headerShown: false,
            title: "",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "trophy" : "trophy-outline"}
                color={color}
                size={25}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="historial"
          options={{
            headerShown: false,
            title: "",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "archive" : "archive-outline"}
                color={color}
                size={25}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
