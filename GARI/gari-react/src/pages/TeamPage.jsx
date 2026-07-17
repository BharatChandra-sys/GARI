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
      portfolio: 'https://bharatchandra.me',
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
                alt={`${member.name} — ${member.role} at GARI GITAM Aerospace Rocketry Initiative`}
                loading="lazy"
                decoding="async"
                width="300"
                height="300"
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
            {member.portfolio && (
              <a
                href={member.portfolio}
                target="_blank"
                rel="me noopener noreferrer"
                className="overlay-linkedin"
                onClick={(e) => e.stopPropagation()}
              >
                Portfolio →
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
        title="Our Team — 30+ Aerospace Engineers at GARI GITAM"
        description="Meet GARI's 30+ member team at GITAM University Hyderabad — Harshith Venkata, Bodapati Bharat Chandra, and aerospace engineers building rockets and CanSat systems for IN-SPACe CAN-7USAT 2026."
        path="/team"
        keywords="GARI team members, Harshith Venkata Naga Pavana Jangala GARI, Bodapati Bharat Chandra GARI, GITAM aerospace students, Shaik Aadil Iftikhar GARI, Saketh Muppala GARI, Nischal Aditya GARI, Singam Sai Harshith GARI, Tanmaay Sharma GARI, Harsha Vardan GARI, Rohan Jason Bellapu GARI, Satya Rishi Chodesetty GARI, Hanzel Vergis Thomas GARI, Varshith Pappuri GARI, Sreehitha Tadavarthy GARI, Thrinadh Tirumalasetti GARI, Mokshagna Mopidevi GARI, Shreemann Narayana GARI, Achanta Sri Karthikeya GARI, rocket team India, CanSat team GITAM"
        breadcrumbs={[{ name: 'Team', url: 'https://gari.live/team' }]}
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': 'https://gari.live/#organization',
            'name': 'GARI — GITAM Aerospace Rocketry Initiative',
            'url': 'https://gari.live',
            'logo': 'https://gari.live/gari-logo.png',
            'parentOrganization': {
              '@type': 'CollegeOrUniversity',
              'name': 'GITAM University Hyderabad',
              'url': 'https://gitam.edu',
              'sameAs': 'https://en.wikipedia.org/wiki/GITAM_University',
            },
            'member': [
              { '@type': 'OrganizationMember', 'roleName': 'Aerospace Engineer — GARI', 'member': { '@type': 'Person', 'name': 'Harshith Venkata Naga Pavana Jangala', 'jobTitle': 'Aerospace Engineer', 'image': 'https://gari.live/team/harshith-venkata.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' }, 'url': 'https://www.linkedin.com/in/harshith-venkata-naga-pavana-jangala-203852306', 'sameAs': ['https://www.linkedin.com/in/harshith-venkata-naga-pavana-jangala-203852306'] } },
              { '@type': 'OrganizationMember', 'roleName': 'Ground Station & Software Lead', 'member': { '@type': 'Person', 'name': 'Bodapati Bharat Chandra', 'jobTitle': 'Ground Station & Software Lead', 'image': 'https://gari.live/team/bodapati-bharat-chandra.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' }, 'url': 'https://bharatchandra.me', 'sameAs': ['https://bharatchandra.me', 'https://github.com/BharatChandra-sys'] } },
              { '@type': 'OrganizationMember', 'roleName': 'CanSat Team Lead', 'member': { '@type': 'Person', 'name': 'Harsha Vardan', 'jobTitle': 'CanSat Team Lead & Electronics Engineer', 'worksFor': { '@id': 'https://gari.live/#organization' } } },
              { '@type': 'OrganizationMember', 'roleName': 'Rocket Team Lead', 'member': { '@type': 'Person', 'name': 'Shaik Aadil Iftikhar', 'jobTitle': 'Rocket Team Lead & Analysis Engineer', 'image': 'https://gari.live/team/shaik-aadil-iftikhar.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' } } },
              { '@type': 'OrganizationMember', 'roleName': 'Rocket Co-Lead', 'member': { '@type': 'Person', 'name': 'Saketh Muppala', 'jobTitle': 'Co-Lead & Supportive Engineer', 'image': 'https://gari.live/team/saketh-muppala.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' }, 'sameAs': ['https://www.linkedin.com/in/sakethmuppala/'] } },
              { '@type': 'OrganizationMember', 'roleName': 'Communication Engineer', 'member': { '@type': 'Person', 'name': 'Nischal Aditya M', 'jobTitle': 'Communication Engineer', 'image': 'https://gari.live/team/nischal-aditya.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' }, 'sameAs': ['https://www.linkedin.com/in/nischaladityam'] } },
              { '@type': 'OrganizationMember', 'roleName': 'Design Engineer', 'member': { '@type': 'Person', 'name': 'Sreehitha Tadavarthy', 'jobTitle': 'Design Engineer', 'image': 'https://gari.live/team/sreehitha-tadavarthy.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' }, 'sameAs': ['https://www.linkedin.com/in/sreehitha-tadavarthy-9a986a270/'] } },
              { '@type': 'OrganizationMember', 'roleName': 'Propulsion Engineer', 'member': { '@type': 'Person', 'name': 'Thrinadh Tirumalasetti', 'jobTitle': 'Propulsion Engineer', 'image': 'https://gari.live/team/thrinadh-tirumalasetti.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' }, 'sameAs': ['https://www.linkedin.com/in/thrinadh1876'] } },
              { '@type': 'OrganizationMember', 'roleName': 'Electronics Engineer', 'member': { '@type': 'Person', 'name': 'Achanta Sri Karthikeya', 'jobTitle': 'Electronics Engineer', 'image': 'https://gari.live/team/achanta-sri-karthikeya.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' } } },
              { '@type': 'OrganizationMember', 'roleName': 'Computer Engineer', 'member': { '@type': 'Person', 'name': 'Mokshagna Mopidevi', 'jobTitle': 'Computer Engineer', 'image': 'https://gari.live/team/mokshagna-mopidevi.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' }, 'sameAs': ['https://www.linkedin.com/in/mokshagna-mopidevi-49148b303/'] } },
              { '@type': 'OrganizationMember', 'roleName': 'Structural Engineer', 'member': { '@type': 'Person', 'name': 'Shreemann Narayana Karnakoti', 'jobTitle': 'Structural Engineer', 'image': 'https://gari.live/team/shreemann-narayana.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' }, 'sameAs': ['https://www.linkedin.com/in/shreemann-narayana'] } },
              { '@type': 'OrganizationMember', 'roleName': 'CanSat Co-Lead & Structures', 'member': { '@type': 'Person', 'name': 'Tanmaay Sharma', 'jobTitle': 'Co-Lead & Structures/Mechanical', 'image': 'https://gari.live/team/tanmaay-sharma.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' } } },
              { '@type': 'OrganizationMember', 'roleName': 'Avionics & Flight Software', 'member': { '@type': 'Person', 'name': 'Singam Sai Harshith', 'jobTitle': 'Avionics & Flight Software Lead', 'image': 'https://gari.live/team/singam-sai-harshith.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' } } },
              { '@type': 'OrganizationMember', 'roleName': 'Communication & RF Systems', 'member': { '@type': 'Person', 'name': 'Varshith Pappuri', 'jobTitle': 'Communication & RF Systems Lead', 'image': 'https://gari.live/team/varshith-pappuri.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' } } },
              { '@type': 'OrganizationMember', 'roleName': 'Sensor & Payload Systems', 'member': { '@type': 'Person', 'name': 'Rohan Jason Bellapu', 'jobTitle': 'Sensor & Payload Systems Lead', 'image': 'https://gari.live/team/rohan-jason-bellapu.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' } } },
              { '@type': 'OrganizationMember', 'roleName': 'Power & Electrical Systems', 'member': { '@type': 'Person', 'name': 'Satya Rishi Chodesetty', 'jobTitle': 'Power & Electrical Systems Lead', 'image': 'https://gari.live/team/satya-rishi-chodesetty.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' }, 'sameAs': ['https://www.linkedin.com/in/satya-rishi-chodesetty/'] } },
              { '@type': 'OrganizationMember', 'roleName': 'Descent & Recovery Systems', 'member': { '@type': 'Person', 'name': 'Hanzel Vergis Thomas', 'jobTitle': 'Descent & Recovery Systems Lead', 'image': 'https://gari.live/team/hanzel-vergis-thomas.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' } } },
              { '@type': 'OrganizationMember', 'roleName': 'Core Team Member', 'member': { '@type': 'Person', 'name': 'Krishna Nishita', 'jobTitle': 'Core Team Member', 'image': 'https://gari.live/team/krishna-nishita.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' } } },
              { '@type': 'OrganizationMember', 'roleName': 'Core Team Member', 'member': { '@type': 'Person', 'name': 'Shaik Farhat Raheem', 'jobTitle': 'Core Team Member', 'image': 'https://gari.live/team/shaik-farhat-raheem.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' } } },
              { '@type': 'OrganizationMember', 'roleName': 'Core Team Member', 'member': { '@type': 'Person', 'name': 'Krrish Mathur', 'jobTitle': 'Core Team Member', 'image': 'https://gari.live/team/krrish-mathur.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' }, 'sameAs': ['https://www.linkedin.com/in/krrish-mathur-286794392'] } },
              { '@type': 'OrganizationMember', 'roleName': 'Core Team Member', 'member': { '@type': 'Person', 'name': 'Prajwal KM', 'jobTitle': 'Core Team Member', 'image': 'https://gari.live/team/prajwal-km.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' } } },
              { '@type': 'OrganizationMember', 'roleName': 'Core Team Member', 'member': { '@type': 'Person', 'name': 'Naga Manikanta Uppala', 'jobTitle': 'Core Team Member', 'image': 'https://gari.live/team/naga-manikanta-uppala.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' }, 'sameAs': ['https://www.linkedin.com/in/naga-manikanta-uppala-003877302'] } },
              { '@type': 'OrganizationMember', 'roleName': 'Core Team Member', 'member': { '@type': 'Person', 'name': 'Gill Mandeep Kaur', 'jobTitle': 'Core Team Member', 'image': 'https://gari.live/team/gill-mandeep-kaur.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' } } },
              { '@type': 'OrganizationMember', 'roleName': 'Core Team Member', 'member': { '@type': 'Person', 'name': 'Vutukuru Sai Pranav', 'jobTitle': 'Core Team Member', 'image': 'https://gari.live/team/vutukuru-sai-pranav.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' } } },
              { '@type': 'OrganizationMember', 'roleName': 'Core Team Member', 'member': { '@type': 'Person', 'name': 'Pulidindi Abhinav', 'jobTitle': 'Core Team Member', 'image': 'https://gari.live/team/pulidindi-abhinav.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' } } },
              { '@type': 'OrganizationMember', 'roleName': 'Core Team Member', 'member': { '@type': 'Person', 'name': 'Toka Priyanka', 'jobTitle': 'Core Team Member', 'image': 'https://gari.live/team/toka-priyanka.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' } } },
              { '@type': 'OrganizationMember', 'roleName': 'Core Team Member', 'member': { '@type': 'Person', 'name': 'Bhimineni Yoga Nandini', 'jobTitle': 'Core Team Member', 'image': 'https://gari.live/team/bhimineni-yoga-nandini.jpg', 'worksFor': { '@id': 'https://gari.live/#organization' } } },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            'name': 'GARI Team Members — GITAM Aerospace Rocketry Initiative',
            'description': 'All 30+ members of GARI, the student aerospace and rocketry team at GITAM University Hyderabad competing in IN-SPACe CAN-7USAT 2026.',
            'url': 'https://gari.live/team',
            'numberOfItems': 28,
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'item': { '@type': 'Person', 'name': 'Harshith Venkata Naga Pavana Jangala', 'jobTitle': 'Aerospace Engineer — GARI', 'image': 'https://gari.live/team/harshith-venkata.jpg', 'url': 'https://gari.live/team', 'worksFor': { '@type': 'Organization', 'name': 'GARI GITAM Aerospace Rocketry Initiative', 'url': 'https://gari.live' } } },
              { '@type': 'ListItem', 'position': 2, 'item': { '@type': 'Person', 'name': 'Bodapati Bharat Chandra', 'jobTitle': 'Ground Station & Software Lead — GARI', 'image': 'https://gari.live/team/bodapati-bharat-chandra.jpg', 'url': 'https://gari.live/team', 'sameAs': ['https://bharatchandra.me'], 'worksFor': { '@type': 'Organization', 'name': 'GARI GITAM Aerospace Rocketry Initiative', 'url': 'https://gari.live' } } },
              { '@type': 'ListItem', 'position': 3, 'item': { '@type': 'Person', 'name': 'Harsha Vardan', 'jobTitle': 'CanSat Team Lead — GARI', 'url': 'https://gari.live/team', 'worksFor': { '@type': 'Organization', 'name': 'GARI', 'url': 'https://gari.live' } } },
              { '@type': 'ListItem', 'position': 4, 'item': { '@type': 'Person', 'name': 'Shaik Aadil Iftikhar', 'jobTitle': 'Rocket Team Lead — GARI', 'image': 'https://gari.live/team/shaik-aadil-iftikhar.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 5, 'item': { '@type': 'Person', 'name': 'Saketh Muppala', 'jobTitle': 'Rocket Co-Lead — GARI', 'image': 'https://gari.live/team/saketh-muppala.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 6, 'item': { '@type': 'Person', 'name': 'Nischal Aditya M', 'jobTitle': 'Communication Engineer — GARI', 'image': 'https://gari.live/team/nischal-aditya.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 7, 'item': { '@type': 'Person', 'name': 'Sreehitha Tadavarthy', 'jobTitle': 'Design Engineer — GARI', 'image': 'https://gari.live/team/sreehitha-tadavarthy.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 8, 'item': { '@type': 'Person', 'name': 'Thrinadh Tirumalasetti', 'jobTitle': 'Propulsion Engineer — GARI', 'image': 'https://gari.live/team/thrinadh-tirumalasetti.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 9, 'item': { '@type': 'Person', 'name': 'Achanta Sri Karthikeya', 'jobTitle': 'Electronics Engineer — GARI', 'image': 'https://gari.live/team/achanta-sri-karthikeya.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 10, 'item': { '@type': 'Person', 'name': 'Mokshagna Mopidevi', 'jobTitle': 'Computer Engineer — GARI', 'image': 'https://gari.live/team/mokshagna-mopidevi.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 11, 'item': { '@type': 'Person', 'name': 'Shreemann Narayana Karnakoti', 'jobTitle': 'Structural Engineer — GARI', 'image': 'https://gari.live/team/shreemann-narayana.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 12, 'item': { '@type': 'Person', 'name': 'Tanmaay Sharma', 'jobTitle': 'CanSat Co-Lead & Structures — GARI', 'image': 'https://gari.live/team/tanmaay-sharma.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 13, 'item': { '@type': 'Person', 'name': 'Singam Sai Harshith', 'jobTitle': 'Avionics & Flight Software Lead — GARI', 'image': 'https://gari.live/team/singam-sai-harshith.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 14, 'item': { '@type': 'Person', 'name': 'Varshith Pappuri', 'jobTitle': 'Communication & RF Systems — GARI', 'image': 'https://gari.live/team/varshith-pappuri.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 15, 'item': { '@type': 'Person', 'name': 'Rohan Jason Bellapu', 'jobTitle': 'Sensor & Payload Systems Lead — GARI', 'image': 'https://gari.live/team/rohan-jason-bellapu.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 16, 'item': { '@type': 'Person', 'name': 'Satya Rishi Chodesetty', 'jobTitle': 'Power & Electrical Systems — GARI', 'image': 'https://gari.live/team/satya-rishi-chodesetty.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 17, 'item': { '@type': 'Person', 'name': 'Hanzel Vergis Thomas', 'jobTitle': 'Descent & Recovery Systems — GARI', 'image': 'https://gari.live/team/hanzel-vergis-thomas.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 18, 'item': { '@type': 'Person', 'name': 'Krishna Nishita', 'jobTitle': 'Core Team — GARI', 'image': 'https://gari.live/team/krishna-nishita.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 19, 'item': { '@type': 'Person', 'name': 'Shaik Farhat Raheem', 'jobTitle': 'Core Team — GARI', 'image': 'https://gari.live/team/shaik-farhat-raheem.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 20, 'item': { '@type': 'Person', 'name': 'Krrish Mathur', 'jobTitle': 'Core Team — GARI', 'image': 'https://gari.live/team/krrish-mathur.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 21, 'item': { '@type': 'Person', 'name': 'Prajwal KM', 'jobTitle': 'Core Team — GARI', 'image': 'https://gari.live/team/prajwal-km.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 22, 'item': { '@type': 'Person', 'name': 'Naga Manikanta Uppala', 'jobTitle': 'Core Team — GARI', 'image': 'https://gari.live/team/naga-manikanta-uppala.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 23, 'item': { '@type': 'Person', 'name': 'Gill Mandeep Kaur', 'jobTitle': 'Core Team — GARI', 'image': 'https://gari.live/team/gill-mandeep-kaur.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 24, 'item': { '@type': 'Person', 'name': 'Vutukuru Sai Pranav', 'jobTitle': 'Core Team — GARI', 'image': 'https://gari.live/team/vutukuru-sai-pranav.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 25, 'item': { '@type': 'Person', 'name': 'Pulidindi Abhinav', 'jobTitle': 'Core Team — GARI', 'image': 'https://gari.live/team/pulidindi-abhinav.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 26, 'item': { '@type': 'Person', 'name': 'Toka Priyanka', 'jobTitle': 'Core Team — GARI', 'image': 'https://gari.live/team/toka-priyanka.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 27, 'item': { '@type': 'Person', 'name': 'Bhimineni Yoga Nandini', 'jobTitle': 'Core Team — GARI', 'image': 'https://gari.live/team/bhimineni-yoga-nandini.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 28, 'item': { '@type': 'Person', 'name': 'E Krishna Chaitanya', 'jobTitle': 'Core Team — GARI', 'url': 'https://gari.live/team' } },
            ],
          },
        ]}
      />
      {/* Raw script tag for dangerouslySetInnerHTML removed — schema passed via SEO component */}
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
