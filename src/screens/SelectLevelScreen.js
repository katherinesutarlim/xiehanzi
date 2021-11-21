import React from "react"
import { FlatList, StyleSheet, Text, TouchableOpacity, useColorScheme } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const styles = StyleSheet.create({
    lightFont: {
        color: "white"
    },
    darkButton: {
        borderColor: "#ffffff11",
        borderWidth: 1
    },
    lightButton: {
        borderColor: "#00000011",
        borderWidth: 1
    },
    button: {
        flex: 1,
        paddingVertical: 16,
        alignItems: "center",
        textAlign: "center"
    }
});

const SelectLevelScreen = ({navigation}) => {
    const colorScheme = useColorScheme();
    return (
        <SafeAreaView>
            <FlatList
                data={[1, 2, 3, 4, 5, 6].map(level => ({ title: `HSK ${level}`, type: 'hsk', level }))}
                ListHeaderComponent={null}
                renderItem={(({item}) => (
                    <TouchableOpacity style={[styles.button, colorScheme === "dark" ? styles.darkButton : styles.lightButton]} onPress={() => navigation.navigate("Practice", item)}>
                        <Text style={colorScheme === 'dark' && styles.lightFont}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            />
        </SafeAreaView>
    )
}

export default SelectLevelScreen;