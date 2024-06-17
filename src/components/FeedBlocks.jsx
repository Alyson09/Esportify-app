import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, Image, FlatList } from 'react-native';
import axios from 'axios';
import CardBlock from './CardBlock';
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

    //fazer integração com a compania e passar as informações abaixo 

    const renderFavoriteItem = ({ item }) => (
        <View style={styles.favoriteItemContainer}>
            <Image
                source={{ uri: item.imageUrl }}
                style={styles.favoriteImage}
            />
            <Text style={styles.favoriteName}>{item.name}</Text>
        </View>
    );

    //depois da integração feita só retirar esses dados
    const favoriteItems = [
        { id: 1, name: 'Quadra do seu zé', imageUrl: 'https://i.imgur.com/0mpg3sp.jpeg' },
        { id:2, name: 'HARPA.AI ARENA', imageUrl: 'https://i.imgur.com/0mpg3sp.jpeg' },
        { id:3, name: 'Alyson e Cia. Volei', imageUrl: 'https://i.imgur.com/0mpg3sp.jpeg' },
        { id:4, name: 'Goat Arena', imageUrl: 'https://i.imgur.com/0mpg3sp.jpeg' },
        { id:5, name: 'Maracanã', imageUrl: 'https://i.imgur.com/0mpg3sp.jpeg' },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.greetingText}>Olá, Alyson!</Text>
            <View style={styles.favoritesContainer}>
                <Text style={styles.favoritesTitle}>Seus Favoritos:</Text>
                <FlatList
                    data={favoriteItems}
                    horizontal
                    renderItem={renderFavoriteItem}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
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
        backgroundColor: '#f8f8f8',
    },
    greetingText: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 16,
        marginTop:'5%'
    },
    favoritesContainer: {
        marginBottom: 20,
    },
    favoritesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 16,
        marginBottom: 10,
    },
    favoriteItemContainer: {
        alignItems: 'center',
        marginHorizontal: 10,
    },
    favoriteImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 5,
    },
    favoriteName: {
        textAlign: 'center',
        fontSize: 14,
    },
});
