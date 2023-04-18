import { useState } from "react";

// El custom hook recibe un objeto inicial con las propiedades
export const useForm = (initialForm = {}) => {

    // Se utiliza el useState para manipular los valores del objeto
    // el cual quedan almacendado en la variable formState
    // y sus valores de modifican desde la "funcion" setFormState
    const [formState, setFormState] = useState(initialForm);

    // Del objeto event destructuramos el target
    const onCambiarInput = ({ target }: any) => {
        
        // destructuracion del target
        const { name, value } = target;
        //console.log(name, value);
        setFormState({
            ...formState,
            [name]: value // aca atributo del objeto formState le asigna el valor
        })
    };

    const onResetForm = () => {
        setFormState(initialForm)
    }

    return {
        onCambiarInput,
        onResetForm,
        formState,
        ...formState // Esto permite retornas las propiedad del objeto (username, email, password)
    };
}