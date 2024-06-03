import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function TelaBusca({ quadras }) {
    const [query, setQuery] = useState('');
    const [filteredQuadras, setFilteredQuadras] = useState(quadras || []);
    const navigation = useNavigation();

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
        <TouchableOpacity 
            style={styles.quadraContainer} 
            onPress={() => navigation.navigate('BlocksDetailScreen', { infoBlocks: item })}
        >
            <Text style={styles.quadraText}>{item.nome}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Buscar Quadras, Locatários em todo Esportify"
                value={query}
                onChangeText={handleSearch}
            />
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
        marginTop: '15%'
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        backgroundColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        color: '#000',
    },
    resultsList: {
        marginTop: 10,
    },
    quadraContainer: {
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    quadraText: {
        fontSize: 16,
    },
});

