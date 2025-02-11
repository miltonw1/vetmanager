import { useState, useEffect } from 'react'
import { Btn } from '../common/Btn'
import { TextInput } from '../common/inputs/TextInput'
import Select from "react-select";


export function RacesForm({ races, onClick, onChange }) {
    const [racesValue, setRacesValue] = useState('')

    const isEditing = !!races

    useEffect(() => {
        if (isEditing) {
            setRacesValue(races)
        }
    }, [races, isEditing])

    useEffect(() => {
        onChange({ name: racesValue })
    }, [racesValue, onChange])



    return (
        <section className="flex flex-col gap-6 w-80">

            <TextInput
                label="Raza"
                className="w-full"
                value={racesValue}
                onChange={event => setRacesValue(event.target.value)}
            />

            <div>
                <Btn onClick={onClick}>
                    {isEditing ? 'Guardar' : 'Crear'}
                </Btn>
            </div>
        </section>
    )
}