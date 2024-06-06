import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { updateTask } from "../redux/actions/taskAction";
import { connect } from "react-redux";

const EditForm = ({
  show,
  onHide,
  formData,
  handleChange,
  handleSubmit,
  setFormData,
  task,
}) => {
  const resetFormData = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      priority: task.priority,
      status: task.status,
    }));
  };

  const handleReset = () => {
    resetFormData();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              readOnly
            />
          </Form.Group>
        
          <Form.Group controlId="priority">
            <Form.Label>Priority:</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="status">
            <Form.Label>Status:</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="Pending">Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </Form.Control>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit" className="mt-3">
              Save Changes
            </Button>
            <Button
              variant="secondary"
              className="ml-2 mt-3"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

// export default EditForm;
export default connect(null, { updateTask })(EditForm);
