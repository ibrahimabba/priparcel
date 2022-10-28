import React from 'react'
import { View, Text } from "react-native";
import { useSelector } from "../../hooks/useRedux";
import { selectTheme } from '../../store/reducers/app/appSlice';

export default function Capture() {
    const theme = useSelector(selectTheme)
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: theme === 'dark' ? 'white' : 'black' }}>Capture{' ' + theme}</Text></View>
    )
}
