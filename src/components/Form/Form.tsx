import { ChangeEvent, FormEvent, useState } from "react";
import type { SearchType } from "../../types";
import { countries } from "../../data/countries";
import Alert from "../Alert/Alert";
import styles from './Form.module.css'

type FormProps = {
    fetchWeather: (search : SearchType) => Promise<void>
}


export default function Form({fetchWeather} : FormProps) {

    // Colocando la ciudad y el pais en el state (formulario)
    const [search, setSearch] = useState<SearchType>({
         city: "",
         country: ""
    })

    const [alert, setAlert] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        });

    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(Object.values(search).includes('')) {
            setAlert('Todos los campos son obligatorios')
            return
        }
        fetchWeather(search);
    }


    return (
        <form 
          className={styles.form} 
          onSubmit={handleSubmit}
        >
            {alert && <Alert>{alert}</Alert> }

            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input
                   id="city"
                   type="text"
                   name="city"
                   placeholder="Ciudad"
                   value={search.city}
                   onChange={handleChange}
                 />
            </div>

            <div className={styles.field}>
                <label htmlFor="country">Pais:</label>
                <select
                  id="country"
                  name="country"
                  value={search.country}
                  onChange={handleChange}
                > 
                <option value=''>-- Seleccione un Pais --</option>
                {countries.map(country => (   /* trae la informacion de data */
                    <option
                       key={country.code}
                       value={country.code}
                    >{country.name}</option>
                ))}
                </select>
            </div>
            <input className={styles.submit} type="submit" value='Consultar Clima'/>
        </form>
    )
}