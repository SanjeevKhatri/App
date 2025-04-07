// components/projects/DashboardProject.js
import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const ProjectContainer = styled.div`
  background-color: ${props => props.isDarkTheme ? 'var(--dark-component-bg)' : 'var(--light-component-bg)'};
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ProjectHeader = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const ProjectTitle = styled.h1`
  margin-bottom: 10px;
  color: ${props => props.isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
`;

const ProjectDescription = styled.p`
  color: ${props => props.isDarkTheme ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
`;

const ProjectContent = styled.div`
  /* Add your project-specific styling here */
`;

const DashboardProject = () => {
    const { isDarkTheme } = useTheme();

    return (
        <ProjectContainer isDarkTheme={isDarkTheme}>
            <ProjectHeader>
                <ProjectTitle isDarkTheme={isDarkTheme}>Analytics Dashboard</ProjectTitle>
                <ProjectDescription isDarkTheme={isDarkTheme}>
                    Interactive data visualization dashboard with real-time updates and customizable widgets.
                </ProjectDescription>
            </ProjectHeader>

            <ProjectContent>
                {/* Implement your dashboard UI here */}
                <p>This is where you'll implement the specific UI for this project.</p>
            </ProjectContent>
        </ProjectContainer>
    );
};

export default DashboardProject;