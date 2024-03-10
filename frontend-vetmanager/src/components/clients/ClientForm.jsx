import { FormBase } from '../common/inputs/FormBase'
import { Btn } from '../common/Btn'
import { TextInput } from '../common/inputs/TextInput'
import { MailInput } from '../common/inputs/MailInput'

export function ClientForm({ children }) {

    return (
        <section className="flex flex-col gap-6 w-80">

            <TextInput label="Nombre" className="w-full"/>
            <TextInput label="Telefono" className="w-full"/>
            <MailInput label="Email" className="w-full"/>
            <TextInput label="Dirección" className="w-full"/>
            <TextInput label="Ciudad" className="w-full"/>
            <div>
                <Btn>OK</Btn>
            </div>
        </section>
    )
}