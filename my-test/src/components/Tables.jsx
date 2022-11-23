import './Tables.css';
import React from "react";
import { useSelector } from 'react-redux';
import { useEffect, useState, useCallback} from 'react';


function Tables() {

  let companies = useSelector((store) => store.toolkit.companies) 

  const [data, setData] = useState([])
  const [companyName,setCompanyName] = useState([]);
  const [company, setCompany] = useState([])
  const [allChecked, setAllChecked] = useState(false)
  const [allCheckedCompany, setAllCheckedCompany] = useState(false)
  const [remove, setRemove] = useState([])
  const [companyRemove, setCompanyRemove] = useState([]);
  const [checkedCompany, setCheckedCompany] = useState([]);
  const [checked, setChecked] = useState(new Array(companyName.length).fill(false));
  
  const [companyNameInput, setCompanyNameInput] = useState('')
  const [companyAdressInput, setCompanyAdressInput] = useState('')
  
  const [visibleCompany, setVisibleCompany] = useState(false)
  const [visiblePeople, setVisiblePeople] = useState(false)
  
  const [selectValue, setSelectValue] = useState('')
  const [firstNameInput, setFirstNameInput] = useState('')
  const [lastNameInput, setLastNameInput] = useState('')
  const [positionInput, setPositionNameInput] = useState('')

  const [updateComanyInput,setUpdateComanyInput] = useState(false)
  const [updateNameInput, setUpdateNameInput] = useState(false)

  const [companyNameUpdateInput, setCompanyNameUpdateInput] = useState('')
  const [companyAdressUpdateInput, setCompanyAdressUpdateInput] = useState('')

  const [firstNameUpdateInput, setFirstNameUpdateInput] = useState('')
  const [lastNameUpdateInput, setLastNameUpdateInput] = useState('')
  const [positionUpdateInput, setPositionNameUpdateInput] = useState('')
  
  const [sortNameCompany,setSortNameCompany] = useState('')
  const [sortNamePeople,setSortNamePeople] = useState('')
  
  useEffect(() => {
    setData(companies)
    setCompanyName(Array.from(new Set(companies.map(el => el.company))))
    setSelectValue(companies[0].company)
  }, [companies])

  useEffect(() => {
    let prevData = Array.from(new Set(data.map(element => element.company)))
    setCompanyName(prevData)
    setChecked(new Array(prevData.length).fill(false))   
    setSelectValue(prevData[0]) 
  }, [data])

  useEffect(() => {
    setCheckedCompany(new Array(company.length).fill(false))
  }, [company])

  const adeptHandler = (companyName, id, check) => {
    if (check) {
      setCompany([])
    } else 
    setCompany(companyName)

    setSortNameCompany(id)
    setCheckedCompany(new Array(companyName.length).fill(false))
  }
  
  const checkAllCompany = useCallback(() => {
    const globalCompany = data.map(el => el.id)
    setCompanyRemove(globalCompany)
    setChecked(new Array(companyName.length).fill(!allCheckedCompany))
    setAllCheckedCompany(!allCheckedCompany)
  }, [checked, data]) 
  
  const checkAllName = useCallback(() => {
    const globalCompany = company.map(el=> el.id)
    setRemove(globalCompany)
    setCheckedCompany(new Array(company.length).fill(!allChecked))
    setAllChecked(!allChecked)
  }, [checkedCompany, company])
   

  const handleChange = (e, position, checkComp=null) => { //!ручка для чекбоксов
    let updatedCheckedState = null
    let removeCompanies = null
    setSortNamePeople(e.id)
    console.log('checkComp',checkComp)
    console.log(e)
    if(e.company !== undefined) {setSortNameCompany(e.company)}
    console.log(checkedCompany)
    if (e.items === undefined) {
      removeCompanies = [...remove, e.id]
      removeCompanies = remove.length === company.length ? remove.filter(el => el !== e.id ) :  removeCompanies
      updatedCheckedState = checkedCompany.map((item, index) => index === position ? !item : item )
      setCheckedCompany(updatedCheckedState)
      setRemove(removeCompanies)
    } else if(  checkComp===null)  {
        removeCompanies = [...companyRemove, e.id]
        removeCompanies = companyRemove.length === data.length ? companyRemove.filter(el => el !== e.id ) :  removeCompanies
        updatedCheckedState = checked.map((item, index) => index === position ? !item : item )
        setChecked(updatedCheckedState)
        setCompanyRemove(removeCompanies)
    }
  }

  const deleteName = () => { //!ручка для удаления (для всего)
    let targets = null
    let preset = remove.length===0 ? data.filter(element => !companyRemove.includes(element.id)) : data
    let isGlobal = checked.some((e) => e)
    console.log('remove', remove)
    if (remove.length) {
      targets = company.filter(element => !remove.includes(element.id))
      preset = preset.map(element => ({ ...element, items: element.items.filter((item) => !remove.includes(item.id))}))
      setCompany(targets)
      setCheckedCompany(new Array(company.length).fill(false))
    } 
    isGlobal && setChecked(new Array(companyName.length).fill(false)) 
    setData(preset)
    setRemove([])
    setCompanyRemove([])
  }

  const handleCompanyAddSumbit = (e) => { //! ручка добавления компаний
    e.preventDefault()
    setData([...data,{ company: companyNameInput, adress: companyAdressInput, id: Date.now(), items: [] }])
    setCompanyNameInput("")
    setCompanyAdressInput("")
}

const handlePeopleAddSumbit = (e) => {//! ручка добавления сотрудников
  e.preventDefault()
  let companyOld = data.filter(el => el.company.includes(selectValue))
                       .map(el => [...el.items, {id: Date.now(), firstName: firstNameInput, lastName: lastNameInput, position: positionInput }])
  let allCompany = data.map( (el) => {
    if(el.company.includes(selectValue)){
      return {...el, items: companyOld.flat()} 
    } else {
      return el
    }
  })
  setData(allCompany)
  companyOld = allCompany.filter((el) => el.company.includes(selectValue))[0].items
  setCompany(companyOld)
  setSelectValue("")
  setFirstNameInput("")
  setLastNameInput("")
  setPositionNameInput("")
}

const handleCompanyUpdateSumbit = (e) => { //! ручка изменения компаний
  e.preventDefault()  
  console.log(sortNameCompany)
  let omg = data.map(el => 
    {
      if (el.id === sortNameCompany) {
        return {...el, company: companyNameUpdateInput, adress: companyAdressUpdateInput }
      }
      return el
    }
    )
  setData(omg)
  setCompanyNameUpdateInput("")
  setCompanyAdressUpdateInput("")
}

const handlePeopleUpdateSumbit = (e) => { //! ручка изменения сотрудников
  e.preventDefault()
  let companyOld1 = 
    data.filter(el => el.id === sortNameCompany).map(el => el.items.map(el => {
      if (el.id === sortNamePeople) {
        return {...el, firstName: firstNameUpdateInput, lastName: lastNameUpdateInput, position: positionUpdateInput}
      }
      return el
    }))
  let res = data.map((el) => {
    if (el.id === sortNameCompany) {
      return {...el, items: companyOld1.flat()}
    } 
    return el
  })

  setCompany(companyOld1.flat())
  setData(res)
  setFirstNameUpdateInput("")
  setLastNameUpdateInput("") 
  setPositionNameUpdateInput("")
}


const handleNameInput = (e) => setCompanyNameInput(e.currentTarget.value)
const handleAdressInput = (e) => setCompanyAdressInput(e.currentTarget.value)

const handleNameUpdateInput = (e) => setCompanyNameUpdateInput(e.currentTarget.value)
const handleAdressUpdateInput = (e) => setCompanyAdressUpdateInput(e.currentTarget.value)

const addCompanyVisible = () => {
  setVisibleCompany(!visibleCompany)
  setVisiblePeople(false)
}
const addPeopleVisible = () => {
  setVisiblePeople(!visiblePeople)
  setVisibleCompany(false)
}

const visidleUpdateName = () => { setUpdateNameInput(!updateNameInput) }
const visibleUpdateCompany = () => { setUpdateComanyInput(!updateComanyInput) }

const handleSelect = (e) => setSelectValue(e)
const handleFirstNameInput = (e) => setFirstNameInput(e.currentTarget.value) 
const handleLastNameInput = (e) => setLastNameInput(e.currentTarget.value) 
const handlePositionInput = (e) => setPositionNameInput(e.currentTarget.value) 

const handleFirstNameUpdateInput = (e) => setFirstNameUpdateInput(e.currentTarget.value) 
const handleLastNameUpdateInput = (e) => setLastNameUpdateInput(e.currentTarget.value) 
const handlePositionUpdateInput = (e) => setPositionNameUpdateInput(e.currentTarget.value) 

  return (
    <><header> 
      { !updateComanyInput && !updateNameInput && !visibleCompany && !visiblePeople && <>
          <button onClick={() => deleteName()}>Удалить</button>
          <button onClick={() => addCompanyVisible()}>Добавить компанию</button>
          <button onClick={() => addPeopleVisible()}>Добавить Сотрудников</button>
          <button onClick={() => visibleUpdateCompany()}>Изменить компанию</button>
          <button onClick={() => visidleUpdateName()}>Изменить сотрудника</button> </>

      }
      { updateComanyInput &&  
       <form onSubmit={handleCompanyUpdateSumbit}>
        <input
          className="text-field__input" 
          value={companyNameUpdateInput}
          type="text"
          onChange={handleNameUpdateInput}
          placeholder="Введите компанию" />
        <input
          className="text-field__input" 
          value={companyAdressUpdateInput}
          type="text"
          onChange={handleAdressUpdateInput}
          placeholder="Введите Адресс" />
       <button >Сохранить</button>
       <button onClick={visibleUpdateCompany}>Назад</button>
        </form> 
      }
      { updateNameInput &&
          <form onSubmit={handlePeopleUpdateSumbit}>
            <input
              className="text-field__input"
              value={firstNameUpdateInput}
              type="text"
              onChange={handleFirstNameUpdateInput}
              placeholder="Введите имя" />
            <input
              className="text-field__input"
              value={lastNameUpdateInput}
              type="text"
              onChange={handleLastNameUpdateInput}
              placeholder="Введите фамилию" />
            <input
              className="text-field__input"
              value={positionUpdateInput}
              type="text"
              onChange={handlePositionUpdateInput}
              placeholder="Введите должность" />
            <button>Сохранить</button>
            <button onClick={visidleUpdateName}>Назад</button>
          </form>
      }
      {visibleCompany && 
        <form onSubmit={handleCompanyAddSumbit}>
            <input
              className="text-field__input" 
              value={companyNameInput}
              type="text"
              onChange={handleNameInput}
              placeholder="Введите компанию" />
            <input
              className="text-field__input" 
              value={companyAdressInput}
              type="text"
              onChange={handleAdressInput}
              placeholder="Введите Адресс" />
            <button>Сохранить</button>
            <button onClick={addCompanyVisible}>Назад</button>
        </form>
      }
        {visiblePeople && 
              <><select value={selectValue} onChange={(e) => handleSelect(e.target.value)}>
            {data.map((el) => (<option>{el.company}</option>))}
          </select>
          <form onSubmit={handlePeopleAddSumbit}>
              <input
                className="text-field__input"
                value={firstNameInput}
                type="text"
                onChange={handleFirstNameInput}
                placeholder="Введите имя" />
              <input
                className="text-field__input"
                value={lastNameInput}
                type="text"
                onChange={handleLastNameInput}
                placeholder="Введите фамилию" />
              <input
                className="text-field__input"
                value={positionInput}
                type="text"
                onChange={handlePositionInput}
                placeholder="Введите должность" />
              <button>Сохранить</button>
              <button onClick={addPeopleVisible}>Назад</button>
            </form>
            </>
        }
    </header>
    <main>
    <table>
    <tr>
      <td>
      <table className="karse-tablitsy">
      <thead>
      <tr onClick={() => checkAllCompany()}>
      <th><h1>Выделить все</h1></th>
      <th><h1>Компании</h1></th>
      <th><h1>Количество сотрудников</h1></th>
      <th><h1>Адрес</h1></th>
      </tr>
    </thead>
  <tbody>
    {data.map((element, index) => 
        <tr className={`${checked[index] ? "checkbox--active" : ""}`}>
        <td>
           <input type="checkbox"
                  id={`custom-checkbox-${element.id}`}
                  name={element.firstName}
                  value={element.firstName}
                  checked={checked[index]}
                  onChange={() => {
                    handleChange(element, index); 
                    adeptHandler(element.items, element.id, checked[index])}
                  } 
            />
        </td> 
        <th>{element.company}</th>
        <th>{element.items.length}</th> 
        <th>{element.adress}</th>
        </tr>
      )
  }
</tbody>
</table> 
    </td>
    <td>
     <table className="karse-tablitsy">
<thead>
<tr>
  {company.length > 0 && <>
    <th onClick={() => checkAllName()}><h1>Выделить все</h1></th>
    <th><h1>Имя</h1></th>
    <th><h1>Фамилия</h1></th>
    <th><h1>Должность</h1></th> 
  </>}
</tr>
</thead>
<tbody>
  {company.length > 0 && company.map((element, index) => 
    <tr className={`${checkedCompany[index] ? "checkbox--active" : ""}`}>
        <td>
          <input type="checkbox"
                 id={`custom-checkbox-${element.id}`}
                 name={element.firstName}
                 value={element.firstName}
                 checked={checkedCompany[index]}
                 onChange={() => handleChange(element, index, checkedCompany[index])} />
        </td>   
            <th>{element.firstName}</th>
            <th>{element.lastName}</th>
            <th>{element.position}</th>
    </tr>) 
  }
</tbody>

</table> 
    </td>
  </tr>
</table>
  
    </main>
    </>
  );
}
export default Tables;