import './LightDark.scss'
import { useState, useEffect } from 'react';

interface Props {
    setLightOrDark: (lightOrDark: string) => void;
}

function LightDark(props: Props) {
    const [checked, setChecked] = useState<boolean>(false)
    const lightOrDarkSession: string | null = sessionStorage.getItem('lightOrDark')

    useEffect(() => {
        
        if (lightOrDarkSession === '') {
            props.setLightOrDark(lightOrDarkSession)
            setChecked(false)
            
        } else if (lightOrDarkSession === 'dark'){
            props.setLightOrDark(lightOrDarkSession)
            setChecked(true)
            
        }
    }, [])

    function handleChange() {
        if (checked) {
            props.setLightOrDark('')
            setChecked(current => !current)
            sessionStorage.setItem('lightOrDark', '')

        } else {
            setChecked(current => !current)
            props.setLightOrDark('dark')
            sessionStorage.setItem('lightOrDark', 'dark')
        }
    }
    
    
    return (
        <div>
            <label htmlFor="light-dark">light/dark mode</label>
            <input checked={ checked } type="checkbox" name='light-dark' id='light-dark' onChange={ handleChange }/>
        </div>
    )
}

export default LightDark