import {Play, HandPalm} from 'phosphor-react'
import { HomeContainer, LayoutButton } from './styles'
import { useContext} from 'react'
import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/Countdown'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
//Hook que usa o método controlled e uncontrolled juntos
//Gera melhor performance e mais fluidez
import {useForm, FormProvider} from 'react-hook-form'
import { CyclesContext } from '../../contexts/CyclesContext'


export function Home(){
   const {createNewCycle, activeCycle, interruptCurrentCycle} = useContext(CyclesContext)
   const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe sua tarefa'),
    minutesAmount: zod.number().min(5).max(60),
   })

   //interface NewCycleFormDataProps{
   //    task: string;
   //    minutesAmount: number;  
   //}

    //Realiza o meu processo de uma interface.
    //Typeof serve para traduzir uma variável javascript para o typescript
    type NewCycleFormDataProps = zod.infer<typeof newCycleFormValidationSchema>

   const newCycleForm = useForm<NewCycleFormDataProps>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
        task: '',
        minutesAmount: 0,
    }
    })

    const {reset, handleSubmit, watch} = newCycleForm

   const task = watch('task')
   const isSubmitDisabled = !task

   function handleCreateNewCycle(data:NewCycleFormDataProps){
        createNewCycle(data)
        reset()
   }
   return (
    <HomeContainer>
        <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
            
            <FormProvider {...newCycleForm}>
                <NewCycleForm/>
            </FormProvider>
            <CountDown/>
            
            {!activeCycle ?
                <LayoutButton 
                    hoverStatusColor="green" 
                    statusColor="green" 
                    disabled={isSubmitDisabled} 
                    type="submit"
                >
                    <Play size={24}/>
                    Começar
                </LayoutButton>
               :
               <LayoutButton 
                    statusColor="red" 
                    hoverStatusColor="red" 
                    type="button"
                    onClick={interruptCurrentCycle}
                >
                    <HandPalm size={24}/>
                    Interromper
               </LayoutButton>             
            }
        </form>
    </HomeContainer>
   )
}
