// components/ProjectPage.js
import React from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import {useTheme} from '../context/ThemeContext';
import WorkInProgress from "./projects/WorkInProgress";

const ProjectPageContainer = styled.div`
    padding: 40px 20px;
    min-height: calc(100vh - 200px); /* Adjust for header and footer */
`;

const NotFoundContainer = styled.div`
    text-align: center;
    padding: 40px;
`;

const NotFoundTitle = styled.h2`
    color: ${props => props.isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
    margin-bottom: 20px;
`;

const ProjectPage = () => {
    const {projectId} = useParams();
    const {isDarkTheme} = useTheme();

    // Map project IDs to their respective components
    const projectComponents = {
        'dashboard': WorkInProgress,
        'todo': WorkInProgress,
        'weather': WorkInProgress,
        'calculator': WorkInProgress,
        'notes': WorkInProgress,
        'pomodoro': WorkInProgress,
        'ecommerce': WorkInProgress,
        'music-player': WorkInProgress,
        'chat': WorkInProgress,
        'image-gallery': WorkInProgress,
        'budget-tracker': WorkInProgress,
        'kanban': WorkInProgress
    };

    // Get the component for the current project ID
    const ProjectComponent = projectComponents[projectId];

    return (
        <ProjectPageContainer>
            {ProjectComponent ? (
                <ProjectComponent/>
            ) : (
                <NotFoundContainer>
                    <NotFoundTitle isDarkTheme={isDarkTheme}>Project Not Found</NotFoundTitle>
                    <p>The project you are looking for ({projectId}) doesn't exist or is still under development.</p>
                </NotFoundContainer>
            )}
        </ProjectPageContainer>
    );
};

export default ProjectPage;