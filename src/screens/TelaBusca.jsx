import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CardBlock from '../components/CardBlock';

export function TelaBusca({ quadras = [] }) {
    const [query, setQuery] = useState('');
    const [filteredQuadras, setFilteredQuadras] = useState(quadras);

    const handleSearch = (text) => {
        setQuery(text);
        if (text) {
            const filteredData = quadras.filter(item => item.nome.toLowerCase().includes(text.toLowerCase()));
            setFilteredQuadras(filteredData);
        } else {
            setFilteredQuadras(quadras);
        }
    };

    const renderQuadra = ({ item }) => (
        <CardBlock infoBlocks={item} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar Quadras, Locatários em todo Esportify"
                    value={query}
                    onChangeText={handleSearch}
                />
                <TouchableOpacity onPress={() => handleSearch(query)} style={styles.searchIcon}>
                    <Icon name="search" size={20} color="#000" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredQuadras}
                renderItem={renderQuadra}
                keyExtractor={(item) => item.id.toString()}
                style={styles.resultsList}
            />
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
    resultsList: {
        marginTop: 10,
    },
});
