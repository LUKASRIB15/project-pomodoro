import {FormContainer, TaskInput, MinutesAmountInput} from './styles'
import {useFormContext} from 'react-hook-form'
import { useContext } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function NewCycleForm(){
    const {register} = useFormContext()
    const {activeCycle} = useContext(CyclesContext)
    //Validação dos dados que são enviados
    
   
    return(
        <FormContainer>
                <label htmlFor="task">Vou trabalhar em</label>
                <TaskInput 
                    id="task" 
                    list="task-suggestions" 
                    placeholder="Dê um nome para o seu projeto"
                    disabled={!!activeCycle}
                    {...register('task')}
                />

                <datalist id="task-suggestions">
                    <option value="Projeto 1"/>
                    <option value="Projeto 2"/>
                    <option value="Projeto 3"/>
                    <option value="Projeto 4"/>
                </datalist>
                <label htmlFor="minutesAmount">durante</label>
                <MinutesAmountInput 
                    type="number" 
                    id="minutesAmount" 
                    placeholder="00"
                    step={5}
                    min={5}
                    max={60}
                    disabled={!!activeCycle}
                    {...register('minutesAmount', {valueAsNumber: true})}                
                />

                <span>minutos.</span>
            </FormContainer>
    )
}