// components/ProjectsSection.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const ProjectsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
    width: 100%;
    max-width: 1200px;
    padding: 20px;
`;

const ProjectCard = styled(Link)`
    background-color: ${props => props.isDarkTheme ? 'var(--dark-component-bg)' : 'var(--light-component-bg)'};
    border: 1px solid ${props => props.isDarkTheme ? 'var(--dark-border)' : 'var(--light-border)'};
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-decoration: none;
    color: ${props => props.isDarkTheme ? 'var(--dark-text)' : 'var(--light-text)'};
    height: 280px;
    position: relative;
    overflow: hidden;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
    }

    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: ${props => props.isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
        transform: scaleX(0);
        transition: transform 0.3s ease;
        transform-origin: center;
    }

    &:hover::before {
        transform: scaleX(1);
    }
`;

const ProjectIcon = styled.div`
    font-size: 2.5rem;
    margin-bottom: 15px;
    color: ${props => props.isDarkTheme ? 'var(--dark-accent)' : 'var(--light-accent)'};
`;

const ProjectTitle = styled.h3`
    margin-bottom: 10px;
    font-size: 1.25rem;
`;

const ProjectDescription = styled.p`
    font-size: 0.9rem;
    color: ${props => props.isDarkTheme ? 'var(--dark-text-secondary)' : 'var(--light-text-secondary)'};
    flex-grow: 1;
`;

const ProjectStatus = styled.div`
    background-color: ${props => {
        if (props.status === 'completed') return props.isDarkTheme ? '#2e7d32' : '#c8e6c9';
        if (props.status === 'in-progress') return props.isDarkTheme ? '#f57c00' : '#ffe0b2';
        return props.isDarkTheme ? '#616161' : '#e0e0e0';
    }};
    color: ${props => {
        if (props.status === 'completed') return props.isDarkTheme ? '#ffffff' : '#1b5e20';
        if (props.status === 'in-progress') return props.isDarkTheme ? '#ffffff' : '#e65100';
        return props.isDarkTheme ? '#ffffff' : '#424242';
    }};
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.8rem;
    margin-top: 10px;
`;

const ProjectsSection = () => {
    const { isDarkTheme } = useTheme();

    const projects = [
        {
            id: 'dashboard',
            title: 'Analytics Dashboard',
            description: 'Interactive data visualization dashboard with real-time updates and customizable widgets.',
            icon: '📊',
            path: '/projects/dashboard',
            status: 'completed'
        },
        {
            id: 'todo',
            title: 'Task Manager',
            description: 'Minimalist yet powerful to-do app with drag-and-drop functionality and priority levels.',
            icon: '✅',
            path: '/projects/todo',
            status: 'completed'
        },
        {
            id: 'weather',
            title: 'Weather App',
            description: 'Location-based weather forecasts with beautiful animations and detailed conditions.',
            icon: '🌤️',
            path: '/projects/weather',
            status: 'in-progress'
        },
        {
            id: 'calculator',
            title: 'Calculator',
            description: 'Feature-rich calculator with scientific functions and calculation history.',
            icon: '🧮',
            path: '/projects/calculator',
            status: 'in-progress'
        },
        {
            id: 'notes',
            title: 'Note Taking App',
            description: 'Markdown-supported notes with categories, tags, and search functionality.',
            icon: '📝',
            path: '/projects/notes',
            status: 'planned'
        },
        {
            id: 'pomodoro',
            title: 'Pomodoro Timer',
            description: 'Productivity timer with customizable work/break intervals and session tracking.',
            icon: '⏱️',
            path: '/projects/pomodoro',
            status: 'planned'
        },
        {
            id: 'ecommerce',
            title: 'E-Commerce Store',
            description: 'Full-featured online store with product listings, cart functionality, and checkout process.',
            icon: '🛒',
            path: '/projects/ecommerce',
            status: 'planned'
        },
        {
            id: 'music-player',
            title: 'Music Player',
            description: 'Sleek music player with playlist management, equalizer, and audio visualizations.',
            icon: '🎵',
            path: '/projects/music-player',
            status: 'planned'
        },
        {
            id: 'chat',
            title: 'Chat Application',
            description: 'Real-time messaging app with channels, direct messages, and media sharing.',
            icon: '💬',
            path: '/projects/chat',
            status: 'in-progress'
        },
        {
            id: 'image-gallery',
            title: 'Image Gallery',
            description: 'Responsive image gallery with filtering, lightbox view, and masonry layout.',
            icon: '🖼️',
            path: '/projects/image-gallery',
            status: 'completed'
        },
        {
            id: 'budget-tracker',
            title: 'Budget Tracker',
            description: 'Personal finance app for tracking expenses, setting budgets, and visualizing spending habits.',
            icon: '💰',
            path: '/projects/budget-tracker',
            status: 'in-progress'
        },
        {
            id: 'kanban',
            title: 'Kanban Board',
            description: 'Project management tool with draggable cards, swim lanes, and task assignments.',
            icon: '📋',
            path: '/projects/kanban',
            status: 'completed'
        }
    ];

    return (
        <ProjectsContainer>
            {projects.map(project => (
                <ProjectCard
                    key={project.id}
                    to={project.path}
                    isDarkTheme={isDarkTheme}
                >
                    <ProjectIcon isDarkTheme={isDarkTheme}>{project.icon}</ProjectIcon>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectDescription isDarkTheme={isDarkTheme}>
                        {project.description}
                    </ProjectDescription>
                    <ProjectStatus
                        status={project.status}
                        isDarkTheme={isDarkTheme}
                    >
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </ProjectStatus>
                </ProjectCard>
            ))}
        </ProjectsContainer>
    );
};

export default ProjectsSection;