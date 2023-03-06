import { GitHub } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

const Container = styled.div`
    height: 60px;
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Left = styled.div`
    flex: 1;
`;

const Center = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
`;

const StyledLink = styled(RouterLink)`
    text-decoration: none;
    color: black;
`;

const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const Logo = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: tomato;
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
`;

const Link = styled.a`
    color: inherit;
`;

//------------------Component------------------
const Navbar = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Logo>AI COMEDIAN</Logo>
                </Left>
                <Center>
                    <StyledLink to="/">
                        <MenuItem>Generate Jokes</MenuItem>
                    </StyledLink>
                    <StyledLink to="archived">
                        <MenuItem>Archived Jokes</MenuItem>
                    </StyledLink>
                </Center>
                <Right>
                    <MenuItem>
                        <Link href="https://github.com/MichaelCSnyder/Copysmith-AI-Comedian" target="_blank">
                            <GitHub />
                        </Link>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;
