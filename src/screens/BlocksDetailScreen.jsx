import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, Pressable, Animated } from 'react-native';
import HorarioSelector from '../components/HorarioSelector';
import { Calendar } from 'react-native-calendars';
import { FontAwesome } from '@expo/vector-icons';


//fazer integração com o endpoint de horários disponiveis, o componente de solicitar é montado na tela horarioselector

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
        const days = [ 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
        return days[date.getDay()];
    };

    const handleDateSelect = (day) => { 
        setSelectedDate(day.dateString);
        setShowCalendar(false);
    };

    const infoBlocks = {
        nome: 'Quadra do seu zé',
        complexo_esportivo: {
            rua: 'Rua Davia Bertona',
            numero: 10,
            bairro: 'Recanto Verde',
            cidade: 'Muriaé',
            estado: 'MG'
        },
    };

    return (
        <ScrollView style={styles.mainContainer}>
            <Image
                source={{ uri: "https://i.imgur.com/0mpg3sp.jpeg" }}
                style={styles.image}
            />
            <View style={styles.headerContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.textTitle}>{infoBlocks.nome}</Text>
                    <Text style={styles.textSubtitle}>
                        {infoBlocks.complexo_esportivo.rua}, N° {infoBlocks.complexo_esportivo.numero}
                        {'\n'}{infoBlocks.complexo_esportivo.bairro}, {infoBlocks.complexo_esportivo.cidade} - {infoBlocks.complexo_esportivo.estado}
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
                {dayInfo.length > 0 ? (
                    <HorarioSelector
                        horarios={dayInfo}
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
