import { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import './ApplicationPage.css';

const ApplicationPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    branch: '',
    year: '',
    domain: '',
    experience: '',
    skills: '',
    motivation: '',
    availability: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 10) {
      newErrors.phone = 'Phone number is too short';
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }

    if (!formData.branch) {
      newErrors.branch = 'Branch is required';
    }

    if (!formData.year) {
      newErrors.year = 'Year is required';
    }

    if (!formData.domain) {
      newErrors.domain = 'Domain is required';
    }

    if (!formData.skills.trim()) {
      newErrors.skills = 'Technical skills are required';
    } else if (formData.skills.trim().length < 10) {
      newErrors.skills = 'Please provide more details about your skills';
    }

    if (!formData.motivation.trim()) {
      newErrors.motivation = 'Motivation is required';
    } else if (formData.motivation.trim().length < 50) {
      newErrors.motivation = 'Please provide at least 50 characters';
    }

    if (!formData.availability) {
      newErrors.availability = 'Time commitment is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'application',
          ...formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          studentId: '',
          branch: '',
          year: '',
          domain: '',
          experience: '',
          skills: '',
          motivation: '',
          availability: ''
        });
        setErrors({});
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        console.error('Error submitting application:', data);
        setSubmitStatus('error');
        if (data.error) {
          setErrors({ general: data.error });
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Apply to Join GARI — GITAM Aerospace Rocketry Initiative"
        description="Join GARI, GITAM University's aerospace team. Apply now to work on CanSat projects, rockets, and compete in national competitions."
        path="/apply"
        keywords="join GARI, GARI recruitment, GITAM aerospace team, student rocketry, aerospace opportunities"
      />
      
      <div className="application-page">
        <section className="page-hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="page-tag">JOIN THE TEAM</span>
              <h1>Apply to GARI</h1>
              <p className="hero-subtitle">
                Build real aerospace hardware, not slides
              </p>
            </motion.div>
          </div>
        </section>

        <section className="content-section">
          <div className="container">
            <div className="section-header-center">
              <span className="section-label">WHY JOIN</span>
              <h2>What You'll Gain</h2>
            </div>

            <div className="benefits-grid">
              <motion.div
                className="benefit-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3>Hands-On Experience</h3>
                <p>Work on real aerospace projects from CanSats to sounding rockets</p>
              </motion.div>

              <motion.div
                className="benefit-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3>National Competitions</h3>
                <p>Compete in IN-SPACe CAN-7USAT 2026 and future rocket competitions</p>
              </motion.div>

              <motion.div
                className="benefit-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3>Expert Mentorship</h3>
                <p>Learn from senior engineers and aerospace professionals</p>
              </motion.div>

              <motion.div
                className="benefit-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3>Team Collaboration</h3>
                <p>Work with passionate students across engineering domains</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="content-section apply-alt-bg">
          <div className="container">
            <div className="apply-form-wrapper">
              <div className="form-header-section">
                <span className="section-label">APPLICATION</span>
                <h2>Submit Your Application</h2>
                <p className="section-desc">
                  Fill out the form below. All fields marked with * are required.
                </p>
              </div>

              {submitStatus === 'success' && (
                <div className="status-message success-message">
                  Application submitted successfully! We'll review and get back to you soon.
                </div>
              )}

              {errors.general && (
                <div className="status-message error-message">
                  {errors.general}
                </div>
              )}

              {submitStatus === 'error' && !errors.general && (
                <div className="status-message error-message">
                  Failed to submit application. Please try again or email us at contact@gari.live
                </div>
              )}

              <form onSubmit={handleSubmit} className="apply-form">
                <div className="form-section-group">
                  <h3 className="form-section-title">Personal Information</h3>
                  
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={errors.fullName ? 'error' : ''}
                      required
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                        required
                        placeholder="your.email@gitam.in"
                      />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'error' : ''}
                        required
                        placeholder="+91 XXXXX XXXXX"
                      />
                      {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>
                  </div>
                </div>

                <div className="form-section-group">
                  <h3 className="form-section-title">Academic Information</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="studentId">Student ID *</label>
                      <input
                        type="text"
                        id="studentId"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        className={errors.studentId ? 'error' : ''}
                        required
                        placeholder="GITAM student ID"
                      />
                      {errors.studentId && <span className="error-text">{errors.studentId}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="year">Current Year *</label>
                      <select
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className={errors.year ? 'error' : ''}
                        required
                      >
                        <option value="">Select year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                      {errors.year && <span className="error-text">{errors.year}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="branch">Branch / Department *</label>
                    <select
                      id="branch"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      className={errors.branch ? 'error' : ''}
                      required
                    >
                      <option value="">Select branch</option>
                      <option value="aerospace">Aerospace Engineering</option>
                      <option value="mechanical">Mechanical Engineering</option>
                      <option value="electrical">Electrical Engineering</option>
                      <option value="electronics">Electronics & Communication</option>
                      <option value="computer-science">Computer Science</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.branch && <span className="error-text">{errors.branch}</span>}
                  </div>
                </div>

                <div className="form-section-group">
                  <h3 className="form-section-title">Domain & Skills</h3>
                  
                  <div className="form-group">
                    <label htmlFor="domain">Preferred Domain *</label>
                    <select
                      id="domain"
                      name="domain"
                      value={formData.domain}
                      onChange={handleChange}
                      className={errors.domain ? 'error' : ''}
                      required
                    >
                      <option value="">Select domain</option>
                      <option value="Structures & Design">Structures & Design</option>
                      <option value="Propulsion">Propulsion</option>
                      <option value="Avionics & Electronics">Avionics & Electronics</option>
                      <option value="Software & Programming">Software & Programming</option>
                      <option value="Recovery Systems">Recovery Systems</option>
                      <option value="Ground Station">Ground Station</option>
                      <option value="Management & Operations">Management & Operations</option>
                      <option value="Media & Outreach">Media & Outreach</option>
                    </select>
                    {errors.domain && <span className="error-text">{errors.domain}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="skills">Technical Skills *</label>
                    <textarea
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      className={errors.skills ? 'error' : ''}
                      required
                      rows="4"
                      placeholder="e.g., CAD (SolidWorks, CATIA), Programming (Python, C++), Electronics (Arduino, PCB design), etc."
                    ></textarea>
                    {errors.skills && <span className="error-text">{errors.skills}</span>}
                    <span className="field-hint">List software, tools, and technologies you're proficient in</span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="experience">Previous Experience</label>
                    <textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Describe any relevant aerospace, robotics, or engineering projects..."
                    ></textarea>
                    <span className="field-hint">Optional - Include academic projects, internships, or personal builds</span>
                  </div>
                </div>

                <div className="form-section-group">
                  <h3 className="form-section-title">Motivation</h3>
                  
                  <div className="form-group">
                    <label htmlFor="motivation">Why join GARI? *</label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleChange}
                      className={errors.motivation ? 'error' : ''}
                      required
                      rows="5"
                      placeholder="Share your passion for aerospace, what you hope to learn, and how you'll contribute to the team..."
                    ></textarea>
                    {errors.motivation && <span className="error-text">{errors.motivation}</span>}
                    <span className="field-hint">Min. 50 characters - Tell us your aerospace journey and goals</span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="availability">Time Commitment *</label>
                    <select
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className={errors.availability ? 'error' : ''}
                      required
                    >
                      <option value="">Select availability</option>
                      <option value="5-10 hours per week">5-10 hours per week</option>
                      <option value="10-15 hours per week">10-15 hours per week</option>
                      <option value="15-20 hours per week">15-20 hours per week</option>
                      <option value="20+ hours per week">20+ hours per week</option>
                    </select>
                    {errors.availability && <span className="error-text">{errors.availability}</span>}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="container">
            <div className="section-header-center">
              <span className="section-label">SELECTION PROCESS</span>
              <h2>What Happens Next?</h2>
            </div>

            <div className="process-timeline">
              <div className="process-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Application Review</h3>
                  <p>Team reviews your application within 5-7 business days</p>
                </div>
              </div>

              <div className="process-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Interview</h3>
                  <p>Shortlisted candidates meet with team leads</p>
                </div>
              </div>

              <div className="process-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Selection</h3>
                  <p>Selected candidates receive an offer to join GARI</p>
                </div>
              </div>

              <div className="process-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Onboarding</h3>
                  <p>Welcome to GARI! Begin with team orientation</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ApplicationPage;
