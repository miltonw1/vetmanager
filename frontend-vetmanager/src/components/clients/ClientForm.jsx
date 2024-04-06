import { useState, useMemo, useEffect } from 'react'
import { Btn } from '../common/Btn'
import { TextInput } from '../common/inputs/TextInput'
import { MailInput } from '../common/inputs/MailInput'

export function ClientForm({ client, onClick, onChange }) {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')

    const isEditing = !!client

    useEffect(() => {
        if (isEditing) {
            setName(client.name ?? '')
            setPhone(client.phone ?? '')
            setEmail(client.email ?? '')
            setAddress(client.address ?? '')
            setCity(client.city ?? '')
        }
    }, [client, isEditing])

    const clientData = useMemo(() => ({
        name,
        phone,
        email,
        address,
        city,
    }), [name, phone, email, address, city])

    useEffect(() => {
        onChange(clientData)
    }, [clientData, onChange])

    return (
        <section className="flex flex-col gap-6 w-80">

            <TextInput
                label="Nombre"
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
            <div>
                <Btn onClick={onClick}>
                    { isEditing ? 'Guardar' : 'Crear' }
                </Btn>
            </div>
        </section>
    )
}