import styled from 'styled-components'

export const MinutesAmountContainer = styled.div`
    font-family: 'Roboto-mono', monospace;
    font-size: 10rem;
    font-weight: bold;
    line-height: 8rem;
    color: ${props=>props.theme['gray-100']};

    display: flex;
    gap: 1rem;

    span{
        background-color: ${props=>props.theme['gray-700']};
        padding: 2.5rem 1rem;
        border-radius: 8px;
    }
`
export const Separator = styled.div`
    padding: 2rem 0;
    color: ${props=>props.theme['green-500']};

    width: 6rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
`