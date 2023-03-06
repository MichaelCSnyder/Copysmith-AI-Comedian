import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Joke as JokeType } from '../../../types/AppTypes';
import Navbar from '../Components/Navbar';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1``;

const Jokes = styled.ul``;

const Joke = styled.li`
    margin: 2em;
`;

const Setup = styled.p``;

const Punchline = styled.p``;

//------------------Component------------------
const Archived = () => {
    const [jokes, setJokes] = useState<JokeType[]>([]);

    useEffect(() => {
        (async function asyncFetch() {
            try {
                const { data: jokes } = await axios.get('http://localhost:3000/api/joke');
                setJokes(jokes);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);
    return (
        <>
            <Navbar />
            <Container>
                <Wrapper>
                    <Title>Old Jokes</Title>
                    <Jokes>
                        {jokes.map((joke) => (
                            <Joke>
                                <Setup>{joke.setup}</Setup>
                                <Punchline>{joke.punchline}</Punchline>
                            </Joke>
                        ))}
                    </Jokes>
                </Wrapper>
            </Container>
        </>
    );
};

export default Archived;
