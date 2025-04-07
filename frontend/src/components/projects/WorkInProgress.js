import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

// Animation keyframes
const rotate = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const float = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
`;

const pulse = keyframes`
    0% { opacity: 0.5; transform: scale(0.95); }
    50% { opacity: 1; transform: scale(1); }
    100% { opacity: 0.5; transform: scale(0.95); }
`;

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

// Styled components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 200px);
    padding: 20px;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    animation: ${fadeIn} 1s ease forwards;
    color: ${props => props.isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)'};
`;

const Subtitle = styled.p`
    font-size: 1.2rem;
    max-width: 600px;
    margin-bottom: 3rem;
    animation: ${fadeIn} 1s ease forwards 0.3s;
    opacity: 0;
    animation-fill-mode: forwards;
    color: ${props => props.isDarkTheme ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
`;

const AnimationContainer = styled.div`
    position: relative;
    width: 200px;
    height: 200px;
    margin-bottom: 2rem;
    animation: ${float} 4s ease-in-out infinite;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Circle = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    border: 4px solid ${props => props.isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
    border-radius: 50%;
    border-top-color: transparent;
    animation: ${rotate} 2s linear infinite;
`;

const InnerCircle = styled.div`
    position: absolute;
    top: 25%;
    left: 25%;
    width: 50%;
    height: 50%;
    border: 4px solid ${props => props.isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
    border-radius: 50%;
    border-bottom-color: transparent;
    animation: ${rotate} 3s linear infinite reverse;
`;

const GearIcon = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    animation: ${pulse} 2s ease-in-out infinite;
    color: ${props => props.isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
    width: 48px;
    height: 48px;
    line-height: 1;
`;

const ProgressBar = styled.div`
    width: 300px;
    height: 8px;
    background-color: ${props => props.isDarkTheme ? 'var(--dark-component-bg)' : 'var(--light-component-bg)'};
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    animation: ${fadeIn} 1s ease forwards 0.6s;
    opacity: 0;
    animation-fill-mode: forwards;
`;

const Progress = styled.div`
    height: 100%;
    background-color: ${props => props.isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
    border-radius: 4px;
    width: 70%;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
                90deg,
                transparent,
                ${props => props.isDarkTheme ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.5)'},
                transparent
        );
        transform: translateX(-100%);
        animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
    }
`;

const StatusText = styled.div`
    font-size: 1rem;
    font-weight: bold;
    color: ${props => props.isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
    margin-bottom: 2rem;
    animation: ${fadeIn} 1s ease forwards 0.9s;
    opacity: 0;
    animation-fill-mode: forwards;
`;

const WorkInProgressPage = () => {
    const { isDarkTheme } = useTheme();

    return (
        <Container>
            <Title isDarkTheme={isDarkTheme}>Work In Progress</Title>
            <Subtitle isDarkTheme={isDarkTheme}>
                We're building something awesome! This page is currently under development and will be available soon.
            </Subtitle>

            <AnimationContainer>
                <Circle isDarkTheme={isDarkTheme} />
                <InnerCircle isDarkTheme={isDarkTheme} />
                <GearIcon isDarkTheme={isDarkTheme}>⚙️</GearIcon>
            </AnimationContainer>

            <ProgressBar isDarkTheme={isDarkTheme}>
                <Progress isDarkTheme={isDarkTheme} />
            </ProgressBar>

            <StatusText isDarkTheme={isDarkTheme}>70% Complete</StatusText>
        </Container>
    );
};

export default WorkInProgressPage;