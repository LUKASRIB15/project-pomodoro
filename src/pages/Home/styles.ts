import styled from 'styled-components'

export const HomeContainer = styled.main`
    flex:1;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.5rem;
    }
`

const STATUS_COLORS = {
    green: 'green-500',
    red: 'red-500',
    yellow: 'yellow-500',
} as const

const HOVER_STATUS_COLORS = {
    green: 'green-700',
    red: 'red-700',
} as const

interface StatusProps{
    statusColor: keyof typeof STATUS_COLORS;
    hoverStatusColor: keyof typeof HOVER_STATUS_COLORS;
}
export const LayoutButton = styled.button<StatusProps>`
    background-color: ${props=>props.theme[STATUS_COLORS[props.statusColor]]};
    border: none;
    border-radius: 8px;
    width: 100%;
    padding: 1rem 2.5rem;
    color: ${props=>props.theme['gray-100']};
    font-weight: bold;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    transition: background-color 0.2s;

    &:not(:disabled):hover{
        background-color: ${props=>props.theme[HOVER_STATUS_COLORS[props.hoverStatusColor]]};
    }

    &:disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }
`
