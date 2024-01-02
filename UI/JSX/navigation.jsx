import React from 'react';
import {Routes,Route,HashRouter}  from 'react-router-dom';
import EmployeeDirectory from './EmployeeDirectory.jsx';
import EmployeeSearch from './EmployeeSearch.jsx';
import EmployeeCreate from './EmployeeCreate.jsx';
import EmployeeEdit  from './EmployeeEdit.jsx';


function NotFound() { return <h1>OOPS!!! Page Not Found..</h1>};

export default function NavLinks(){
    return (
       <div>
        <Routes>
                <Route path='/' element={<EmployeeDirectory />}></Route>
                <Route path='/EmployeeCreate' element={<EmployeeCreate/>}></Route>
                <Route path='/EmployeeEdit/:id' element={<EmployeeEdit />} />
                <Route path='*' element={<NotFound />}></Route>
            </Routes>
       </div>
    )
    
}