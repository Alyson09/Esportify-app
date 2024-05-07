import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import HorarioSelector from '../components/HorarioSelector';
import axios from 'axios';

export const BlocksDetailScreen = () => {
    const [blockInfo, setBlockInfo] = useState(null);
    const [dayInfo, setDayInfo] = useState(null);

    useEffect(() => {
        fetchBlockInfo();
    }, []);

    const fetchBlockInfo = async () => {
        try {
            const res = await axios.get(`https://espority-backend.onrender.com/quadra`);
            setBlockInfo(res.data.quadras);
            console.log(res.data);
            await fetchDayInfo(res.data.id);
        } catch (error) {
            console.error('Erro ao buscar informações da api:', error);
        }
    };
    const fetchDayInfo = async () => {
        try {
            const resDay = await axios.get(`https://espority-backend.onrender.com/horarios_aluguel/018f1878-d22c-7949-b1df-13fc65966ba1`);
            setDayInfo(resDay.data.horarios_aluguel);
            console.log(resDay.data);
        } catch (error) {
            console.error('Erro ao buscar informações da api:', error);
        }
    };

    return (
        <ScrollView style={styles.mainContainer}>
            {blockInfo && dayInfo && (
                <View style={styles.headerContainer}>
                    <View style={styles.bannerBlockContainer}>
                        <Image
                            source={{ uri: "https://i.imgur.com/KLNin1G.jpeg" }}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textTitle}>{blockInfo.nome}</Text>
                    </View>
                    <View>
                        <Text style={styles.sectionContainer}>{blockInfo.endereco.rua}, n° {blockInfo.endereco.numero}</Text>
                        {dayInfo.map((index) => (
                            <HorarioSelector key={index} dia={dayInfo.dia_semana.desc_dia} horarioInicio={dayInfo.horario_inicial} horarioTermino={dayInfo.horario_final} />
                        ))}
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        padding: 5,
        margin: 5 
    },
    headerContainer: {
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: 10,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6
    },
    bannerBlockContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4
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
    sectionContainer: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 14,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        marginBottom: 10,
    },
    textContainer: {
        alignItems: 'center'
    }
})