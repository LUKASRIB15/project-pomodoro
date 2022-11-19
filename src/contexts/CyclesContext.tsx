import { createContext, useState, ReactNode, useReducer, useEffect } from "react"
import { cyclesReducer } from "../reducers/cycles/Reducer";
import {addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction} from "../reducers/cycles/actions"
import { differenceInSeconds } from "date-fns";

interface CreateCycleData{
    task: string;
    minutesAmount: number;
}

export interface Cycle{
    id: string;
    task: string;
    minutesAmount:number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextProps{
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentIdAsFinished: ()=>void;
    setDifferenceSecondsAmount: (seconds:number)=>void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: ()=>void;
}

export const CyclesContext = createContext({} as CyclesContextProps)

//Todo tag precisa de um filho no React
//Para add um conteúdo dentro de um contexto, é necessário usar a prop children
interface CyclesContextProviderProps{
    children: ReactNode;
}
export function CyclesContextProvider({children}:CyclesContextProviderProps){
    const[cyclesState, dispatch] = useReducer( 
        cyclesReducer,{
        cycles: [],
        activeCycleId: null,
        },
        ()=>{
            const storedStateAsJSON = localStorage.getItem(
                '@ignite-timer:cycles-state-1.0.0',
            )

            if(storedStateAsJSON){
                return JSON.parse(storedStateAsJSON)
            }
        }
    )
    const {cycles, activeCycleId} = cyclesState

    //find: recebe uma função como argumento para encontrar algo na lista
    const activeCycle = cycles.find((cycle)=> cycle.id == activeCycleId)
    const[amountSecondsPassed, setAmountSecondsPassed] = useState(()=>{
        if(activeCycle){
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }
        return 0
    })


    //UseEffect para guardar os estados da minha aplicação no browser já
    //que não possuímos uma API nesse projeto
    useEffect(()=>{
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
    },[cyclesState])

    function setDifferenceSecondsAmount(seconds: number){
        setAmountSecondsPassed(seconds)
    }


    function markCurrentIdAsFinished(){
        dispatch(markCurrentCycleAsFinishedAction(activeCycleId))
    }

    function createNewCycle(data:CreateCycleData){
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch(addNewCycleAction(newCycle))
        setAmountSecondsPassed(0)
   }

   function interruptCurrentCycle(){
        dispatch(interruptCurrentCycleAction(activeCycleId))
   }

    return(
        <CyclesContext.Provider value={{
            cycles,
            activeCycle, 
            activeCycleId, 
            markCurrentIdAsFinished, 
            amountSecondsPassed,
            setDifferenceSecondsAmount,
            createNewCycle,
            interruptCurrentCycle,
        }}>
            {children}
        </CyclesContext.Provider>
    )
}