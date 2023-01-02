import React, { useEffect, useMemo, useState } from 'react';
import icon from "../images/icon.png";
import "../components/Todo.css";


// to get the data from localStorage
const getlocalItems = () => {
    let list = localStorage.getItem('lists');
    console.log(list);

    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getlocalItems());

    const AddItems = () => {
        if (inputData === "") {

        } else {
            setItems([...items, inputData])
            console.log(items)
            setInputData('')
        }
    }

    const deleteItem = (id) => {
        const updatedData = items.filter((elm, ind) => {
            return ind !== id;
        })
        setItems(updatedData);
    }

    const removeAll = () => {
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items])

    return (
        <div className='container-fluid text-center mt-5'>
            <div>
                <img src={icon} alt="todoIcon" width={60} />
            </div>

            <div className='text-center text-white mt-2'>
                <p>Add your List Here ✌</p>
            </div>

            <div className='inputList my-2'>
                <input onChange={(e) => { setInputData(e.target.value) }} value={inputData} type="text" placeholder='✍️ Enter items' className='px-2' />
                <button onClick={AddItems} className='addBtn'>Add</button>
            </div>

            <div className='showItems'>
                {items.map((elm, ind) => {
                    return <div className="eachItem my-2" key={ind}>
                        <h3>{elm}</h3>
                        <div className='delBtn' onClick={() => deleteItem(ind)}>❌</div>
                    </div>
                })}
            </div>

            <div className='removeAll my-2'>
                {items.length >= 2 ? <button className='removeBtn' onClick={removeAll}>Remove All</button> : ''}
            </div>
        </div>
    )
}

export default Todo
