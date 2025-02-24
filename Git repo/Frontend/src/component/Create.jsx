import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/Create.scss';

function Create() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [images, setImages] = useState([]);
  const [hoveredStep, setHoveredStep] = useState(null);

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

  const stepTitles = [
    t('steps.ownerInfo'),
    t('steps.propertyInfo'),
    t('steps.uploadImages'),
    t('steps.submitInfo')
  ];

  return (
    <div className='create-container'>
      <h1>{t('createTitle')}</h1>
      <div className='progress-bar'>
        <div className='progress-line'>
          <div className='filled' style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
        {[1, 2, 3, 4].map((num, index) => (
          <div 
            key={index} 
            className={`step-circle ${step >= index ? 'active' : ''}`} 
            onMouseEnter={() => setHoveredStep(index)}
            onMouseLeave={() => setHoveredStep(null)}
          >
            {num}
            {hoveredStep === index && (
              <div className='tooltip'>{t('step')} {num}: {stepTitles[index]}</div>
            )}
          </div>
        ))}
      </div>
      <p className='step-info'>{t('step')} {step + 1}: {stepTitles[step]}</p>

      <div className='form-sections'>
        {step === 0 && (
          <div className='owner-input'>
            <h1>{t('steps.ownerInfo')}</h1>
            <input type='text' required placeholder={t('placeholders.fullName')} />
            <input type='tel' required placeholder={t('placeholders.phone')} />
            <input type='email' required placeholder={t('placeholders.email')} />
          </div>
        )}

        {step === 1 && (
          <div className='propertie-input'>
            <h1>{t('steps.propertyInfo')}</h1>
            <input type='text' required placeholder={t('placeholders.state')} />
            <input type='text' required placeholder={t('placeholders.townHall')} />
            <input type='text' required placeholder={t('placeholders.street')} />
            <div className='measure-container'>
              <input type='number' required placeholder={t('placeholders.height')} />
              <input type='number' required placeholder={t('placeholders.width')} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className='image-upload'>
            <label htmlFor="file-input">{t('uploadPrompt')}</label>
            <input id="file-input" type='file' accept='image/*' multiple onChange={handleImageUpload} />
            <p>{images.length} / 4 {t('imagesUploaded')}</p>
            <div className='image-preview'>
              {images.map((img, index) => (
                <img key={index} src={URL.createObjectURL(img)} alt='Preview' />
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className='submit-info'>
            <h1>{t('steps.submitInfo')}</h1>
            <p>{t('submitMessage')}</p>
          </div>
        )}
      </div>

      <button className='submit-btn' onClick={handleSubmit}>
        {step < 3 ? t('next') : t('submit')}
      </button>
    </div>
  );
}

export default Create;
