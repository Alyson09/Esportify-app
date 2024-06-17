import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export function TelaBusca({ quadras = [] }) {
    const [query, setQuery] = useState('');
    const [filteredQuadras, setFilteredQuadras] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);


    //integrar com o endpoint de buscar quadras e depois remover o dados estatico da tela de navegação

    const handleSearch = () => {
        if (query) {
            const filteredData = quadras.filter(item => item.nome.toLowerCase().includes(query.toLowerCase()));
            setFilteredQuadras(filteredData);

            setRecentSearches(prevSearches => {
                const updatedSearches = [query, ...prevSearches.filter(search => search !== query)];
                return updatedSearches.slice(0, 5);
            });
        } else {
            setFilteredQuadras([]);
        }
    };

    const handleRecentSearchPress = (text) => {
        setQuery(text);
        handleSearch(text);
    };

    const renderQuadra = ({ item }) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.cardContent}>
                <Text style={styles.quadraNome}>{item.nome}</Text>
                <Text style={styles.quadraEndereco}>{item.endereco}</Text>
                <Text style={styles.quadraPreco}>R${item.preco}</Text>
            </View>
        </View>
    );

    const renderRecentSearch = ({ item }) => (
        <TouchableOpacity onPress={() => handleRecentSearchPress(item)}>
            <Text style={styles.recentSearchItem}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar Quadras, Locatários em todo Esportify"
                    value={query}
                    onChangeText={setQuery}
                />
                <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
                    <Icon name="search" size={20} color="#000" />
                </TouchableOpacity>
            </View>
            {query === '' && recentSearches.length > 0 ? (
                <View style={styles.recentSearchContainer}>
                    <Text style={styles.recentSearchTitle}>Buscas Recentes:</Text>
                    <FlatList
                        data={recentSearches}
                        renderItem={renderRecentSearch}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                    />
                </View>
            ) : (
                <FlatList
                    data={filteredQuadras}
                    renderItem={renderQuadra}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.resultsList}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        backgroundColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        color: '#000',
    },
    searchIcon: {
        padding: 5,
    },
    recentSearchContainer: {
        marginBottom: 10,
    },
    recentSearchTitle: {
        fontSize: 16,
        marginBottom: 5,
    },
    recentSearchItem: {
        padding: 5,
        backgroundColor: '#D9D9D9',
        borderRadius: 5,
        marginRight: 5,
    },
    resultsList: {
        marginTop: 10,
    },
    card: {
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        overflow: 'hidden',
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    cardContent: {
        flex: 1,
        padding: 10,
    },
    quadraNome: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    quadraEndereco: {
        fontSize: 14,
        color: '#666',
    },
    quadraPreco: {
        fontSize: 14,
        color: 'green',
        fontWeight: 'bold',
        marginTop: 5,
    },
});

export default TelaBusca;
