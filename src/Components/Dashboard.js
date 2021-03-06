import React, { useState, useContext, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom'
import axiosWithAuth from './utils/axiosWithAuth'

import {useRecoilState} from 'recoil'
import {userInfoState} from '../States'


const initialForm ={
    "itemname": "",
    "itemtype": "",
    "itemdescr": "",
    "itemlocat": "",
    "isavailable": true,
    "itemrate": 0,
    "itemimg": ""
  }

export default function Dashboard(props){
    const [userInfo, setUserInfo] = useRecoilState(userInfoState)
    //const [userInfo, setUserInfo] = useState({items:[]})
    const [form, setForm] = useState(initialForm)
    const [tokenValue, setTokenValue] = useState();
    const [editing, setEditing] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(initialForm);
    //FUNCTIONS
    //Make current user a lender



    function promoteToLender(e){
        axiosWithAuth()
            .patch(`/roles/promote`, {})
            .then(res => {
                console.log('promote',res)
                const t = window.localStorage.getItem('token')
                console.log(t)
                window.localStorage.removeItem('token')
                //window.localStorage.setItem('token', t)
            })
            .catch(err => {
                console.log('promote error', err)
            })
    }
    //Get user info
    function getUserInfo(){
        axiosWithAuth()
            .get('/users/getuserinfo')
            .then(res => {
                console.log('User Info:', res)
                setUserInfo(res.data)
            })
            .catch(err => console.log('Get User Info error', err))
    }

    const editItem = item => {
        setEditing(true)
        setItemToEdit(item)
    }

    //Change handler
    const handleChange = e =>{
        setForm({...form,[e.target.name]: e.target.value })
    }

    const handleEditChange = e =>{
        setItemToEdit({...itemToEdit,[e.target.name]: e.target.value })
    }

    const saveEdit = e => {
        e.preventDefault();
        console.log(itemToEdit)
        // Make a put request to save your updated color
        // think about where will you get the id from...
        // where is is saved right now?
        axiosWithAuth()
          .patch(`/items/item/${itemToEdit.itemid}`, itemToEdit)
          .then(res => {
            getUserInfo();
          })
          .catch(err => console.log(err));
    };

    const deleteItem = item => {
        //e.preventDefault();
        axiosWithAuth()
          .delete(`/items/item/${item.itemid}`)
          .then(res => {
              getUserInfo();
          })
          .catch(err => console.log(err));
    };

    const submitItem = e => {
        e.preventDefault();
        console.log('Submitting this item object:', form)
        axiosWithAuth()
            .post('/items/item', form)
            .then(res => {
                console.log('Response from posting item')
                setForm(initialForm)
                getUserInfo();
            })
            .catch(err=> console.log('submit item error', err))
    }

    //Save user info to state on load
    useEffect(() => {
        getUserInfo();
      }, [])

    return(
        <div>
            <h1>Account Details</h1>
            <div className='top-half'>
                <div className='account-info'>
                    <p>Account Name: {userInfo.username}</p>
                    <p>Account Email: {userInfo.primaryemail}</p>
                    <button onClick={promoteToLender}>Become a Lender!</button>
                </div>
                <form className='new-listing' onSubmit={submitItem}>
                    <h3>Create a new listing!</h3>
                    <label> {'Item Name:  '}
                        <input 
                            name='itemname'
                            onChange={handleChange} 
                            placeholder='Item Name'
                            value={form.itemname}
                            type='text' />
                    </label>
                    <label> {'Item Type:  '}
                        <input 
                            name='itemtype'
                            onChange={handleChange} 
                            placeholder='Item Type'
                            value={form.itemtype}
                            type='text' />
                    </label>
                    <label> {'Item Description:  '}
                        <input 
                            name='itemdescr'
                            onChange={handleChange} 
                            placeholder='Item Description'
                            value={form.itemdescr}
                            type='text' />
                    </label>
                    <label> {'Rental Rate:  '}
                        <input 
                            name='itemrate'
                            onChange={handleChange} 
                            placeholder='Item Rate'
                            value={form.itemrate}
                            type='text' />
                    </label>
                    <label> {'Item Location:  '}
                        <input 
                            name='itemlocat'
                            onChange={handleChange} 
                            placeholder='Item Location'
                            value={form.itemlocat}
                            type='text' />
                    </label>
                    <label> {'Item Picture:  '}
                        <input 
                            name='itemimg'
                            onChange={handleChange} 
                            placeholder='Item Image Link'
                            value={form.itemimg}
                            type='text' />
                    </label>
                    <button>Add Item</button>
                </form>
            </div>
            <div className='bottom-half'>
                <h2>Your Listed Items</h2>
                <div className='item-gallery'>
                    
                    {userInfo.items.map(item =>(
                        <div
                            className='item-card'
                            key={item.itemid}
                        >
                            <span>{item.itemname}</span>
                            <span>${item.itemrate}</span>
                            <br/>
                            <img className='listing-img' src={item.itemimg} alt='your item'/>
                            <button onClick={() => editItem(item)}>Edit</button>
                            <button onClick={e => {
                                e.stopPropagation();
                                deleteItem(item)
                            }}>Delete</button>
                        </div>
                    ))}
                </div>
                {editing && (
                    <div>

                    <h5>Edit Item</h5>
                    <form onSubmit={saveEdit}>
                        
                        <label> {'Item Name:  '}
                            <input 
                                name='itemname'
                                onChange={handleEditChange} 
                                placeholder='Item Name'
                                value={itemToEdit.itemname}
                                type='text' />
                        </label>
                        <label> {'Item Type:  '}
                            <input 
                                name='itemtype'
                                onChange={handleEditChange} 
                                placeholder='Item Type'
                                value={itemToEdit.itemtype}
                                type='text' />
                        </label>
                        <label> {'Item Description:  '}
                            <input 
                                name='itemdescr'
                                onChange={handleEditChange} 
                                placeholder='Item Description'
                                value={itemToEdit.itemdescr}
                                type='text' />
                        </label>
                        <label> {'Rental Rate:  '}
                            <input 
                                name='itemrate'
                                onChange={handleEditChange} 
                                placeholder='Item Rate'
                                value={itemToEdit.itemrate}
                                type='text' />
                        </label>
                        <label> {'Item Location:  '}
                            <input 
                                name='itemlocat'
                                onChange={handleEditChange} 
                                placeholder='Item Location'
                                value={itemToEdit.itemlocat}
                                type='text' />
                        </label>
                        <label> {'Item Picture:  '}
                            <input 
                                name='itemimg'
                                onChange={handleEditChange} 
                                placeholder='Item Image Link'
                                value={itemToEdit.itemimg}
                                type='text' />
                        </label>
                        <div className="button-row">
                            <button type="submit">save</button>
                            <button onClick={() => setEditing(false)}>cancel</button>
                        </div>
                    </form>
                </div>
                )}

            </div>
        </div>
    )
}