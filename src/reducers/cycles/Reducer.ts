//Biblioteca que irá me ajudar em relação às variáveis imutáveis
import {produce} from 'immer' //npm i immer
import {Cycle} from '../../contexts/CyclesContext'
import {ActionTypes} from '../cycles/actions'

interface CyclesState{
    cycles: Cycle[];
    activeCycleId: string | null;
}

export function cyclesReducer(state:CyclesState, action:any){
    if(action.type == ActionTypes.ADD_NEW_CYCLE){
        /*return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
        }*/
        return produce(state, (draft)=>{
            draft.cycles.push(action.payload.newCycle)
            draft.activeCycleId = action.payload.newCycle.id
        })
    }

    if(action.type == ActionTypes.INTERRUPT_CURRENT_CYCLE){
       /* return{
            ...state,
            cycles: state.cycles.map((cycle)=>{
                if(cycle.id == state.activeCycleId){
                    return{...cycle, interruptedDate: new Date()}
                }else{
                    return cycle
                }
            }),
            activeCycleId: null,
        }*/

        const currentCycleIndex = state.cycles.findIndex(cycle =>{
            return cycle.id == state.activeCycleId
        })

        if(currentCycleIndex<0){
            return state
        }

        return produce(state, (draft)=>{
            draft.cycles[currentCycleIndex].interruptedDate = new Date()
            draft.activeCycleId = null
        })
    }
    if(action.type == ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED){
        /*return{
            ...state,
            cycles: state.cycles.map((cycle)=>{
                if(cycle.id == state.activeCycleId){
                    return {...cycle, finishedDate: new Date()}
                }else{
                    return cycle
                }
            }),
            activeCycleId: null,
        }*/
        const currentCycleIndex = state.cycles.findIndex(cycles=>{
            return cycles.id == state.activeCycleId
        })

        if(currentCycleIndex<0){
            return state
        }

        return produce(state, (draft)=>{
            draft.cycles[currentCycleIndex].finishedDate = new Date()
            draft.activeCycleId = null
        })
    }
    return state
}