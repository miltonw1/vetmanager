import { useState, useEffect } from 'react'
import { Btn } from '../common/Btn'
import { TextInput } from '../common/inputs/TextInput'

export function SpeciesForm({ species, onClick, onChange }) {
    const [speciesValue, setSpeciesValue] = useState('')

    const isEditing = !!species

    useEffect(() => {
        if (isEditing) {
            setSpeciesValue(species)
        }
    }, [species, isEditing])

    useEffect(() => {
        onChange({ name: speciesValue })
    }, [speciesValue, onChange])

    console.log(speciesValue)
    return (
        <section className="flex flex-col gap-6 w-80">

            <TextInput
                label="Especie"
                className="w-full"
                value={speciesValue}
                onChange={event => setSpeciesValue(event.target.value)}
            />

            <div>
                <Btn onClick={onClick}>
                    {isEditing ? 'Guardar' : 'Crear'}
                </Btn>
            </div>
        </section>
    )
}