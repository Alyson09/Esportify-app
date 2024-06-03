import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { CardBlock } from './CardBlock';
import GetToken from '../components/GetToken';

export const FeedBlocks = () => {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        fetchBlocks();
    }, []);

    const fetchBlocks = async () => {
        try {
            const token = await GetToken();
            if (!token) {
                console.error("Token não encontrado");
                return;
            }
            const response = await axios.get('https://espority-backend.onrender.com/quadra', {
                headers: {
                    Authorization: `${token}`
                }
            });
            setBlocks(response.data.courts);
        } catch (error) {
            console.error('Erro ao realizar a solicitação:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {blocks.map((singleBlock) => (
                    <CardBlock
                        infoBlocks={singleBlock}
                        key={singleBlock.id}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

