import axios from 'axios';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../Components/Navbar';
import { Joke } from '../../../types/AppTypes';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
`;

const Wrapper = styled.div`
    width: 50%;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1``;

const Subtitle = styled.p`
    color: #666;
`;

const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 80px 0px;
`;

const Input = styled.input`
    padding: 10px;
    margin-bottom: 5px;
    width: 100%;
`;

const Button = styled.button`
    padding: 5px 10px;
    width: 100%;
    background-color: teal;
    color: white;
`;

const Output = styled.div`
    border: 1px solid black;
    width: 100%;
    min-height: 50px;
    padding: 10px;
`;

const OutputTitle = styled.h3``;

const Setup = styled.p``;

const Punchline = styled.p``;

//------------------Component------------------
const Generate = () => {
    const initialState = {
        setup: '',
        punchline: ''
    };

    const inputRef = useRef<HTMLInputElement>(null);
    const [generatedJoke, setGeneratedJoke] = useState<Joke>(initialState);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const punchline = inputRef?.current?.value;

        // guard clause
        if (!punchline) return;

        setLoading(true);
        axios
            .post('http://localhost:3000/api/joke', { punchline })
            .then((res) => {
                const { setup, punchline } = res.data;

                setGeneratedJoke({ setup, punchline });
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    };
    return (
        <>
            <Navbar />
            <Container>
                <Wrapper>
                    <Title>AI Comedian</Title>
                    <Subtitle>give a punchline, receive hilarity</Subtitle>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Input ref={inputRef} placeholder="enter punchline..." required={true}></Input>
                        <Button type="submit">Generate Joke</Button>
                    </Form>
                    <OutputTitle>Generated Joke</OutputTitle>
                    <Output>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                <Setup>{generatedJoke.setup}</Setup>
                                <Punchline>{generatedJoke.punchline}</Punchline>
                            </>
                        )}
                    </Output>
                </Wrapper>
            </Container>
        </>
    );
};

export default Generate;
