import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import { CardBlock } from './CardBlock';


export const FeedBlocks = () => {
    const [block, setBlocks] = useState([]);

    useEffect(() => {
        fetchBlocks();
    }, []);

    const fetchBlocks = async () => {
        try {
            const response = await axios.get('https://espority-backend.onrender.com/quadra', {
                headers: {
                    Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAxOGY3ZWJiLTBlZWEtNzZkNy1hMDhmLWQ1NjdjNGUwNWJjNSIsImlhdCI6MTcxNTkwMjE5MCwiZXhwIjoxNzE1OTA1NzMwfQ.8lKqZmPPzL7WFVcB7QvAiOcw_00GG2j1_CDW5e6I2io"
                }
            });
            setBlocks(response.data.courts);
        } catch (error) {
            console.error('Erro ao realizar a solicitação:', error);
        }
    };

    const printBlocks = block.map((singleBlock) => (
        <CardBlock
            infoBlocks={singleBlock}
            key={singleBlock.id}
        />
    ));
    

    return (
        <ScrollView>
            {printBlocks}
        </ScrollView>
    );
};