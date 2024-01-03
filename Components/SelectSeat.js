    import React, { useState, useEffect } from 'react';
    import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
    import { useNavigation } from '@react-navigation/native';
    import io from 'socket.io-client';
    import { MaterialCommunityIcons } from '@expo/vector-icons';

    const SeatSelection = ({ companyName, busId, seatArrangement, scheduleId }) => {
      const [selectedSeats, setSelectedSeats] = useState([]);
      const [showOverlay, setShowOverlay] = useState(false);
      const [busDetails, setBusDetails] = useState({
        seatConfiguration: '2-2',
        numberOfSeats: 0,
      });
      const [seats, setSeats] = useState([]);
      const [socket, setSocket] = useState(null);

      useEffect(() => {
        const newSocket = io('https://connect-ticketing.work.gd:3000');
        setSocket(newSocket);

        return () => {
          newSocket.disconnect();
        };
      }, []);

      useEffect(() => {
        if (!socket) return;

        socket.on('seatSelected', (data) => {
          const { seatId, userId } = data;
          const updatedSeats = seats.map((seat) => ({
            ...seat,
            selected: seat.id === seatId,
          }));
          setSeats(updatedSeats);
        });

        return () => {
          socket.off('seatSelected');
        };
      }, [socket, seats]);

      useEffect(() => {
        if (!socket || !busId) return;

        socket.emit('joinRoom', busId);

        const fetchBusDetails = async () => {
          try {
            const response = await fetch(`https://connect-ticketing.work.gd/api/buses/${busId}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setBusDetails(data);

            const initializedSeats = Array.from({ length: data.numberOfSeats }, (_, index) => ({
              id: (index + 1).toString(),
              available: Math.random() < 0.8,
            }));

            setSeats(initializedSeats);
          } catch (error) {
            console.error('Error fetching bus details:', error);
          }
        };

        fetchBusDetails();
      }, [busId, socket]);

      const handleSeatSelection = (seatId) => {
        const seatIndex = seats.findIndex((seat) => seat.id === seatId);
    
        if (seatIndex !== -1 && seats[seatIndex].available) {
          // Check if the seat is already selected
          const isSeatSelected = selectedSeats.includes(seatId);
    
          if (isSeatSelected) {
            // Deselect the seat by removing it from the selectedSeats array
            setSelectedSeats((prevSelectedSeats) =>
              prevSelectedSeats.filter((selectedSeat) => selectedSeat !== seatId)
            );
            setSeats((prevSeats) =>
              prevSeats.map((seat) =>
                seat.id === seatId ? { ...seat, selected: false } : seat
              )
            );
          } else {
            // Select the seat
            if (selectedSeats.length < 6) {
              setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seatId]);
              setShowOverlay(true);
              setSeats((prevSeats) =>
                prevSeats.map((seat) =>
                  seat.id === seatId ? { ...seat, selected: true } : seat
                )
              );
              console.log('Selected Seat Number:', seatId);
            } else {
              Alert.alert('Alert', 'You cannot select more than 6 seats.');
            }
          }
        } else {
          // Handle seat not available
        }
      };
    
      const renderSeats = () => {
        const seatConfig = seatArrangement || '2-2';
        const [left, right] = seatConfig.split('-');
    
        return Array.from({ length: busDetails.numberOfSeats / (parseInt(left) + parseInt(right)) }, (_, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            {Array.from({ length: parseInt(left) + 1 + parseInt(right) }, (_, colIndex) => {
              const seatIndex = rowIndex * (parseInt(left) + 1 + parseInt(right)) + colIndex;
              const isLeftSeat = colIndex < parseInt(left);
              const isRightSeat = colIndex > parseInt(left);
              const isAisle = colIndex === parseInt(left);
              const marginLeft = isLeftSeat ? 5 : isAisle ? 20 : 0;
              const marginRight = isRightSeat ? 5 : isAisle ? 20 : 0;
    
              return (
                <View key={colIndex} style={{ ...styles.seatContainer, marginLeft, marginRight }}>
                  {!isAisle && (
                    <TouchableOpacity
                      onPress={() => {
                        if (seats[seatIndex]?.available) handleSeatSelection(seats[seatIndex]?.id);
                      }}
                      disabled={!seats[seatIndex]?.available}
                    >
                      <MaterialCommunityIcons
                        name={seats[seatIndex]?.selected ? 'sofa-single' : 'sofa-single-outline'}
                        size={40}
                        color={seats[seatIndex]?.available ? '#FF7927' : 'lightgray'}
                      />
                    </TouchableOpacity>
                  )}
                  {isAisle && <View style={styles.aisle}></View>}
                  {!isAisle && (
                    <Text style={styles.seatNumber}>{seats[seatIndex]?.id}</Text>
                  )}
                </View>
              );
            })}
          </View>
        ));
      };
      
      const navigation = useNavigation();

      const handleContinue = () => {
        // Pass parameters to the 'ClassCondition' screen
        navigation.navigate('ClassCondition', {
          busId: busId,
          seatNumbers: selectedSeats, // Pass an array of selected seats
          scheduleId: scheduleId,
          companyName: companyName,
        });
      };
    
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Select Seat</Text>

          <View style={styles.legendContainer}>
            <View style={styles.legend}>
              <View style={[styles.legendBox, styles.available]}></View>
              <Text>Available</Text>
            </View>
            <View style={styles.legend}>
              <View style={[styles.legendBox, styles.selected]}></View>
              <Text>Selected</Text>
            </View>
            <View style={styles.legend}>
              <View style={[styles.legendBox, styles.unavailable]}></View>
              <Text>Unavailable</Text>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.seatsContainer}>{renderSeats()}</View>
          </ScrollView>

          {showOverlay && (
            <TouchableOpacity style={styles.overlayButton} onPress={handleContinue}>
              <Text style={styles.overlayButtonText}>Continue</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
      },
      title: {
        fontWeight: '600',
        alignItems: 'center',
        fontSize: 20,
        marginBottom: 20,
      },
      seatsContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 20,
      },
      row: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      seat: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      },
      available: {
        backgroundColor: '#FF7927',
        borderColor: 'gray',
      },
      unavailable: {
        backgroundColor: 'lightgray',
      },
      selected: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#FF7927',
      },
      legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
      },
      legend: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
      },
      legendBox: {
        width: 20,
        height: 20,
        marginRight: 5,
        borderRadius: 10,
      },
      overlayButton: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        backgroundColor: '#152970',
        paddingVertical: 15,
        borderRadius: 10,
        marginHorizontal: 40,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
      },
      overlayButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
      },
      leftSeat: {
        margin: 2,
      },
      rightSeat: {
        margin: 2,
      },
    });

    export default SeatSelection;
