
import React from 'react';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { EditUserModal } from '../EditUserModal'

const asyncFcn = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Math.random() * 100)
    }, 3000)//<-- slow network
  })
}
export const HomePage = ({ ...props }) => {
  let fetching = useRef(false)
  const [clicks, setClickState] = useState({ count: 0 })
  const [showModal, toggleModal] = useState(false)
  const [user, updateUser] = useState({
    firstName: 'Bill',
    lastName: 'Jones'
  })
  const [textColor, setColor] = useState('rgb(2,2,255)')
  const [someValue, fetchValue] = useState(null)
  useLayoutEffect(async () => {//componentDidMount, useState called
    if (!someValue && !fetching.current){//fetch some data from an api
      fetching.current = true
      fetchValue(await asyncFcn())
      fetching.current = false
    } else{
      console.log(`** useLayoutEffect **
      you clicked ${clicks.count} times
      toggle: ${showModal}
      set user state -  ${user.firstName} ${user.lastName}
      current color -  ${textColor}
      value -  ${someValue}
      `)
    }
    return () => {//componentWillUnmount
      console.log('useLayoutEffect - clean up, or do something')
    }
  })
  useEffect(() => {//componentDidUpdate
    console.log(`** useEffect **
      you clicked ${clicks.count} times
      toggle: ${showModal}
      set user state -  ${user.firstName} ${user.lastName}
      current color -  ${textColor}
      value -  ${someValue}
    `)
    return () => {//componentWillUnmount
      console.log('useEffect - clean up, or do something')
    }
  })
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
  const updateValue = async() =>{
    fetchValue(-999)//flag refetch msg
    fetchValue(await asyncFcn())
  }
  return (
    <div style={{ color: textColor }}>
      <p>You clicked {clicks.count} times</p>
      <button onClick={() => setClickState({ count: clicks.count + 1 })}>Click</button>
      <button onClick={() => toggleModal(!showModal)}>Show</button>
      <button onClick={() => setColor(`rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`)}>Color</button>
      <button onClick={() => updateValue() }>New Value</button>
      <div>First: {user.firstName} </div>
      <div>Last: {user.lastName} </div>
      <div>Value: {someValue ? someValue === -999 ? 'Refetching....' : someValue : 'fetching...'} </div>
      <EditUserModal
        show={showModal}
        close={closeModal}
        update={update}
        user={user}
      />
    </div>)
}
export default HomePage