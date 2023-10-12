import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CustomHeader = ({ navigation }) => {
    return (
        <View style={styles.headerContainer}>
            
            {/* Back Icon */}
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.leftIcon}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>

            <View style={styles.textHeaderView}>
            <Text style={styles.headerTitle}>Dar es Salaam-Mwanza</Text> 
            <Text style={styles.headerTitle2}>Fri Oct 6, 1 Passenger</Text>
            </View>
            {/* Share Icon */}
            <TouchableOpacity onPress={() => {/* Handle share functionality */}} style={styles.rightIcon}>
                <Ionicons name="share-social" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: '#f4511e',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
    },
    leftIcon: {
        position: 'absolute',
        left: 10,
    },
    rightIcon: {
        position: 'absolute',
        right: 10,
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff',
    },
    headerTitle2: {
        fontWeight: '300',
        fontSize: 14,
        color: '#fff',
    },
    textHeaderView:{
        flex: 1,
        flexDirection: 'column',
        marginLeft: 150,


    }
});

export default CustomHeader;
