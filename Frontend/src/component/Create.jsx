import React, { useState } from 'react';
import '../styles/Create.scss';

function Create() {
  const [step, setStep] = useState(0);
  const [images, setImages] = useState([]);

  const handleSubmit = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleImageUpload = (event) => {
    if (images.length < 4) {
      const files = Array.from(event.target.files).slice(0, 4 - images.length);
      setImages([...images, ...files]);
    }
  };

  return (
    <div className='create-container'>
      <h1>Create New Post</h1>
      <div className='progress-bar'>
        <div className='progress-line'>
          <div className='filled' style={{ width: `${(step / 2) * 100}%` }}></div>
        </div>
        {[1, 2, 3].map((num, index) => (
          <div key={index} className={`step-circle ${step >= index ? 'active' : ''}`}>
            {num}
            {step === index && (
              <div className='tooltip'>Step {num}: {['Owner Info', 'Property Info', 'Upload Images'][index]}</div>
            )}
          </div>
        ))}
      </div>
      <p className='step-info'>Step {step + 1}: {['Owner Info', 'Property Info', 'Upload Images', 'Submit'][step]}</p>

      <div className='form-sections'>
        {step === 0 && (
          <div className='owner-input'>
            <h1>Owner Information</h1>
            <input type='text' required placeholder='Full Name' />
            <input type='tel' required placeholder='07xxxxxxxxxx' />
            <input type='email' required placeholder='owner@gmail.com (Optional)' />
          </div>
        )}

        {step === 1 && (
          <div className='propertie-input'>
            <h1>Property Information</h1>
            <input type='text' required placeholder='State' />
            <input type='text' required placeholder='Town Hall' />
            <input type='text' required placeholder='Street' />
            <div className='measure-container'>
              <input type='number' required placeholder='H: 190m' />
              <input type='number' required placeholder='W: 200m' />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className='image-upload'>
            <h1>Upload Images</h1>
            <input type='file' accept='image/*' multiple onChange={handleImageUpload} />
            <p>{images.length} / 4 images uploaded</p>
            <div className='image-preview'>
              {images.map((img, index) => (
                <img key={index} src={URL.createObjectURL(img)} alt='Preview' />
              ))}
            </div>
          </div>
        )}
      </div>

      <button className='submit-btn' onClick={handleSubmit}>
        {step < 3 ? 'Next' : 'Submit'}
      </button>
    </div>
  );
}

export default Create;
