import { createSlice } from '@reduxjs/toolkit'

const rtkSlice = createSlice({
    name: 'rtkSlice',
    initialState: {
        companies: [
            {company: 'Adept', adress: 'Нижний Новгород, проспект Гагарина, 50к9', id: 100, items: [
                {id: 1, firstName:'Евгений', lastName:'Бондаренко', position: 'Frondend Developer'},
                {id: 2, firstName:'Иван', lastName:'Петров', position: 'Frondend Developer'},
                {id: 3, firstName:'Иван', lastName:'Петров', position: 'Frondend Developer'},
                {id: 4, firstName:'Иван', lastName:'Петров', position: 'Frondend Developer'}
            ]},
            {company:'Apple', adress: 'One Apple Park Way Cupertino, CA 95014', id: 200, items: [
                {id: 5, firstName:'Stive', lastName:'Jobs', position: 'Seo'},
                {id: 6, firstName:'Tim', lastName:'Cook', position: 'Seo'},
                {id: 7, firstName:'Stive', lastName:'Jobs', position: 'Seo'}
            ]},
            {company:'Lad', adress: 'Нижний Новгород, ул. Родионова, д.23А, оф. 3', id: 300, items: [
                {id: 8, firstName:'Мария', lastName:'Иванова', position: 'Backend Developer'},
                {id: 9, firstName:'Максим', lastName:'Максимов', position: 'FullStack Developer'},
                {id: 10, firstName:'Мария', lastName:'Иванова', position: 'Backend Developer'},
                {id: 11, firstName:'Максим', lastName:'Максимов', position: 'FullStack Developer'},
                {id: 12, firstName:'Мария', lastName:'Иванова', position: 'Backend Developer'},
                {id: 13, firstName:'Максим', lastName:'Максимов', position: 'FullStack Developer'},
                {id: 14, firstName:'Мария', lastName:'Иванова', position: 'Backend Developer'}
            ]}
        ],
    },
    reducers: {
        getСompanies(state,action){
            state.lol = action.payload
            console.log('getСompanies action.payload', action.payload);
        },
        removeName(state,action){
            // state.companies = state.companies.filter((el)=> el.id !== action.payload)
            console.log('state.companies',state);
            console.log('action.payload',action.payload);
        },  
    }
})

export default rtkSlice.reducer
export const {getCompanies,removeName} = rtkSlice.actions