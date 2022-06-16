import React, { useRef, useState } from 'react';
import Validator from '../../utils/Validator';

const FiltrationBar = ({handleFiltration}) => {
  // значения колонок таблицы (данные для первого select'a)
  const tableColumns = [
    'Дата',
    'Название',
    'Количество',
    'Расстояние',
  ]

  // условия сортировки (данные для второго select'a)
  const conditionColumns = [
    'равно',
    'содержит',
    'больше',
    'меньше',
  ]

  const [inputText, setInputText] = useState('')
  const columnSelect = useRef(null)
  const conditionSelect = useRef(null)

  // рендер options для тегов select
  const renderOptions = (valueArrays) => {
    return valueArrays.map((value, index) => {
      return (
        <option 
          value={value} 
          key={index}
          defaultValue={index === 0}
        >
          {value}
        </option>
      )
    })
  }

  // проверка введенных данныйх и вызов функции сортировки
  const submitCriteia = () => {
    if (inputText.trim()) {

      let column

      // в зависимости от выбранной колонки
      switch (columnSelect.current.value) {
        case 'Дата':
          column = 0
          // для опции 'содержит' строка не обязательно должна является датой
          // также проверяется валидность строки в остальных случаях
          if (conditionSelect.current.value !== 'содержит' && !Validator.isValidDate(inputText.trim())) {
            return
          }
          break;

        case 'Название':
          column = 1
          break;

        case 'Количество':
          // в фильрации по количеству нам подходят только числа
          if (!Validator.isValidNumber(inputText.trim())) {
            return
          }
          column = 2
          break;
        
        case 'Расстояние':
          // в фильрации по расстоянию нам подходят только числа
          if (!Validator.isValidNumber(inputText.trim())) {
            return
          }
          column = 3
          break;
      
        default:
          break;
      }
      
      // фильтруем в соответствии с критериями
      handleFiltration(
        column,
        conditionSelect.current.value,
        inputText,
      )
    }
  }

  return (
    <div className='d-flex flex-row gap-4 mt-4'>
      <select ref={columnSelect} className='form-select'>
        {renderOptions(tableColumns)}
      </select>
      <select ref={conditionSelect} className='form-select'>
        {renderOptions(conditionColumns)}
      </select> 
      <input 
        type="text" 
        className='form-control'
        onChange={e => setInputText(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {submitCriteia()}
        }}
      />
    </div>
  );
}
 
export default FiltrationBar;
