// App.js
import React from 'react';
import styled from 'styled-components';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import BackgroundAnimation from './components/BackgroundAnimation';
import Navbar from './components/Navbar';
import FooterSection from './components/FooterSection';
import ProjectsSection from './components/ProjectsSection';
import ProjectPage from './components/ProjectPage';
import {ThemeProvider, useTheme} from './context/ThemeContext';
import ThemeTransition from './components/ThemeTransition';

const PageContainer = styled.div`
    position: relative;
    min-height: 100vh;
    padding-bottom: 100px; /* Height of the footer */
`;
const Projects = () => {
    return (
        <div style={{
            padding: '20px',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            minHeight: 'calc(100vh - 200px)'
        }}>
            <h1 style={{
                marginBottom: '20px',
                textAlign: 'center',
                fontSize: '2rem'
            }}>
                My UI Projects
            </h1>
            <p style={{
                textAlign: 'center',
                marginBottom: '30px',
                maxWidth: '800px',
                margin: '0 auto 30px'
            }}>
                A collection of interactive UI components and applications built with React.
                Click on any project to view a live demo.
            </p>
            <ProjectsSection />
        </div>
    );
};

const AppContent = () => {
    const {isDarkTheme} = useTheme();

    return (
        <>
            <GlobalStyles isDarkTheme={isDarkTheme}/>
            <ThemeTransition/>
            <BackgroundAnimation/>
            <PageContainer>
                <Router>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Projects/>}/>
                        <Route path="/projects" element={<Projects/>}/>
                        <Route path="/projects/:projectId" element={<ProjectPage/>}/>
                    </Routes>
                    <FooterSection/>
                </Router>
            </PageContainer>
        </>
    );
};

function App() {
    return (
        <ThemeProvider>
            <AppContent/>
        </ThemeProvider>
    );
}

export default App;