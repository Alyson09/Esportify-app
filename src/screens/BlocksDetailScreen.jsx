import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import HorarioSelector from '../components/HorarioSelector';
import axios from 'axios';

export const BlocksDetailScreen = () => {
    const route = useRoute();
    const { infoBlocks } = route.params;
    const [dayInfo, setDayInfo] = useState([]);

    useEffect(() => {
        fetchBlocks();
    }, []);

    const fetchBlocks = async () => {
        try {
            const response = await axios.get(
                `https://espority-backend.onrender.com/quadra/horarios/${infoBlocks.id}`,
                {
                    headers: {
                        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxOGZhNTYyLWQzMTAtN2JiMi05ODI4LTE4MDc0YTJlY2YyMSIsImlhdCI6MTcxNjQ2NjY5NywiZXhwIjoxNzE2NDcwMjM3fQ.HL_LmR94rWeuruJttQEYi9hz-s0sI7Poy485SLq3dL8",
                    },
                }
            );
            setDayInfo(response.data.times);
            console.log(response.data.times);
        } catch (error) {
            console.error('Erro ao realizar a solicitação:', error);
        }
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
                        {dayInfo.horario_inicial}
                    </Text>
                </View>
                {dayInfo && dayInfo.length > 0 ? (
                    dayInfo.map((day, index) => (
                        <HorarioSelector
                            key={index}
                            horarioInicio={day.horario_inicial}
                            horarioTermino={day.horario_final}
                        />
                    ))
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
});
