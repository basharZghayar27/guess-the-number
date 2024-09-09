import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import './SpeedSlider.css';

const SpeedSlider: React.FC = () => {
  const [selectedSpeed, setSelectedSpeed] = useState(1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSpeed(parseInt(event.target.value));
  };

  return (
    <>
      <Row className="align-items-center mb-3">
        <Col>
          <h6 className="mb-0 text-danger">Speed</h6>
        </Col>
      </Row>

      <div className="slider-wrapper position-relative">
        <input
          type="range"
          className="form-range"
          min={1}
          max={5}
          value={selectedSpeed}
          onChange={handleChange}
        />

        <div
          className="slider-background position-absolute bg-gradient-danger rounded"
          style={{ left: `${(selectedSpeed - 1) * 20}%`, width: '20%' }}
        />

        <div className="speed-labels d-flex justify-content-between">
          {[1, 2, 3, 4, 5].map((speed) => (
            <span key={speed} className="speed-label">
              {speed}x
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default SpeedSlider;
