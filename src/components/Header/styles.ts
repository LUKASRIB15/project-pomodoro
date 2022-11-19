import styled from "styled-components";

export const LayoutHeader= styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav{
        display: flex;
        gap: 8px;
    }
    a{
        width: 3rem;
        height: 3rem;
        color: ${props=>props.theme["gray-100"]};
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 3px solid transparent;
        border-bottom: 3px solid transparent;

        transition: border-bottom 0.2s;
    }
    a:hover{
        border-bottom: 3px solid ${props=>props.theme["green-500"]};
    }

    .active{
        color: ${props=>props.theme["green-500"]};
    }
`