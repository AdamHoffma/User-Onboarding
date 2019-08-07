import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Form, Field, withFormik} from 'formik';
import * as Yup from 'yup'


const PersonForm = ({errors, touched, values, handleSubmit, status}) => {

    const [users, setUsers] = useState([])   
    
    useEffect(() => {
        if (status) {
            setUsers([...users, status])
        }
    },[status])
    console.log(users)
    return (        
        <div className="form">            
            <h1 className="heading">Form</h1>
            <div className="spacer"></div>
            <Form>
                <Field className="field" type="text" name="name" placeholder="name"/>
                    {touched.name && errors.name && (
                        <p className="error">{errors.name}</p>
                    )}
                <Field className="field" type='text' name="email" placeholder="email"/>
                        {touched.email && errors.email && (
                            <p className='error'>{errors.email}</p>
                        )}
                <Field className="field" type='text' name='password' placeholder='password'/>
                        {touched.password && errors.password && (
                            <p className="error">{errors.password}</p>
                        )}
                <Field className='field' type="text" name="weapon" placeholder="weapon"/>
                        {touched.password && errors.password && (
                            <p className="error">{errors.weapon}</p>
                        )}

                <Field className="field" type="text" name="user" placeholder="UserName"/>
                        {touched.user && errors.user && (
                            <p className="error">{errors.user}</p>
                        )}
            
            <div className='style'>
                <Field  component="select" className="drop_down" name="role">
                    <option>Choose your role</option>
                    <option value="Supreme Leader">Supreme Leader</option>
                    <option value="King of All">King of All</option>
                    <option value="Lord of the First Ones">Lord of the First Ones</option>
                    <option value="peasant">Peasant</option>
                </Field>
                <label> Did Ya Read the Terms?? No you didn't
                    <Field className="field" type='checkbox' name="terms_service" checked={values.terms_service} />
                        <span className="box"/>
                </label>
            </div>
                
                    
                <button type='submit'>Submit</button>
            </Form>
            {users.map(user => (
                <p key={user.id}>Name: {user.name}<br/>   Email:  {user.email}<br/> Weapon:  {user.weapon}<br/> UserName:  {user.user}<br/>Role: {user.role}</p>
            ))}
        </div>
    )
}

const FormikPersonForm = withFormik({
    mapPropsToValues({name, email, password, terms_service, role, weapon}) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            terms_service: terms_service || false,
            role: role || '',
            weapon: weapon || ''
        }
    },
validationSchema: Yup.object().shape({
    name: Yup.string().required('nonononono'),
    email: Yup.string().email('gotta be an @me bro').required('cmon man....really?'),
    password: Yup.string().min(6, 'stronger!!').required('I thought we went over this'),
    weapon: Yup.string().required('Pistols? Dawn?')
}),

handleSubmit(values, {setStatus}) {
    axios
        .post('https://reqres.in/api/users', values)
        .then(response => {
            setStatus(response.data)
            console.log(setStatus)
        })
        .catch(error => console.log(error.response))
}

})(PersonForm)

export default FormikPersonForm

