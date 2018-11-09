
import React from 'react';
import { useState, useEffect } from 'react';
import {EditUserModal} from '../EditUserModal'
export const HomePage = ({ ...props }) => {
  const [clicks, setClickState] = useState({count: 0})
  const [showModal, toggleModal] = useState(false)
  const [user, updateUser] = useState({
    firstName: 'Mark',
    lastName: 'Foster'
  })
  const [textColor, setColor] = useState('rgb(2,2,255)')
  useEffect(() => {
    console.log(`
      you clicked ${clicks.count} times
      toggle: ${showModal}
      set user state -  ${user.firstName} ${user.lastName}
      current color -  ${textColor}
    `)
    return () =>{
      console.log('clean up, or do something')
    }
  })
  const closeModal = () =>{
    toggleModal(false)
  }
  const update = (user) =>{
    updateUser({
      firstName: user.firstName,
      lastName: user.lastName
    })
    closeModal(true)
  }
  return (
  <div style={{color: textColor}}>
    <p>You clicked {clicks.count} times</p>
    <button onClick={() => setClickState({count: clicks.count + 1})}>Click</button>
    <button onClick={() => toggleModal(!showModal)}>Show</button>
    <button onClick={() => setColor(`rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`)}>Color</button>
    <div>First: {user.firstName} </div>
    <div>Last: {user.lastName} </div>
    <EditUserModal
      show={showModal}
      close={closeModal}
      update={update}
      user = {user}
    />
  </div>)
}
export default HomePage