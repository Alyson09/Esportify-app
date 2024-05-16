import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
//import HorarioSelector from '../components/HorarioSelector';
import axios from 'axios';

export const BlocksDetailScreen = () => {
    const [blockInfo, setBlockInfo] = useState(null);
    //const [dayInfo, setDayInfo] = useState(null);

    useEffect(() => {
        fetchBlockInfo();
    }, []);

    const fetchBlockInfo = async () => {
        try {
            const response = await axios.get(`https://espority-backend.onrender.com/quadra`, {
                headers: {
                    Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxOGY3ZWJiLTBlZWEtNzZkNy1hMDhmLWQ1NjdjNGUwNWJjNSIsImlhdCI6MTcxNTkwMjE5MCwiZXhwIjoxNzE1OTA1NzMwfQ.8lKqZmPPzL7WFVcB7QvAiOcw_00GG2j1_CDW5e6I2io"
                }
            });
            setBlockInfo(response.data.courts);
            console.log(response.data.courts);
        } catch (error) {
            console.error('Erro ao buscar informações do bloco:', error);
        }
    };

    // const fetchDayInfo = async () => {
    //     try {
    //         const resDay = await axios.get(`https://espority-backend.onrender.com/dias_semana`)
    //         setDayInfo(resDay.data);
    //     } catch (error) {
    //         console.error('Erro ao buscar informações do bloco:', error);
    //     }
    // };

    return (
        <ScrollView style={styles.mainContainer}>
            {blockInfo && (
                <View style={styles.headerContainer}>
                    <View style={styles.bannerBlockContainer}>
                        <Image
                            source={{ uri: "https://i.imgur.com/0mpg3sp.jpeg" }}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textTitle}>{blockInfo.nome}</Text>
                    </View>
                    <View>
                        <Text style={styles.sectionContainer}>rua, n° 150</Text>
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