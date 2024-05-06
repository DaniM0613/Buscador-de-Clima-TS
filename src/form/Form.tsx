import { useState } from "react";
import { countries } from "../data/countries";
import styles from './Form.module.css'


export default function Form() {

    // Colocando la ciudad y el pais en el state (formulario)
    const [search, setSearch] = useState({
         city: '',
         contry: ''
    })


    return (
        <form className={styles.form} >
            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input
                   id="city"
                   type="text"
                   name="city"
                   placeholder="Ciudad"
                 />
            </div>

            <div className={styles.field}>
                <label htmlFor="city">Pais:</label>
                <select> 
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