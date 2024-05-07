import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import { CardBlock } from './CardBlock';


export const FeedBlocks = () => {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        fetchBlocks();
    }, []);

    const fetchBlocks = async () => {
        try {
            const res = await axios.get(`https://espority-backend.onrender.com/quadra`);
            setBlocks(res.data.quadras);
        } catch (error) {
            console.error('Erro ao realizar a solicitação:', error);
        }
    };

    const printBlocks = blocks.map((blocks) => (
        <CardBlock
            infoBlocks={blocks}
            key={blocks.id_quadra}
        />
    ));
    

    return (
        <ScrollView>
            {printBlocks}  
        </ScrollView>
    );
};