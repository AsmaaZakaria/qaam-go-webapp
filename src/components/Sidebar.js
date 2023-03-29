import React, { useState } from 'react';
import { Form, Nav, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowRight } from 'react-bootstrap-icons';

import fetchApi from "../fetchApi";
import { fetchImage } from '../slices/imageSlice';
import { API_ORIGIN, API_IMAGE, API_START, PRODUCTS, TEAMS } from '../constants';

function Sidebar() {
    const dispatch = useDispatch();
    const { imageURL } = useSelector((state) => state.image);

    const [image, setImage] = useState("");
    const [product, setProduct] = useState("Pdf2Go");
    const [team, setTeam] = useState("Groot");
    const [validated, setValidated] = useState(false);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          submitImage();
        }
    };
    
    const handleInputChange = (event) => {
        setImage(event.target.value);
    };
  
    const submitImage = () => {
        fetchApi(API_ORIGIN, "POST", { image })
          .then(() => {
            // reset input value
            setImage(" ");
            // dispatch fetchImage
            dispatch(fetchImage(API_IMAGE));
          })
          .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
          });    
    };

    const handleProductChange = (e) => {
      setProduct(e.target.value);
    }

    const handleTeamChange = (e) => {
      setTeam(e.target.value);
    }

    const handleSubmit = (event) => {
      fetchApi(API_START, "POST", { image: imageURL, product, team })
        .then(() => {
          // reset values
          setImage("");
          setProduct("Pdf2Go");
          setTeam("Groot");
          // redirect to qaamgo
          window.location.href = "https://www.qaamgo.com";
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });  
    }
  
    return (
      <Nav className="col-xs-6 col-md-4 d-md-block bg-light sidebar">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label aria-label="image-url-label">Image URL</Form.Label>
              <div style={{ display: "flex" }}>
                <Form.Control 
                  type="text" 
                  placeholder="Image URL"
                  aria-label="image-url-input"
                  required
                  value={image} 
                  onChange={handleInputChange} 
                  onKeyDown={handleKeyDown}          
                />
                <Button onClick={submitImage}>
                  <ArrowRight />
                </Button>
              </div>
              <Form.Control.Feedback type="invalid">
                Please enter a image URL.
              </Form.Control.Feedback>
          </Form.Group>        
          <Form.Group className="mb-3">
            <Form.Label>Product</Form.Label>
            <Form.Select aria-label="select favorite product" value={product} onChange={handleProductChange}>
              {PRODUCTS.map(product => <option key={product} value={product}>{product}</option>)}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Team</Form.Label>
            <Form.Select aria-label="select favorite team" value={team} onChange={handleTeamChange}>
              {TEAMS.map(team => <option key={team} value={team}>{team}</option>)}          
            </Form.Select>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </Form>      
      </Nav>
    );
  }

  export default Sidebar;