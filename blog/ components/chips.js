import {Chip} from "@mui/material";

export default function Chips({texts}){
    const COLORS={
        'Vue':{
            color:'#41B883'
        },
        'React':{
            color:'#61DAFB'
        },
        'JavaScript':{
            color:'#F5F746'
        },
        'Css':{
            color:'#2862E9'
        },
        'another':{
            color:'#e67e22'
        }
    }
    return (
        <>
            {
                texts.map((item,index) => (
                    <Chip label={item.title} size={"small"} key={index} sx={{marginX:'2px',backgroundColor:COLORS[item.title],fontWeight:'bold'}}>
                    </Chip>
                ))
            }
        </>
    )
}