import styled from "styled-components"

export const LayoutContainer = styled.div`
    background-color: ${props=>props.theme['gray-800']};
    border-radius: 8px;
    max-width: 70rem;
    height: 46.5rem;
    margin: 5rem auto;
    padding: 3rem 2.5rem ;
    display: flex;
    flex-direction: column;
`