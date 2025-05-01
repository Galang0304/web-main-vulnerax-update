import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import useTestStore from '@/store/report-store';

// Fungsi untuk mensanitasi input (mengganti karakter khusus)
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/&/g, '&')
    .replace(/"/g, '"')
    .replace(/\//g, '/');
};

const BASE_URL = 'https://vulnerax.id';

// Daftar domain email publik yang tidak diperbolehkan
const PUBLIC_EMAIL_DOMAINS = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'mail.com',
  'protonmail.com',
  'zoho.com',
  'gmx.com',
  'yandex.com',
  'live.com',
  'msn.com',
  'me.com',
  'inbox.com',
  'rocketmail.com',
];

const CompanyForm = ({ show, handleClose, apiKey, onSuccess }) => {
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const { companyData, setCompanyData, setCompanyId, setApiKey } = useTestStore();

  const [formData, setFormData] = useState({
    firstName: sanitizeInput(companyData?.first_name || ''),
    lastName: sanitizeInput(companyData?.last_name || ''),
    companyEmail: sanitizeInput(companyData?.company_email || ''),
    companyName: sanitizeInput(companyData?.company_name || ''),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
    setErrorMessage('');
  };

  const validateEmail = (email) => {
    // 1. Validasi format email menggunakan regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }

    // 2. Periksa apakah domain email adalah domain publik
    const domain = email.split('@')[1].toLowerCase();
    if (PUBLIC_EMAIL_DOMAINS.includes(domain)) {
      return 'Please use a company or organization email (e.g., name@company.com), not a public email like Gmail or Yahoo';
    }

    return ''; // Tidak ada error
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    const emailError = validateEmail(formData.companyEmail);
    if (emailError) newErrors.companyEmail = emailError;
    if (!formData.companyName.trim()) newErrors.companyName = 'Company Name is required';
    return newErrors;
  };

  const fetchCompanyById = async (companyId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/companies/${companyId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': apiKey,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to fetch company data (Status: ${response.status})`);
      }

      const companyData = await response.json();
      return companyData;
    } catch (error) {
      throw new Error(error.message || 'An error occurred. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (!apiKey) {
      setErrorMessage('An error occurred. Please try again later.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const dataToSend = {
        full_name: sanitizeInput(formData.firstName + ' ' + formData.lastName),
        first_name: formData.firstName,
        last_name: formData.lastName,
        company_email: formData.companyEmail,
        company_name: formData.companyName,
        is_paid: true,
      };

      const response = await fetch(`${BASE_URL}/api/v1/companies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': apiKey,
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData.error || errorData.message || 'An error occurred. Please try again later.';
        throw new Error(errorMsg);
      }

      const savedCompany = await response.json();

      if (!savedCompany.id) {
        throw new Error('An error occurred. Please try again later.');
      }

      setCompanyId(savedCompany.id);
      setApiKey(apiKey);
      setCompanyData(savedCompany);

      // Verifikasi dengan fetch ulang
      const fetchedCompany = await fetchCompanyById(savedCompany.id);
      setCompanyData(fetchedCompany);

      onSuccess();
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
      if (!errorMessage) handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" className="contact" centered>
      <Modal.Header closeButton />
      <div className="contact-form">
        <Modal.Body>
          <h3>Get Your Score</h3>
          <p>Ransomware Readiness Assessment Test Result</p>

          <Form onSubmit={handleSubmit}>
            <div className="row gy-4">
              <div className="col-12">
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </div>
              <div className="col-md-12">
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lastName}
                </Form.Control.Feedback>
              </div>
              <div className="col-12">
                <Form.Control
                  type="email"
                  name="companyEmail"
                  placeholder="Email Company"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  isInvalid={!!errors.companyEmail}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.companyEmail}
                </Form.Control.Feedback>
              </div>
              <div className="col-12">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  isInvalid={!!errors.companyName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.companyName}
                </Form.Control.Feedback>
              </div>
              <div className="col-12 text-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="ms-2">Calculating...</span>
                    </>
                  ) : (
                    'Calculate Score'
                  )}
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default CompanyForm;