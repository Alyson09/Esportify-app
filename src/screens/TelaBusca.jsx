import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardBlock from '../components/CardBlock';

export function TelaBusca({ quadras = [] }) {
    const [query, setQuery] = useState('');
    const [filteredQuadras, setFilteredQuadras] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);

    const handleSearch = () => {
        if (query) {
            const filteredData = quadras.filter(item => item.nome.toLowerCase().includes(query.toLowerCase()));
            setFilteredQuadras(filteredData);

            // Salva a busca recente
            setRecentSearches(prevSearches => {
                const updatedSearches = [query, ...prevSearches.filter(search => search !== query)];
                return updatedSearches.slice(0, 5); // Limita a 5 buscas recentes
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
        <CardBlock infoBlocks={item} />
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
});
