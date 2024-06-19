import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Pressable, Animated } from 'react-native';
import HorarioSelector from '../components/HorarioSelector';
import { Calendar } from 'react-native-calendars';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios'
import GetToken from '../components/GetToken';
import { getDayOfWeek } from '../Utils/getDayOfWeek'

//fazer integração com o endpoint de horários disponiveis, o componente de solicitar é montado na tela horarioselector

export function BlocksDetailScreen({ route }) {
    const [dayInfo, setDayInfo] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [times, setTimes] = useState([])
    const [dayOfWeek, setDayOfWeek] = useState('')
    const infosSelectedBlock = route.params.infoBlocks

    
    useEffect(() => {
      if (selectedDate) {
        fetchBlocks();
      }

    }, [selectedDate]);

    const fetchBlocks = async () => {
      const token = await GetToken();

      const response = await axios.get(`https://espority-backend.onrender.com/quadra/horarios/${infosSelectedBlock.id}`, {
        headers: {
          Authorization: token,
        }
      })

      setTimes(response.data.times)
    };

    const handleDateSelect = (day) => { 
        setSelectedDate(day.dateString);
        const dayOfTheWeek = getDayOfWeek(day.dateString)
        setDayOfWeek(dayOfTheWeek)
        setShowCalendar(false);
    };

    return (
        <ScrollView style={styles.mainContainer}>
            <Image
                source={{ uri: "https://i.imgur.com/0mpg3sp.jpeg" }}
                style={styles.image}
            />
            <View style={styles.headerContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.textTitle}>{infosSelectedBlock.nome}</Text>
                    <Text style={styles.textSubtitle}>
                        {infosSelectedBlock.complexo_esportivo.rua}, N° {infosSelectedBlock.complexo_esportivo.numero}
                        {'\n'}{infosSelectedBlock.complexo_esportivo.bairro}, {infosSelectedBlock.complexo_esportivo.cidade} - {infosSelectedBlock.complexo_esportivo.estado}
                    </Text>
                </View>
                <View style={styles.datePickerContainer}>
                    <Pressable style={styles.datePickerButton} onPress={() => setShowCalendar(true)}>
                        <FontAwesome name="calendar" size={16} color="white" style={styles.calendarIcon} />
                        <Text style={styles.datePickerButtonText}>
                            {selectedDate ? selectedDate : 'Selecione uma data'}
                        </Text>
                    </Pressable>
                </View>
                {showCalendar && (
                    <Calendar
                        onDayPress={handleDateSelect}
                        markedDates={{
                            [selectedDate]: { selected: true, marked: true }
                        }}
                        style={styles.calendar}
                    />
                )}
                {dayOfWeek ? (
                    <HorarioSelector
                        dayOfTheWeek={dayOfWeek}
                        times={times}
                        date={selectedDate}
                    />
                ) : (
                    <>
                        <Animated.Image
                            style={styles.bola}
                            resizeMode="contain"
                            source={require('../data/IMG/bola.png')}
                        />
                        <Text style={styles.textErro}>Não há horários disponíveis {'\n'} para a data selecionada.</Text>
                    </>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 6,
        marginHorizontal: 10,
        marginTop: -20,
        zIndex: 1,
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        alignItems: 'center',
    },
    image: {
        height: 200,
        width: '100%',
    },
    textContainer: {
        alignItems: 'flex-start',
        width: '100%',
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4E4E4E',
        marginTop: 10,
    },
    textSubtitle: {
        fontSize: 16,
        color: '#494949',
    },
    datePickerContainer: {
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
    },
    datePickerButton: {
        backgroundColor: '#4E4E4E',
        padding: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 180,
    },
    datePickerButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 5,
    },
    calendarIcon: {
        marginRight: 5,
    },
    calendar: {
        marginBottom: 10,
    },
    bola: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 15,
    },
    textErro: {
        textAlign: 'center',
        marginVertical: 20,
    },
});
