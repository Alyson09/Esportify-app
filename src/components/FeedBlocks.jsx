import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import {CardBlock} from './CardBlock';
import GetToken from '../components/GetToken';

const FeedBlocks = () => {
    const [blocks, setBlocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({})
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBlocks();
        getUserLogado()
    }, []);

    const fetchBlocks = async () => {
        try {
            const token = await GetToken();
            if (!token) {
                console.error("Token não encontrado");
                setError("Token não encontrado");
                setLoading(false);
                return;
            }
            console.log(token)
            const response = await axios.get('https://espority-backend.onrender.com/quadra', {
                headers: {
                    Authorization: `${token}`
                }
            });
            setBlocks(response.data.courts)
        } catch (error) {
            console.error('Erro ao realizar a solicitação:', error);
            setError('Erro ao realizar a solicitação');
        } finally {
            setLoading(false);
        }
    };

    const getUserLogado = async() => {
      try {
        const token = await GetToken();
        if (!token) {
            console.error("Token não encontrado");
            setError("Token não encontrado");
            setLoading(false);
            return;
        }
        const response = await axios.get('https://espority-backend.onrender.com/jogador/buscar-logado', {
            headers: {
                Authorization: `${token}`
            }
        });
        setUser(response.data.player);
      } catch (error) {
          console.error('Erro ao realizar a solicitação:', error);
          setError('Erro ao realizar a solicitação');
      } finally {
          setLoading(false);
      }
    }

    const renderFavoriteItem = ({ item }) => (
        <View style={styles.favoriteItemContainer}>
            <Image
                source={{ uri: item.imageUrl }}
                style={styles.favoriteImage}
            />
            <Text style={styles.favoriteName}>{item.name}</Text>
        </View>
    );

    // Lista de favoritos de exemplo
    const favoriteItems = [
        { id: '1', name: 'Quadra do seu zé', imageUrl: 'https://i.imgur.com/0mpg3sp.jpeg' },
        { id: '2', name: 'HARPA.AI ARENA', imageUrl: 'https://i.imgur.com/0mpg3sp.jpeg' },
        { id: '3', name: 'Alyson e Cia. Volei', imageUrl: 'https://i.imgur.com/0mpg3sp.jpeg' },
        { id: '4', name: 'Goat Arena', imageUrl: 'https://i.imgur.com/0mpg3sp.jpeg' },
        { id: '5', name: 'Maracanã', imageUrl: 'https://i.imgur.com/0mpg3sp.jpeg' },
    ];

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.greetingText}>Olá, {user.nome}</Text>
            <View style={styles.favoritesContainer}>
                <Text style={styles.favoritesTitle}>Seus Favoritos:</Text>
                <FlatList
                    data={favoriteItems}
                    horizontal
                    renderItem={renderFavoriteItem}
                    keyExtractor={item => item.id.toString()}
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
        marginTop: '5%',
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
});


export default FeedBlocks;