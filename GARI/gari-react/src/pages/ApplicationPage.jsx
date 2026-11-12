import { useState } from 'react';
import { Reveal, RevealGroup, RevealItem } from '../components/motion';
import { Head, PageHero } from '../components/ui';
import SEO from '../components/common/SEO';
import './ApplicationPage.css';

const gains = [
  { title: 'Flight hardware', body: 'Work on a CanSat and a 1 km rocket — real parts, real tests, real launches.' },
  { title: 'National competition', body: 'Compete at the IN-SPACe 2026 National Finals in CAN-7USAT and Model Rocketry India.' },
  { title: 'Mentorship', body: 'Learn directly from senior engineers on the team who have already cleared design reviews.' },
  { title: 'Every discipline', body: 'Aerospace, ECE, CSE, mechanical and more — on the same subsystem, in the same room.' },
];

const steps = [
  { title: 'Review', body: 'Applications are reviewed within 5–7 business days.' },
  { title: 'Interview', body: 'Shortlisted candidates meet the team leads.' },
  { title: 'Offer', body: 'Selected candidates receive an offer to join GARI.' },
  { title: 'Onboarding', body: 'Team orientation, then straight onto a subsystem.' },
];

const Field = ({ id, label, error, hint, children }) => (
  <div className="field">
    <label htmlFor={id}>{label}</label>
    {children}
    {hint && !error && <span className="t-small field-hint">{hint}</span>}
    {error && <span className="field-error">{error}</span>}
  </div>
);


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

  const cls = (name) => (errors[name] ? 'error' : undefined);

  return (
    <>
      <SEO
        title="Apply to Join GARI — GITAM Aerospace Rocketry Initiative | Student Recruitment 2026"
        description="Apply to join GARI — GITAM University's student aerospace and rocketry team. Work on real CanSat and rocket hardware, compete in IN-SPACe CAN-7USAT 2026, and gain hands-on aerospace engineering experience. Open to all GITAM University students."
        path="/apply"
        keywords="join GARI, GARI recruitment, GITAM aerospace team, student rocketry, aerospace opportunities, GARI application 2026, apply GARI GITAM, join aerospace club GITAM, GARI open recruitment, aerospace internship GITAM, GITAM student aerospace club join, GARI student membership, how to join GARI, GARI application form, aerospace team GITAM Hyderabad recruitment"
        datePublished="2024-01-01"
        dateModified="2026-10-20"
        breadcrumbs={[{ name: 'Apply', url: 'https://gari.live/apply' }]}
        faq={[
          { q: 'How do I join GARI?', a: 'Fill the application form at gari.live/apply. Applications are reviewed within 5-7 business days, shortlisted candidates are called for an interview, and selected members receive an offer to join.' },
          { q: 'Who can apply to GARI?', a: 'Any student enrolled at GITAM University Hyderabad can apply to GARI, regardless of branch. GARI welcomes Aerospace, ECE, CSE, Mechanical, and Electrical Engineering students.' },
          { q: 'What do GARI members work on?', a: 'GARI members work on real aerospace hardware: CanSat satellites, sounding rockets, ground station software, avionics systems, structural design, propulsion, and recovery mechanisms.' },
          { q: 'Is GARI open to first-year students?', a: 'Yes. GARI is open to students from all years including first year. Enthusiasm and commitment matter more than prior experience.' },
          { q: 'What skills do I need to join GARI?', a: 'GARI welcomes students with skills in CAD, programming (Python/C++/MATLAB), electronics, mechanical design, software development, or even documentation and media. All skill levels are considered.' },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          '@id': 'https://gari.live/apply#webpage',
          'url': 'https://gari.live/apply',
          'name': 'Apply to Join GARI — GITAM Aerospace Rocketry Initiative',
          'description': 'Application page to join GARI — GITAM University student aerospace and rocketry team.',
          'isPartOf': { '@id': 'https://gari.live/#website' },
          'about': { '@id': 'https://gari.live/#organization' },
          'potentialAction': {
            '@type': 'ApplyAction',
            'target': 'https://gari.live/apply',
            'name': 'Apply to Join GARI',
            'object': { '@id': 'https://gari.live/#organization' },
          },
        }}
      />
      <div className="apply">
        <PageHero
          eyebrow="Recruiting · Open to all GITAM branches"
          lines={['Build flight hardware,', 'not slides.']}
          lead="Join the team designing, building and flying GARI's rocket and CanSat. First-years welcome — commitment matters more than experience."
        >
          <a href="#apply-form" className="btn btn--primary">Start your application</a>
        </PageHero>

        <section className="section theme-light">
          <div className="container">
            <Head eyebrow="Why join" title="What you'll get." />
            <RevealGroup className="grid-list grid-list--4">
              {gains.map((g, i) => (
                <RevealItem key={g.title}>
                  <span className="row-index">0{i + 1}</span>
                  <h3>{g.title}</h3>
                  <p>{g.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <section id="apply-form" className="section theme-paper">
          <div className="container apply-grid">
            <Reveal className="apply-side">
              <span className="eyebrow">Application</span>
              <h2 className="t-h1">Tell us what you want to build.</h2>
              <p className="t-body">Fields marked * are required. It takes about ten minutes.</p>
              <ol className="apply-steps">
                {steps.map((s, i) => (
                  <li key={s.title}>
                    <span className="t-mono">0{i + 1}</span>
                    <div>
                      <strong>{s.title}</strong>
                      <p className="t-small">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal className="apply-card theme-light">
              {submitStatus === 'success' ? (
                <div className="apply-success" role="status">
                  <span className="apply-success-icon" aria-hidden="true">✓</span>
                  <h3 className="t-h2">Application submitted.</h3>
                  <p className="t-body">
                    We've received your application and will review it within 5–7 business days.
                    A confirmation has been sent to your email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="apply-form" noValidate>
                  {errors.general && <div className="notice notice--err">{errors.general}</div>}
                  {submitStatus === 'error' && !errors.general && (
                    <div className="notice notice--err">
                      Failed to submit application. Please try again or email contact@gari.live
                    </div>
                  )}

                  <fieldset>
                    <legend>About you</legend>
                    <Field id="fullName" label="Full name *" error={errors.fullName}>
                      <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className={cls('fullName')} placeholder="Your full name" autoComplete="name" required />
                    </Field>
                    <div className="form-row">
                      <Field id="email" label="Email *" error={errors.email}>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={cls('email')} placeholder="your.email@gitam.in" autoComplete="email" required />
                      </Field>
                      <Field id="phone" label="Phone *" error={errors.phone}>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={cls('phone')} placeholder="+91 XXXXX XXXXX" autoComplete="tel" required />
                      </Field>
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend>Academics</legend>
                    <div className="form-row">
                      <Field id="studentId" label="Student ID *" error={errors.studentId}>
                        <input type="text" id="studentId" name="studentId" value={formData.studentId} onChange={handleChange} className={cls('studentId')} placeholder="GITAM student ID" required />
                      </Field>
                      <Field id="year" label="Current year *" error={errors.year}>
                        <select id="year" name="year" value={formData.year} onChange={handleChange} className={cls('year')} required>
                          <option value="">Select year</option>
                          <option value="1">1st Year</option>
                          <option value="2">2nd Year</option>
                          <option value="3">3rd Year</option>
                          <option value="4">4th Year</option>
                        </select>
                      </Field>
                    </div>
                    <Field id="branch" label="Branch / department *" error={errors.branch}>
                      <select id="branch" name="branch" value={formData.branch} onChange={handleChange} className={cls('branch')} required>
                        <option value="">Select branch</option>
                        <option value="aerospace">Aerospace Engineering</option>
                        <option value="mechanical">Mechanical Engineering</option>
                        <option value="electrical">Electrical Engineering</option>
                        <option value="electronics">Electronics & Communication</option>
                        <option value="computer-science">Computer Science</option>
                        <option value="other">Other</option>
                      </select>
                    </Field>
                  </fieldset>

                  <fieldset>
                    <legend>Domain & skills</legend>
                    <Field id="domain" label="Preferred domain *" error={errors.domain}>
                      <select id="domain" name="domain" value={formData.domain} onChange={handleChange} className={cls('domain')} required>
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
                    </Field>
                    <Field id="skills" label="Technical skills *" error={errors.skills} hint="Software, tools and technologies you're comfortable with.">
                      <textarea id="skills" name="skills" rows="4" value={formData.skills} onChange={handleChange} className={cls('skills')} placeholder="e.g. SolidWorks, Python, C++, Arduino, PCB design" required />
                    </Field>
                    <Field id="experience" label="Previous experience" hint="Optional — academic projects, internships or personal builds.">
                      <textarea id="experience" name="experience" rows="4" value={formData.experience} onChange={handleChange} placeholder="Aerospace, robotics or engineering projects you've worked on" />
                    </Field>
                  </fieldset>

                  <fieldset>
                    <legend>Motivation</legend>
                    <Field id="motivation" label="Why GARI? *" error={errors.motivation} hint="At least 50 characters.">
                      <textarea id="motivation" name="motivation" rows="5" value={formData.motivation} onChange={handleChange} className={cls('motivation')} placeholder="What you want to learn and how you'll contribute" required />
                    </Field>
                    <Field id="availability" label="Time commitment *" error={errors.availability}>
                      <select id="availability" name="availability" value={formData.availability} onChange={handleChange} className={cls('availability')} required>
                        <option value="">Select availability</option>
                        <option value="5-10 hours per week">5–10 hours per week</option>
                        <option value="10-15 hours per week">10–15 hours per week</option>
                        <option value="15-20 hours per week">15–20 hours per week</option>
                        <option value="20+ hours per week">20+ hours per week</option>
                      </select>
                    </Field>
                  </fieldset>

                  <button type="submit" className="btn btn--primary apply-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting…' : 'Submit application'}
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
};

export default ApplicationPage;
