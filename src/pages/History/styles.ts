import styled from 'styled-components'

export const HistoryLayout = styled.main`
    margin: 3.125rem 6rem;
    flex: 1;

    h1{
        font-weight: bold;
        font-size: 1.5rem;
        color: ${(props)=>props.theme['gray-100']};
        margin-bottom: 2rem;
    }
`

export const TableLayout = styled.div`
    flex: 1;
    overflow: auto; /* quando o conteúdo for maior que o container, irá gerar uma barra de rolagem */
    margin-top: 2rem;

    table{
        width: 100%;
        border-collapse: collapse; /* Faz com que o td adjascente não precise adicionar outro px de borda se já existir */
        min-width: 600px;

        th{
            background-color: ${(props)=>props.theme['gray-600']};
            padding: 1rem 1.5rem;
            color: ${(props)=>props.theme['gray-100']};
            text-align: left;
            font-size: 0.875rem;

            &:first-child{
                border-top-left-radius: 8px;
                padding-left: 1.5rem;
            }

            &:last-child{
                border-top-right-radius: 8px;
                padding-right: 1.5rem;
            }
        }
        td{
            padding: 1rem 1.5rem;
            font-size: 0.875rem;
            background-color:${(props)=>props.theme['gray-700']};
            border-top: 4px solid ${(props)=>props.theme['gray-800']};

            &:first-child{
                width: 40%;
                padding-left: 1.5rem;
            }

            &:last-child{
                padding-right: 1.5rem;
            }
        }
    }
`
const STATUS_COLORS = {
    yellow: 'yellow-500',
    green: 'green-500',
    red: 'red-500',
} as const

interface StatusProps{
    //As variáveis que irão ser trabalhadas serão as que estão dentro desse objeto graças ao typeof
    statusColor: keyof typeof STATUS_COLORS
}
export const Status = styled.span<StatusProps>`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &::before{
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background-color: ${props=>props.theme[STATUS_COLORS[props.statusColor]]};
    }
`