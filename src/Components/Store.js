import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Store(){
    const [items, setItems] = useState([])

    const loadItems = () => {
        axios
        .get("http://keg8893.herokuapp.com/items/items")
        .then( res => {
          console.log(res);
          setItems(res.data)
        })
          .catch( err => {
            console.log('load items error', err)
          })
    }

    useEffect(() => {
        loadItems()
    }, [])

    return (
        <div>
            {items.map(
                item => (
                    <div>
                        <img src={item.itemimg} alt={item.itemname}></img>
                        <h3>{`Name: ${item.itemname}`}</h3>
                        <h4>{`Price: ${item.itemrate}`}</h4>
                    </div>
                )
            )}
        </div>
        

    )
}