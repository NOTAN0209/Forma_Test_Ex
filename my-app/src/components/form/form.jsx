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

        let inputName = input?.name.trim();

        if ( inputName  === '') {
            setError({ ...error, name: 'Вы забыли указать имя и фамилию' });
            return;
        };

        let nameLength = inputName.length;

        if (nameLength <= 2) {
            setError({ ...error, name: 'Имя не может быть короче 2-х символов' });
            return;
        };
        
        let spesSymbols = /^[?!,.а-яА-ЯёЁa-zA-Z0-9\s]+$/;
    
        if (!spesSymbols.test(inputName)) {
            setError({ ...error, name: 'Наличие спец символов' });
            return;             
        };

        //validation inputTel

        let inputTel = input?.tel.trim();

        if (inputTel === '') {
            setError({ ...error, name: 'Вы забыли указать телефон' });
            return;
        };
    
        let tel = inputTel.replace(/[^\d\+]/g,"");

        if (tel.length < 12) {        
            setError({ ...error, name: 'Неверный номер телефона' });
            console.log(tel)
            return;
        }

        //validation inputText

        let inputText = input?.text.trim();

        if (input?.text.trim() === '') {
            setError({ ...error, name: 'Вы забыли написать сообщение' });
            return;
        }
    
        if (!spesSymbols.test(inputText)) {
            setError({ ...error, name: 'Наличие спец символов' });
            return;             
        };
                 
        setInput({ name: "", tel: "", text: "" });
       
        alert(`  
            {
              "name": ${inputName} ,
              "telephone": ${tel},
              "text": ${inputText}
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
                                    mask="+7 (999) 999-99-99"
                                    name="tel"  
                                    placeholder="Номер телефона"
                                    className="inputTel"
                                    value={input?.tel} 
                                    onInput={handleInputTel}
                                    onFocus={handleFocusTel}  
                                    /> 
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