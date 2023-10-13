import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const BusTripDetails = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../Images/abood.png')} style={styles.HomeImage} />
            <Text style={styles.text}>2023 Abood couch</Text>

            <View style={styles.departureTime}>
                <Text style={styles.textBold}>5:30<Text style={styles.textSmall}> AM</Text></Text>
                <View style={styles.line}></View>
                <Text style={styles.textCenter}>12h30min</Text>
                <View style={styles.line}></View>
                <Text style={styles.textBold}>8:40<Text style={styles.textSmall}> PM</Text></Text>
            </View>

            <View style={styles.routeDetails}>
                <Text>Chalinze, Morogoro</Text>
                <Text>Dodoma, Singida, Mwanza</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <View style={styles.moreDetails}>
                    <Text>View details</Text>
                    <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />
                </View>
                <View>
                    <Text style={styles.textBold}>75000 Tsh</Text>
                    <Text>One way</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
        elevation: 3,
    },
    HomeImage: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 10,
        color: 'gray',
        marginTop: -10,
    },
    textBold: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        marginTop: -10,
    },
    textSmall: {
        fontSize: 14,
        color: 'black',
        marginTop: -10,
    },
    textCenter: {
        fontSize: 14,
        color: 'gray',
        marginTop: -10,
    },
    departureTime: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
        width: '50%',
    },
    line: {
        width: 20,
        height: 1,
        backgroundColor: 'gray',
        marginBottom: 5,
        marginHorizontal: 5,
    },
    routeDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '88%',
        marginTop: 10,
        marginBottom: 20,
    },
    moreDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFCCA8',
        borderRadius: 10,
        width: 150,
        height: 25,
    },
});

export default BusTripDetails;
