import React from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5 } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    }
})

const ToolButton = ({ name, color, onPress, style }) => (
    <View style={style}> 
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <FontAwesome5 name={name} color={color || 'black'} size={24} />
        </TouchableOpacity>
    </View>
)

export default ToolButton