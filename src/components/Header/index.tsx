import Logo from "../../assets/logo.svg" 
import {Timer, Scroll} from "phosphor-react"
import { LayoutHeader } from "./styles";
import {NavLink} from "react-router-dom"

export function Header(){
    return (
       <LayoutHeader>
        <img src={Logo} alt=''/>
        <nav> 
            <NavLink to="/timer" title="Timer">
                <Timer size={26}/>
            </NavLink> 
            <NavLink to="/history" title="History">
                <Scroll size={26}/>
            </NavLink>
        </nav>
       </LayoutHeader> 
    )
}