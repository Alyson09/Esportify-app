import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import HorarioSelector from '../components/HorarioSelector';
import axios from 'axios';

export const BlocksDetailScreen = ({ route }) => {
    const [blockInfo, setBlockInfo] = useState(null);
    const detailInfoBlocks = route.params.infoBlocks;

    useEffect(() => {
        fetchBlockInfo();
    }, []);

    const fetchBlockInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/Block/${detailInfoBlocks.id}`);
            setBlockInfo(response.data);
        } catch (error) {
            console.error('Erro ao buscar informações do bloco:', error);
        }
    };

    return (
        <ScrollView style={styles.mainContainer}>
            {blockInfo && (
                <View style={styles.headerContainer}>
                    <View style={styles.bannerBlockContainer}>
                        <Image
                            source={{ uri: blockInfo.banner }}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textTitle}>{blockInfo.title}</Text>
                    </View>
                    <View>
                        <Text style={styles.sectionContainer}>{blockInfo.rua}, n°{blockInfo.numero}</Text>
                        {blockInfo.days.map((day, index) => (
                            <HorarioSelector key={index} dia={day.dia} horarios={day.horarios} />
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