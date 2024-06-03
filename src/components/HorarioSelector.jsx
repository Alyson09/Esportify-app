import React, { useState } from "react";
import { Animated, StyleSheet, Text, View, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import GetToken from '../components/GetToken';
import axios from 'axios';

function formatTime(timeString) {
    const date = new Date(timeString);
    return `${date.getUTCHours()}:${date.getUTCMinutes().toString().padStart(2, '0')}`;
}

function HorarioSelector({ dia, horarios }) {
    const [opened, setOpened] = useState(false);
    const [animation] = useState(new Animated.Value(0));
    const [solicitados, setSolicitados] = useState(new Set());
    
    const handleSolicitar = async (idHorario, idQuadra) => {
        try {
            const token = await GetToken();
            const currentDate = new Date().toISOString().split('T')[0];
            const response = await axios.post(
                `https://espority-backend.onrender.com/quadra/alugar`, 
                {
                    id_quadra: idQuadra,
                    id_horario: idHorario,
                    data: currentDate,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            if (response.status === 201) {
                setSolicitados((prev) => new Set(prev).add(idHorario));
                console.log("Quadra alugada com sucesso!");
            }
        } catch (error) {
            console.error('Erro ao realizar a solicitação:', error);
        }
    };

    const handleCancelar = async (idHorario, idQuadra) => {
        try {
            const token = await GetToken();
            const response = await axios.post(
                `https://espority-backend.onrender.com/quadra/cancelar`, 
                {
                    id_quadra: idQuadra,
                    id_horario: idHorario,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            if (response.status === 200) {
                setSolicitados((prev) => {
                    const newSet = new Set(prev);
                    newSet.delete(idHorario);
                    return newSet;
                });
                console.log("Aluguel cancelado com sucesso!");
            }
        } catch (error) {
            console.error('Erro ao cancelar a solicitação:', error);
        }
    };

    function toggleAccordion() {
        const toValue = opened ? 0 : 1;
        Animated.timing(animation, {
            toValue,
            duration: 300,
            useNativeDriver: false,
        }).start();
        setOpened(!opened);
    }

    const heightAnimationInterpolation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, horarios.length * 40],
    });

    return (
        <View style={styles.container}>
            <Pressable onPress={toggleAccordion}>
                <View style={styles.header}>
                    <Text style={styles.details}>{dia}</Text>
                    <AntDesign name={opened ? 'caretup' : 'caretdown'} size={16} />
                </View>
            </Pressable>

            <Animated.View style={[styles.content, { height: heightAnimationInterpolation }]}>
                {opened && horarios.map((horario, index) => (
                    <View key={index} style={styles.timeContainer}>
                        <Text style={styles.details}>
                            {formatTime(horario.horario_inicial)} a {formatTime(horario.horario_final)}
                        </Text>
                        <Pressable
                            style={[
                                styles.button,
                                solicitados.has(horario.id) && styles.buttonCancel
                            ]}
                            onPress={() => solicitados.has(horario.id) ? handleCancelar(horario.id, horario.id_quadra) : handleSolicitar(horario.id, horario.id_quadra)}>
                            <Text style={styles.buttonText}>
                                {solicitados.has(horario.id) ? 'Cancelar' : 'Solicitar'}
                            </Text>
                        </Pressable>
                    </View>
                ))}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 6,
        borderWidth: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content: {
        marginTop: 8,
        overflow: 'hidden',
    },
    details: {
        fontWeight: 'regular',
        opacity: 0.65,
        height: 20,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    button: {
        borderRadius: 3,
        backgroundColor: '#24f024',
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    buttonCancel: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
    }
});

export default HorarioSelector;
