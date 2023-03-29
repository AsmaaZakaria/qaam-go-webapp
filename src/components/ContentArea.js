import React, { useEffect } from 'react';
import { Container, Image, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { fetchImage } from '../slices/imageSlice';
import { API_ORIGIN } from '../constants';

function ContentArea() {
  const dispatch = useDispatch();
  const { imageURL, loading, error } = useSelector((state) => state.image);

  useEffect(() => {
    dispatch(fetchImage(API_ORIGIN));
  }, [dispatch]);

  if (loading) {
    return (
      <Container className="col-md-8 center d-flex justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
      
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container className="col-md-8 d-flex" style={{ padding: "10rem"}}>
        {imageURL && <Image 
          src={imageURL} 
          style={{ border: "1px solid #ddd", borderRadius: "4px", padding: "5px",  maxWidth: "100%", height: "auto" }}
        />}
    </Container>
  );
}

export default ContentArea;
