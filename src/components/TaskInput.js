import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions/taskAction'; 
const TaskInput = ({  onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: '',
    team:'',
    priority: 'P0'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // console.log("Form data submitted:", formData); 
    dispatch(addTask(formData)); // Dispatch addTask action with form data
    // console.log("Form submitted. Closing modal...");
    // console.log(formData);
    // console.log("this is another")
    onClose(); // Close the form after submitting
  };
  
  

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title" className="row">
            <Form.Label column sm={3}>Title:</Form.Label>
            <div className="col-sm-9">
              <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>
          </Form.Group>

          <Form.Group controlId="description" className="row mt-3">
            <Form.Label column sm={3}>Description:</Form.Label>
            <div className="col-sm-9">
              <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
            </div>
          </Form.Group>
          <Form.Group controlId="team" className="row mt-3">
  <Form.Label column sm={3}>Team:</Form.Label>
  <div className="col-sm-9">
    <Form.Control type="text" name="team" value={formData.team} onChange={handleChange} required />
  </div>
</Form.Group>

          <Form.Group controlId="assignee" className="row mt-3">
            <Form.Label column sm={3}>Assignee:</Form.Label>
            <div className="col-sm-9">
              <Form.Control type="text" name="assignee" value={formData.assignee} onChange={handleChange} required />
            </div>
          </Form.Group>

          <Form.Group controlId="priority" className="row mt-3">
            <Form.Label column sm={3}>Priority: <span className="caret"></span></Form.Label>
            <div className="col-sm-3">
              <div className="input-group">
                <Form.Control as="select" name="priority" value={formData.priority} onChange={handleChange} className="custom-select">
                  <option value="P0">P0</option>
                  <option value="P1">P1</option>
                  <option value="P2">P2</option>
                </Form.Control>
                
              </div>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Form onSubmit={handleSubmit}> {/* Bind handleSubmit to onSubmit event */}
  {/* Form fields */}
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>

      </Modal.Footer>
    </Modal>
  );
}

export default TaskInput;
