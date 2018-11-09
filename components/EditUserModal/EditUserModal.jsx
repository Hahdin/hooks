import React from "react"
import { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Button,
} from "react-bootstrap";
export const EditUserModal = ({ ...props }) => {
  let { show, close, user, update } = props
  const [_state, _setState] = useState({
    updatedUser: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    _setState({
      updatedUser: {
        ..._state.updatedUser,
        [`${name}`]: value,
      },
    })
  }
  return (<div>
    <Modal show={show} onHide={close}>
      <ModalHeader>
        <ModalTitle>
          Edit User
      </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div>
          <h2>Make changes</h2>
          <form name="form">
            <div className={'form-group'}>
              <label htmlFor="firstName">First Name</label>
              <input type="text" className="form-control" name="firstName" value={_state.updatedUser.firstName} onChange={handleChange} />
            </div>
            <div className={'form-group'}>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" className="form-control" name="lastName" value={_state.updatedUser.lastName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <Button bsStyle="primary" onClick={() => update(_state.updatedUser)}>
                Update
              </Button>{" "}
            </div>
          </form>
        </div>
        <hr />
        <div>
          <Button bsStyle="primary" onClick={close}>
            Cancel
        </Button>{" "}
        </div>
      </ModalBody>
      <ModalFooter className="text-center">
      </ModalFooter>
    </Modal>
  </div>)
}
export default EditUserModal
