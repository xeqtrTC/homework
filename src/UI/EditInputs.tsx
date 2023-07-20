import { FormEvent } from "react"

const EditInputs = ({ nameOfLabel, type, onChangeFn, name, value, placeholder}: {
    nameOfLabel: string,
    type: string,
    onChangeFn: (e: FormEvent<HTMLInputElement>) => void,
    name: string,
    value: string | number,
    placeholder?: string
}) => {
    return (
        <div className="divCombined">
            <label className="label">{nameOfLabel}</label>
            <input 
            type={type} 
            className="input" 
            onChange={onChangeFn}
            name={name}
            placeholder={`${value ? '' : placeholder ? placeholder : 'Nema vrijednost'}`}
            value={value ? value : ''} 
            />
        </div>
    )
}

export default EditInputs