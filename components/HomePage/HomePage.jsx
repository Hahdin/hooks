
import React from 'react'
import { useState, useEffect, useLayoutEffect, useRef, useReducer } from 'react'
import { EditUserModal } from '../EditUserModal'
import { Button } from "react-bootstrap"

const asyncFcn = (fetching) => {
  return new Promise((resolve, reject) => {
    fetching.current = true
    setTimeout(() => {
      fetching.current = false
      resolve(Math.random() * 100)
    }, 3000)//<-- slow network
  })
}
const initialState = { count: 0 }
const _reducer = (state, action) => {
  switch (action.type) {
    case 'reset': {
      return initialState
    }
    case 'increment': {
      return { count: state.count + 1 }
    }
    case 'decrement': {
      return { count: state.count - 1 }
    }
    default:
      return state
  }
}
export const HomePage = ({ ...props }) => {
  let {initialValueCount} = props
  let fetching = useRef(false)
  const [store, dispatch] = useReducer(_reducer, { count: initialValueCount })
  //define our state vars and setState methods
  const [clicks, setClickState] = useState({ count: 0 })
  const [showModal, toggleModal] = useState(false)
  const [user, updateUser] = useState({
    firstName: 'Bill',
    lastName: 'Jones'
  })
  const [textColor, setColor] = useState('rgb(255,255,0)')
  const [someValue, fetchValue] = useState(null)
  useLayoutEffect(() => {//componentDidMount, useState called
    handleLayout()
  })
  useEffect(() => {//componentDidUpdate
    console.log('** useEffect (componentDidUpdate)**', msg())
  })

  const handleLayout = async () =>{
    try {
      if (!someValue && !fetching.current) {//fetch some data from an api
        fetchValue(await asyncFcn(fetching))
      } else {
        console.log('** useLayoutEffect (componentDidMount, useState called) **', msg())
      }
    }
    catch (e) { console.log(e) }
  }

  const msg = () =>
    `you clicked ${clicks.count} times, toggle: ${showModal}
    set user state -  ${user.firstName} ${user.lastName}
    current color -  ${textColor}, value -  ${someValue}`
  const getClr = () =>
    `rgb(${Math.round(Math.random() * 255)},
    ${Math.round(Math.random() * 255)},
    ${Math.round(Math.random() * 255)})`
  const closeModal = () => {
    toggleModal(false)
  }
  const update = (user) => {
    updateUser({
      firstName: user.firstName,
      lastName: user.lastName
    })
    closeModal(true)
  }
  const updateValue = async () => {
    try {
      if (fetching.current) return
      fetchValue(-999)//flag refetch msg
      fetchValue(await asyncFcn(fetching))
    }
    catch (e) { console.log(e) }
  }
  return (
    <div style={{ color: 'black' }}>
      <div style={{
        padding: '20px',
        margin: 'auto',
        width: '50%'
      }}>
        <Button bsStyle="primary" onClick={() => setClickState({ count: clicks.count + 1 })}>
          Click
        </Button>{" "}
        <Button bsStyle="primary" onClick={() => toggleModal(!showModal)}>
          Edit User
        </Button>{" "}
        <Button bsStyle="primary" onClick={() => setColor(getClr())}>
          Change Color
        </Button>{" "}
        <Button bsStyle="primary" onClick={() => updateValue()} disabled={fetching.current || !someValue} >
          New Value
        </Button>{" "}
      </div>
      <div style={{
        backgroundColor: `${textColor}`,
        padding: '20px',
        margin: 'auto',
        width: '50%',
        textShadow: `2px 2px 1px white`,
        boxShadow: '5px 5px 5px black',
        border: '2px solid white',
        borderRadius: '15px',
        fontSize: '25px'
      }}>
        <div>First: {user.firstName} </div>
        <div>Last: {user.lastName} </div>
        <div>Value: {someValue ? someValue === -999 ? 'Refetching....' : someValue : 'fetching...'} </div>
        <hr />
        <p>You clicked {clicks.count} times</p>
        <p>Reducer counter clicks: {store.count}</p>
      </div>
      <div style={{
        padding: '20px',
        margin: 'auto',
        width: '50%'
      }}>

        <Button bsStyle="primary" onClick={() => dispatch({ type: 'reset' })} >
          Reset
        </Button>{" "}
        <Button bsStyle="primary" onClick={() => dispatch({ type: 'increment' })} >
          Increment
        </Button>{" "}
        <Button bsStyle="primary" onClick={() => dispatch({ type: 'decrement' })} >
          Decrement
        </Button>{" "}
      </div>
      <EditUserModal
        show={showModal}
        close={closeModal}
        update={update}
        user={user}
      />
    </div>)
}
export default HomePage