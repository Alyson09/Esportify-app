import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Pressable } from 'react-native';
import HorarioSelector from '../components/HorarioSelector';
import { Calendar } from 'react-native-calendars';

export function BlocksDetailScreen() {
    const [dayInfo, setDayInfo] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);

    useEffect(() => {
        if (selectedDate) {
            fetchBlocks();
        }
    }, [selectedDate]);

    const fetchBlocks = () => {
        const staticData = [
            { dia_semana: 'Segunda', horario: '08:00' },
            { dia_semana: 'Segunda', horario: '10:00' },
            { dia_semana: 'Terça', horario: '12:00' },
            { dia_semana: 'Terça', horario: '14:00' },
            { dia_semana: 'Quarta', horario: '16:00' },
        ];
        const dayOfWeek = getDayOfWeek(selectedDate);
        const filteredData = staticData.filter(item => item.dia_semana === dayOfWeek);
        setDayInfo(filteredData);
    };

    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        const days = [ 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado','Domingo'];
        return days[date.getDay()];
    };

    const handleDateSelect = (day) => { 
        setSelectedDate(day.dateString);
        setShowCalendar(false);
    };

    const infoBlocks = {
        nome: 'Quadra Esportiva',
        complexo_esportivo: {
            rua: 'Rua das Palmeiras',
            numero: 123,
        },
    };

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.bannerBlockContainer}>
                    <Image
                        source={{ uri: "https://i.imgur.com/0mpg3sp.jpeg" }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.textTitle}>{infoBlocks.nome}</Text>
                    <Text style={styles.textSubtitle}>
                        {infoBlocks.complexo_esportivo.rua}, N° {infoBlocks.complexo_esportivo.numero}
                    </Text>
                </View>
                <Pressable style={styles.datePickerButton} onPress={() => setShowCalendar(true)}>
                    <Text style={styles.datePickerButtonText}>
                        {selectedDate ? selectedDate : 'Selecione uma data'}
                    </Text>
                </Pressable>
                {showCalendar && (
                    <Calendar
                        onDayPress={handleDateSelect}
                        markedDates={{
                            [selectedDate]: { selected: true, marked: true }
                        }}
                        style={styles.calendar}
                    />
                )}
                {dayInfo.length > 0 ? (
                    <HorarioSelector
                        horarios={dayInfo}
                    />
                ) : (
                    <Text style={styles.textSubtitle}>Carregando horários...</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        padding: 5,
        margin: 5,
    },
    headerContainer: {
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 6,
    },
    bannerBlockContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderRadius: 4,
    },
    image: {
        height: 200,
        width: 400,
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
    textContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    datePickerButton: {
        backgroundColor: '#4E4E4E',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    datePickerButtonText: {
        color: 'white',
        fontSize: 16,
    },
    calendar: {
        marginBottom: 10,
    },
});
