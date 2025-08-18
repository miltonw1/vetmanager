import { useState, useEffect } from 'react'
import { Btn } from '../common/Btn'
import { TextInput } from '../common/inputs/TextInput'
import { MailInput } from '../common/inputs/MailInput'

export function ClientForm({ client, onSave }) {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [debt, setDebt] = useState('0')

    const isEditing = !!client

    useEffect(() => {
        if (isEditing) {
            setName(client.name ?? '')
            setPhone(client.phone ?? '')
            setEmail(client.email ?? '')
            setAddress(client.address ?? '')
            setCity(client.city ?? '')
            setDebt(client.debt ?? '0')
        }
    }, [client, isEditing])

    function handleSubmit() {
        const data = {
            name,
            phone,
            email,
            address,
            city,
            debt
        }
        if (isEditing) {
            data.id = client.id
        }
        onSave(data)
    }


    return (
        <section className="flex flex-col gap-6 w-80">

            <TextInput label="Nombre"
                className="w-full"
                value={name}
                onChange={event => setName(event.target.value)}
            />
            <TextInput
                label="Telefono"
                className="w-full"
                value={phone}
                onChange={event => setPhone(event.target.value)}
            />
            <MailInput
                label="Email"
                className="w-full"
                value={email}
                onChange={event => setEmail(event.target.value)}
            />
            <TextInput
                label="Dirección"
                className="w-full"
                value={address}
                onChange={event => setAddress(event.target.value)}
            />
            <TextInput
                label="Ciudad"
                className="w-full"
                value={city}
                onChange={event => setCity(event.target.value)}
            />
            <TextInput
                label="Deuda"
                className="w-full"
                value={debt}
                onChange={event => setDebt(event.target.value)}
            />
            <div>
                <Btn onClick={handleSubmit}>
                    { isEditing ? 'Guardar' : 'Crear' }
                </Btn>
            </div>
        </section>
    )
}