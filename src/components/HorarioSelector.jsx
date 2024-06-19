import React, { useState, useEffect } from "react";
import { Animated, StyleSheet, Text, View, Pressable } from "react-native";
import GetToken from '../components/GetToken';
import axios from 'axios';
import { socket } from '../services/socket';

function HorarioSelector({ times, dayOfWeek, selectedDate  }) {
    const [opened, setOpened] = useState(true);
    const [solicitados, setSolicitados] = useState(new Set());
    const [socketInstance] = useState(socket())

    useEffect(() => {
      socketInstance.on('rent', () => {
        
      })
  
      return () => {
        socketInstance.off('rent')
      }
    }, [])

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

    return (
        <View style={styles.container}>
            <Animated.View style={styles.content}>
                {times.map((horario, index) => (
                    <View key={index} style={styles.timeContainer}>
                        <Text style={styles.details}>
                            {horario.horario_inicial} - 
                        </Text>
                        <Text style={styles.details}>
                            {horario.horario_final}
                        </Text>
                        <Text style={styles.details}>
                            {horario.preco}
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
        padding: 10,
        backgroundColor: '#006437',
        borderRadius: 5,
    },
    buttonCancel: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
    },
});

export default HorarioSelector;
