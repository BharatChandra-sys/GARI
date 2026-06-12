import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/common/SEO';
import './TeamPage.css';

const TeamPage = () => {
  // Rocket Team - Specialized Leads (from Image 1)
  const rocketTeam = [
    {
      name: 'Shaik Aadil Iftikhar',
      role: 'Team Lead & Analysis Engineer',
      branch: 'Aerospace Engineering',
      year: '3rd Year',
      description: 'Aerospace engineering undergraduate and team lead, driven by research, precision, and innovation.',
      image: '/team/shaik-aadil-iftikhar.jpg',
      linkedin: null,
    },
    {
      name: 'Saketh Muppala',
      role: 'Co-Lead & Supportive Engineer',
      branch: 'Aerospace Engineering',
      year: '3rd Year',
      description: 'Co-Lead and Technical Coordinator, contributing to project planning, technical coordination, and operational support.',
      image: '/team/saketh-muppala.jpg',
      linkedin: 'https://www.linkedin.com/in/sakethmuppala/',
    },
    {
      name: 'Nischal Aditya M',
      role: 'Communication Engineer',
      branch: 'Electronics and Communication Engineering',
      year: '3rd Year',
      description: 'Leading communication systems, payload operations, and mission coordination for the rocket team.',
      image: '/team/nischal-aditya.jpg',
      linkedin: 'https://www.linkedin.com/in/nischaladityam',
    },
    {
      name: 'Sreehitha Tadavarthy',
      role: 'Design Engineer',
      branch: 'Aerospace Engineering',
      year: '3rd Year',
      description: 'Leading rocket flight simulations, stability studies and structural performance evaluation.',
      image: '/team/sreehitha-tadavarthy.jpg',
      linkedin: 'https://www.linkedin.com/in/sreehitha-tadavarthy-9a986a270/',
    },
    {
      name: 'Thrinadh Tirumalasetti',
      role: 'Propulsion Engineer',
      branch: 'Aerospace Engineering',
      year: '3rd Year',
      description: 'Leading propulsion systems design and development for the rocket team.',
      image: '/team/thrinadh-tirumalasetti.jpg',
      linkedin: 'https://www.linkedin.com/in/thrinadh1876',
    },
    {
      name: 'Achanta Sri Karthikeya',
      role: 'Electronics Engineer',
      branch: 'Electrical and Electronics Engineering',
      year: '1st Year',
      description: 'Leading electronics and avionics systems for the rocket team.',
      image: '/team/achanta-sri-karthikeya.jpg',
      linkedin: null,
    },
    {
      name: 'Mokshagna Mopidevi',
      role: 'Computer Engineer',
      branch: 'Aerospace Engineering',
      year: '3rd Year',
      description: 'Leading aerodynamics analysis and computational modeling for the rocket team.',
      image: '/team/mokshagna-mopidevi.jpg',
      linkedin: 'https://www.linkedin.com/in/mokshagna-mopidevi-49148b303/',
    },
    {
      name: 'Shreemann Narayana Karnakoti',
      role: 'Structural Engineer',
      branch: 'Aerospace Engineering',
      year: '2nd Year',
      description: 'Leading structural design and analysis for the rocket team.',
      image: '/team/shreemann-narayana.jpg',
      linkedin: 'https://www.linkedin.com/in/shreemann-narayana',
    },
  ];

  // CanSat Team - Specialized Leads (from Image 2)
  const cansatTeam = [
    {
      name: 'Harsha Vardan',
      role: 'Team Lead & Electronics Engineer',
      branch: 'Electronics and Communication Engineering',
      year: '2nd Year',
      description: 'Team Leader leading electronics and communication systems for the CanSat team.',
      image: null,
      linkedin: null,
    },
    {
      name: 'Tanmaay Sharma',
      role: 'Co-Lead & Structures/Mechanical',
      branch: 'Aerospace Engineering',
      year: '3rd Year',
      description: 'Co-Lead focusing on structures and mechanical systems for the CanSat project.',
      image: '/team/tanmaay-sharma.jpg',
      linkedin: null,
    },
    {
      name: 'Bodapati Bharat Chandra',
      role: 'Ground Station & Software',
      branch: 'Computer Science and Engineering',
      year: '3rd Year',
      description: 'Leading ground station software and mission control systems development.',
      image: '/team/bodapati-bharat-chandra.jpg',
      linkedin: null,
    },
    {
      name: 'Singam Sai Harshith',
      role: 'Avionics & Flight Software',
      branch: 'Aerospace Engineering',
      year: '3rd Year',
      description: 'Leading avionics and flight software development for the CanSat mission.',
      image: '/team/singam-sai-harshith.jpg',
      linkedin: null,
    },
    {
      name: 'Varshith Pappuri',
      role: 'Communication & RF Systems',
      branch: 'Electronics and Communication Engineering',
      year: '1st Year',
      description: 'Leading communication and RF systems for the CanSat project.',
      image: '/team/varshith-pappuri.jpg',
      linkedin: null,
    },
    {
      name: 'Rohan Jason Bellapu',
      role: 'Sensor & Payload Systems',
      branch: 'Aerospace Engineering',
      year: '3rd Year',
      description: 'Leading sensor and payload systems design and integration.',
      image: '/team/rohan-jason-bellapu.jpg',
      linkedin: null,
    },
    {
      name: 'Satya Rishi Chodesetty',
      role: 'Power & Electrical Systems',
      branch: 'Aerospace Engineering',
      year: '2nd Year',
      description: 'Leading power systems and electrical integration for the CanSat project.',
      image: '/team/satya-rishi-chodesetty.jpg',
      linkedin: 'https://www.linkedin.com/in/satya-rishi-chodesetty/',
    },
    {
      name: 'Hanzel Vergis Thomas',
      role: 'Descent & Recovery Systems',
      branch: 'Aerospace Engineering',
      year: '3rd Year',
      description: 'Leading descent and recovery systems design for safe CanSat landing.',
      image: '/team/hanzel-vergis-thomas.jpg',
      linkedin: null,
    },
  ];

  // Core Team Members (everyone else from spreadsheet)
  const coreTeamMembers = [
    {
      name: 'Krishna Nishita',
      role: 'Core Team Member',
      branch: 'Aerospace Engineering',
      year: '1st Year',
      description: 'Enthusiastic volunteer passionate about space, technology, and gaining new experiences.',
      image: '/team/krishna-nishita.jpg',
      linkedin: null,
    },
    {
      name: 'Shaik Farhat Raheem',
      role: 'Core Team Member',
      branch: 'Aerospace Engineering',
      year: '1st Year',
      description: 'Aerospace engineering student passionate about aviation, robotics, and innovative technology.',
      image: '/team/shaik-farhat-raheem.jpg',
      linkedin: null,
    },
    {
      name: 'Krrish Mathur',
      role: 'Core Team Member',
      branch: 'Aerospace Engineering',
      year: '1st Year',
      description: 'Focused on mission-critical flight parameters, orbital mechanics and structural validation.',
      image: '/team/krrish-mathur.jpg',
      linkedin: 'https://www.linkedin.com/in/krrish-mathur-286794392',
    },
    {
      name: 'E Krishna Chaitanya',
      role: 'Core Team Member',
      branch: 'Mechanical Engineering',
      year: '3rd Year',
      description: 'Contributing to structural design, payload systems, and ground operations.',
      image: '',
      linkedin: null,
    },
    {
      name: 'Prajwal KM',
      role: 'Core Team Member',
      branch: 'Aerospace Engineering',
      year: '4th Year',
      description: 'Working with teams on creative and technical projects.',
      image: '/team/prajwal-km.jpg',
      linkedin: null,
    },
    {
      name: 'Harshith Venkata Naga Pavana Jangala',
      role: 'Core Team Member',
      branch: 'Aerospace Engineering',
      year: '3rd Year',
      description: 'Supporting across multiple areas including propulsion, structural design, and avionics.',
      image: '/team/harshith-venkata.jpg',
      linkedin: 'https://www.linkedin.com/in/harshith-venkata-naga-pavana-jangala-203852306',
    },
    {
      name: 'Naga Manikanta Uppala',
      role: 'Core Team Member',
      branch: 'Aerospace Engineering',
      year: '3rd Year',
      description: 'Interested in analysis and aerospace systems.',
      image: '/team/naga-manikanta-uppala.jpg',
      linkedin: 'https://www.linkedin.com/in/naga-manikanta-uppala-003877302',
    },
    {
      name: 'Gill Mandeep Kaur',
      role: 'Core Team Member',
      branch: 'Aerospace Engineering',
      year: '1st Year',
      description: 'Supporting the team with enthusiasm and dedication.',
      image: '/team/gill-mandeep-kaur.jpg',
      linkedin: null,
    },
    {
      name: 'Vutukuru Sai Pranav',
      role: 'Core Team Member',
      branch: 'Electronics and Communication Engineering',
      year: '4th Year',
      description: 'Supporting avionics, software development, and systems engineering.',
      image: '/team/vutukuru-sai-pranav.jpg',
      linkedin: null,
    },
    {
      name: 'Pulidindi Abhinav',
      role: 'Core Team Member',
      branch: 'Computer Science and Engineering',
      year: '4th Year',
      description: 'Contributing to avionics and software development.',
      image: '/team/pulidindi-abhinav.jpg',
      linkedin: 'https://github.com/ABhinav1234569979',
    },
    {
      name: 'Toka Priyanka',
      role: 'Core Team Member',
      branch: 'Computer Science and Engineering',
      year: '3rd Year',
      description: 'Supporting data analysis and modeling.',
      image: '/team/toka-priyanka.jpg',
      linkedin: null,
    },
    {
      name: 'Bhimineni Yoga Nandini',
      role: 'Core Team Member',
      branch: 'Computer Science and Engineering',
      year: '3rd Year',
      description: 'Computer Science student passionate about web development and full-stack development.',
      image: '/team/bhimineni-yoga-nandini.jpg',
      linkedin: null,
    },
  ];

  const [activeCard, setActiveCard] = React.useState(null);

  const renderTeamMember = (member, index, teamPrefix = '') => {
    const memberKey = `${teamPrefix}-${index}`;
    
    return (
      <motion.div
        key={memberKey}
        className={`team-card ${activeCard === memberKey ? 'active' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: index * 0.02, duration: 0.3 }}
        onClick={() => setActiveCard(activeCard === memberKey ? null : memberKey)}
      >
        <div className="team-image-container">
          <div className="team-image">
            {member.image ? (
              <img 
                src={member.image} 
                alt={member.name}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<div class="image-placeholder"><span>${member.name.split(' ').map(n => n[0]).join('')}</span></div>`;
                }}
              />
            ) : (
              <div className="image-placeholder">
                <span>{member.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
            )}
          </div>
          <div className="team-overlay">
            <p className="overlay-description">{member.description}</p>
            {member.linkedin && (
              <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="overlay-linkedin"
                onClick={(e) => e.stopPropagation()}
              >
                LinkedIn →
              </a>
            )}
          </div>
        </div>
        <div className="team-info">
          <h3>{member.name}</h3>
          <p className="team-role">{member.role}</p>
          <p className="team-branch">{member.branch} • {member.year}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="team-page">
      <SEO
        title="Our Team"
        description="Meet the GARI team — students from GITAM University building rockets, competing in CanSat, and pioneering aerospace engineering in India."
        path="/team"
      />
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Our Team</h1>
            <p className="hero-subtitle">
              30+ Students Building Aerospace Innovation Together
            </p>
          </motion.div>
        </div>
      </section>

      <section className="content-section">
        <div className="container">
          <div className="about-text">
            <p>
              GARI is powered by a multidisciplinary team of 30+ passionate students
              working across two major projects: Rocket Development and CanSat missions.
              Our team brings together expertise in aerospace engineering, avionics, 
              software systems, and mission-oriented engineering.
            </p>
          </div>

          {/* CanSat Team Section */}
          <div className="team-section">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="team-division-title">CanSat Team</h2>
              <p className="team-division-subtitle">
                Building satellite systems in a can for space missions
              </p>
            </motion.div>

            <div className="team-grid">
              {cansatTeam.map((member, index) => renderTeamMember(member, index, 'cansat'))}
            </div>
          </div>

          {/* Rocket Team Section */}
          <div className="team-section">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="team-division-title">Rocket Team</h2>
              <p className="team-division-subtitle">
                Developing advanced rocket systems for IN-SPACe competition
              </p>
            </motion.div>

            <div className="team-grid">
              {rocketTeam.map((member, index) => renderTeamMember(member, index, 'rocket'))}
            </div>
          </div>

          {/* Core Team Members Section */}
          <div className="team-section">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="team-division-title">Core Team Members</h2>
              <p className="team-division-subtitle">
                Supporting both projects with dedication and expertise
              </p>
            </motion.div>

            <div className="team-grid">
              {coreTeamMembers.map((member, index) => renderTeamMember(member, index, 'core'))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
