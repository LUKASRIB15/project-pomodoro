import { MinutesAmountContainer, Separator } from "./styles"
import { useEffect, useContext } from "react"
import {differenceInSeconds} from 'date-fns'
import { CyclesContext } from "../../../../contexts/CyclesContext"

export function CountDown(){
    const {
        activeCycle, 
        activeCycleId, 
        markCurrentIdAsFinished, 
        amountSecondsPassed, 
        setDifferenceSecondsAmount,
    } = useContext(CyclesContext)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    useEffect(()=>{
        let interval:number;
        if(activeCycle){
            interval = setInterval(()=>{
                const secondsDifference = differenceInSeconds(new Date(), new Date(activeCycle.startDate))

                if(secondsDifference>=totalSeconds){
                    markCurrentIdAsFinished()
                    setDifferenceSecondsAmount(totalSeconds)
                    clearInterval(interval)
                }else{
                    setDifferenceSecondsAmount(secondsDifference)
                }
            }, 1000)
        }

        return ()=>{
            clearInterval(interval)
        }
    }, [activeCycle, totalSeconds, activeCycleId, setDifferenceSecondsAmount, markCurrentIdAsFinished])

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

    const minutesAmount = Math.floor(currentSeconds/60)
    const secondsAmount = currentSeconds % 60

    //padStart faz com que qunado não existir valor ele preencha com algum caractere
    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

    useEffect(()=>{
            if(activeCycle){
                document.title = `${minutes}:${seconds}`
            }else{
                document.title = `Ignite Lab`
            }
        }, [minutes, seconds, activeCycle])
    return(
        <MinutesAmountContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>
            <Separator>:</Separator>
            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </MinutesAmountContainer>
    )
}