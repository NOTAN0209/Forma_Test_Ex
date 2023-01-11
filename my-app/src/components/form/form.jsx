import { useState } from 'react';
import './form.css';
import InputMask from "react-input-mask";

let errorInitial = { name: null, tel: null }; 

function Form() {

    let [input, setInput] = useState(JSON.parse(localStorage.getItem('reviewFormInput')));
    let [error, setError] = useState({ errorInitial });
    localStorage.setItem('reviewFormInput', JSON.stringify(input));

    function handleSubmit (event){
        event.preventDefault();

        //validation inputName
        if (input?.name.trim() === '') {
            setError({ ...error, name: 'Вы забыли указать имя и фамилию' });
            return;
        }

        let nameLength = input?.name.trim().length;

        if (nameLength <= 2) {
            setError({ ...error, name: 'Имя не может быть короче 2-х символов' });
            return;
        }

        //validation inputTel
        if (input?.tel.trim() === '') {
            setError({ ...error, name: 'Вы забыли указать телефон' });
            return;
        }

        let telLength = input?.tel.trim().length;

        if (telLength <= 11) {
            setError({ ...error, name: 'Номер не может быть короче 11-х символов' });
            return;
        }

        //validation inputText

        if (input?.text.trim() === '') {
            setError({ ...error, name: 'Вы забыли написать сообщение' });
            return;
        }

        let textLength = input?.text.trim();

        let spesSymbols = /[^a-zA-Z0-9]/;

        if (spesSymbols.test( textLength)) {
            setError({ ...error, name: 'Наличие спец символов' })    
            return
        } else {
            textLength === spesSymbols
        };
                 
        setInput({ name: "", tel: "", text: "" });
       
        alert(`  
            {
              "name": ${input?.name.trim()} ,
              "telephone": ${input?.tel.trim()},
              "text": ${input?.text.trim()}
            },
         `);
        };

       
          

        // Срабатывает при вводе имени
        let handleInputName = (event) => {
            setInput({ ...input, name: event.target.value });
        };

        // Срабатывает при фокусе на поле с именем
        let handleFocusName = () => {
            setError({ ...errorInitial })
        };

        // Срабатывает при вводе телефона
        let handleInputTel = (event) => {
            setInput({ ...input, tel: event.target.value });
        };
        
        // Срабатывает при фокусе на поле с телефоном
        let handleFocusTel = () => {
            setError({ ...errorInitial })
        };

        // Срабатывает при вводе сообщения
        let handleInputText = (event) => {
            setInput({ ...input, text: event.target.value });
        };
        
        // Срабатывает при фокусе на поле ссообщением
        let handleFocusText = () => {
            setError({ ...errorInitial })
        };

    return (
        <form className="form" onSubmit={handleSubmit} >
            <fieldset className="formBorder">
                <legend className="formTitle">Форма обратной связи</legend>
                    <div className="formRow"> 
                    
                        <div className="inputNameColumn">
                            <input
                                 type="text"
                                 name="name"
                                 placeholder="Имя и фамилия"
                                 className="inputName"
                                 value={input?.name}
                                 onInput={handleInputName}
                                 onFocus={handleFocusName}
                                />
        
                            <div className={`mistakeNameVisible ${error.name ? '' : `mistakeName`}`}>{error.name}</div>
                        </div>                    
       
                        <div className="inputTelColumn">
                            <InputMask 
                                    mask="+7(999)999-99-99"
                                    name="tel"  
                                    placeholder="Номер телефона"
                                    className="inputTel"
                                    value={input?.tel} 
                                    onInput={handleInputTel}
                                    onFocus={handleFocusTel}  
                                    /> 
                            <div className={`mistakeTelVisible ${error.tel ? '' : `mistakeTel`}`}>{error.tel}</div> 
                        </div>                                 
                 </div>
                                        
                <input
                    type="textarea" 
                    name="text" 
                    placeholder="Сообщение..."
                    className="inputText"
                    value={input?.text} 
                    onInput={handleInputText}
                    onFocus={handleFocusText}   
                />
                            
                             
                <button className="formButton" type = "submit">Отправить</button>
            </fieldset>
        </form>
        )
}

export default Form