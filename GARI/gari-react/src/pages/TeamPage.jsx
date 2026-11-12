import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal, RevealGroup, RevealItem, ease } from '../components/motion';
import { ClosingCTA, Head, PageHero } from '../components/ui';
import { cansatTeam, coreTeamMembers, rocketTeam } from '../data/team';
import SEO from '../components/common/SEO';
import './TeamPage.css';

const tag = (list, team) => list.map((m) => ({ ...m, team }));
const everyone = [...tag(rocketTeam, 'Rocket'), ...tag(cansatTeam, 'CanSat'), ...tag(coreTeamMembers, 'Core')];
const leads = [rocketTeam[0], rocketTeam[1], cansatTeam[0], cansatTeam[1]].map((m, i) => ({
  ...m,
  team: i < 2 ? 'Rocket' : 'CanSat',
}));

const filters = [
  { key: 'All', label: 'Everyone' },
  { key: 'Rocket', label: 'Rocket' },
  { key: 'CanSat', label: 'CanSat' },
  { key: 'Core', label: 'Core' },
];

const initials = (name) => name.split(' ').filter(Boolean).slice(0, 2).map((n) => n[0]).join('');

const Portrait = ({ member, className = '' }) => {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`portrait ${className}`}>
      {member.image && !failed ? (
        <img
          src={member.image}
          alt={`${member.name} — ${member.role}, GARI`}
          loading="lazy"
          decoding="async"
          width="300"
          height="375"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="portrait-initials" aria-hidden="true">{initials(member.name)}</span>
      )}
    </div>
  );
};

const MemberSheet = ({ member, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="sheet-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="sheet theme-light"
        role="dialog"
        aria-modal="true"
        aria-label={member.name}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.45, ease: ease.out }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="sheet-close" onClick={onClose} aria-label="Close">×</button>
        <Portrait member={member} className="sheet-portrait" />
        <div className="sheet-body">
          <span className="eyebrow eyebrow--accent">{member.team} team</span>
          <h2 className="t-h2">{member.name}</h2>
          <p className="sheet-role">{member.role}</p>
          <p className="t-small">{member.branch} · {member.year}</p>
          <p className="t-body sheet-desc">{member.description}</p>
          <div className="actions">
            {member.linkedin && (
              <a className="link" href={member.linkedin} target="_blank" rel="noopener noreferrer">
                {member.linkedin.includes('github') ? 'GitHub' : 'LinkedIn'}
              </a>
            )}
            {member.portfolio && (
              <a className="link" href={member.portfolio} target="_blank" rel="me noopener noreferrer">Portfolio</a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TeamPage = () => {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(null);
  const shown = useMemo(() => (filter === 'All' ? everyone : everyone.filter((m) => m.team === filter)), [filter]);

  return (
    <div className="team">
      <SEO
        title="Our Team — 30+ Aerospace Engineers at GARI GITAM | Meet the Team"
        description="Meet GARI's 30+ member team at GITAM University Hyderabad — Rocket Team led by Shaik Aadil Iftikhar, CanSat Team led by Harsha Vardan, with specialists including Harshith Venkata Naga Pavana Jangala (Aerospace), Bodapati Bharat Chandra (Ground Station & Software), Singam Sai Harshith (Avionics) and more. Competing in two IN-SPACe 2026 national competitions."
        path="/team"
        keywords="GARI team, Harshith Venkata Naga Pavana Jangala GARI, Bodapati Bharat Chandra GARI software, Harshith GITAM aerospace engineer, Bharat Chandra ground station GARI, GARI GITAM team members, Shaik Aadil Iftikhar GARI, Saketh Muppala GARI, Nischal Aditya GARI, Singam Sai Harshith GARI, Tanmaay Sharma GARI, Harsha Vardan GARI, Rohan Jason Bellapu GARI, Satya Rishi Chodesetty GARI, Hanzel Vergis Thomas GARI, Varshith Pappuri GARI, Sreehitha Tadavarthy GARI, Thrinadh Tirumalasetti GARI, Mokshagna Mopidevi GARI, Shreemann Narayana GARI, Achanta Sri Karthikeya GARI, rocket team India, CanSat team GITAM, GITAM aerospace team members, GARI 30 engineers, aerospace team GITAM Hyderabad"
        datePublished="2024-01-01"
        dateModified="2026-10-20"
        breadcrumbs={[{ name: 'Team', url: 'https://gari.live/team' }]}
        faq={[
          { q: 'Who is on the GARI team?', a: 'GARI has 30+ members at GITAM University Hyderabad. Rocket Team is led by Shaik Aadil Iftikhar. CanSat Team is led by Harsha Vardan. Key members include Harshith Venkata Naga Pavana Jangala (Aerospace Engineer) and Bodapati Bharat Chandra (Ground Station & Software Lead, portfolio: bharatchandra.me).' },
          { q: 'Who is Harshith Venkata Naga Pavana Jangala?', a: 'Harshith Venkata Naga Pavana Jangala is an Aerospace Engineer and core member at GARI — GITAM Aerospace Rocketry Initiative, GITAM University Hyderabad. He supports propulsion, structural design, and avionics for the team\'s rocket and CanSat programs.' },
          { q: 'Who is Bodapati Bharat Chandra?', a: 'Bodapati Bharat Chandra is the Ground Station & Software Lead at GARI (GITAM Aerospace Rocketry Initiative), GITAM University Hyderabad. He built the custom ground control system for real-time telemetry. Portfolio: bharatchandra.me.' },
          { q: 'Who leads the GARI Rocket Team?', a: 'The GARI Rocket Team is led by Shaik Aadil Iftikhar (Team Lead & Analysis Engineer) and Saketh Muppala (Co-Lead & Supportive Engineer).' },
          { q: 'Who leads the GARI CanSat Team?', a: 'The GARI CanSat Team is led by Harsha Vardan (Team Lead & Electronics Engineer) and Tanmaay Sharma (Co-Lead & Structures/Mechanical).' },
          { q: 'What branches are represented in GARI?', a: 'GARI has members from Aerospace Engineering, Electronics & Communication Engineering (ECE), Computer Science Engineering (CSE), Mechanical Engineering, and Electrical & Electronics Engineering at GITAM University Hyderabad.' },
        ]}
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': 'https://gari.live/#organization',
            'name': 'GARI — GITAM Aerospace Rocketry Initiative',
            'url': 'https://gari.live',
            'logo': 'https://gari.live/gari-logo-new.png',
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
            'description': 'All 30+ members of GARI, the student aerospace and rocketry team at GITAM University Hyderabad competing in two IN-SPACe 2026 national competitions: CanSat and Model Rocketry.',
            'url': 'https://gari.live/team',
            'numberOfItems': 28,
            'itemListElement': [
              { '@type': 'ListItem', 'position': 1, 'item': { '@type': 'Person', '@id': 'https://gari.live/#person-harshith', 'name': 'Harshith Venkata Naga Pavana Jangala', 'jobTitle': 'Aerospace Engineer — GARI', 'image': 'https://gari.live/team/harshith-venkata.jpg', 'url': 'https://gari.live/team', 'description': 'Aerospace Engineer at GARI GITAM. Supports propulsion, structural design, and avionics for the rocket and CanSat programs including IN-SPACe CAN-7USAT 2026.', 'sameAs': ['https://www.linkedin.com/in/harshith-venkata-naga-pavana-jangala-203852306'], 'worksFor': { '@type': 'Organization', 'name': 'GARI GITAM Aerospace Rocketry Initiative', 'url': 'https://gari.live' } } },
              { '@type': 'ListItem', 'position': 2, 'item': { '@type': 'Person', '@id': 'https://gari.live/#person-bharat', 'name': 'Bodapati Bharat Chandra', 'jobTitle': 'Ground Station & Software Lead — GARI', 'image': 'https://gari.live/team/bodapati-bharat-chandra.jpg', 'url': 'https://gari.live/team', 'description': 'Ground Station and Software Lead at GARI GITAM. Built the custom ground control system for real-time telemetry. Portfolio at bharatchandra.me.', 'sameAs': ['https://bharatchandra.me', 'https://github.com/BharatChandra-sys'], 'worksFor': { '@type': 'Organization', 'name': 'GARI GITAM Aerospace Rocketry Initiative', 'url': 'https://gari.live' } } },
              { '@type': 'ListItem', 'position': 3, 'item': { '@type': 'Person', 'name': 'Harshith Venkata Naga Pavana Jangala', 'jobTitle': 'Aerospace Engineer — GARI', 'image': 'https://gari.live/team/harshith-venkata.jpg', 'url': 'https://gari.live/team', 'worksFor': { '@type': 'Organization', 'name': 'GARI GITAM Aerospace Rocketry Initiative', 'url': 'https://gari.live' } } },
              { '@type': 'ListItem', 'position': 4, 'item': { '@type': 'Person', 'name': 'Harsha Vardan', 'jobTitle': 'CanSat Team Lead — GARI', 'url': 'https://gari.live/team', 'worksFor': { '@type': 'Organization', 'name': 'GARI', 'url': 'https://gari.live' } } },
              { '@type': 'ListItem', 'position': 5, 'item': { '@type': 'Person', 'name': 'Shaik Aadil Iftikhar', 'jobTitle': 'Rocket Team Lead — GARI', 'image': 'https://gari.live/team/shaik-aadil-iftikhar.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 6, 'item': { '@type': 'Person', 'name': 'Saketh Muppala', 'jobTitle': 'Rocket Co-Lead — GARI', 'image': 'https://gari.live/team/saketh-muppala.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 7, 'item': { '@type': 'Person', 'name': 'Nischal Aditya M', 'jobTitle': 'Communication Engineer — GARI', 'image': 'https://gari.live/team/nischal-aditya.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 8, 'item': { '@type': 'Person', 'name': 'Sreehitha Tadavarthy', 'jobTitle': 'Design Engineer — GARI', 'image': 'https://gari.live/team/sreehitha-tadavarthy.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 9, 'item': { '@type': 'Person', 'name': 'Thrinadh Tirumalasetti', 'jobTitle': 'Propulsion Engineer — GARI', 'image': 'https://gari.live/team/thrinadh-tirumalasetti.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 10, 'item': { '@type': 'Person', 'name': 'Achanta Sri Karthikeya', 'jobTitle': 'Electronics Engineer — GARI', 'image': 'https://gari.live/team/achanta-sri-karthikeya.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 11, 'item': { '@type': 'Person', 'name': 'Mokshagna Mopidevi', 'jobTitle': 'Computer Engineer — GARI', 'image': 'https://gari.live/team/mokshagna-mopidevi.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 12, 'item': { '@type': 'Person', 'name': 'Shreemann Narayana Karnakoti', 'jobTitle': 'Structural Engineer — GARI', 'image': 'https://gari.live/team/shreemann-narayana.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 13, 'item': { '@type': 'Person', 'name': 'Tanmaay Sharma', 'jobTitle': 'CanSat Co-Lead & Structures — GARI', 'image': 'https://gari.live/team/tanmaay-sharma.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 14, 'item': { '@type': 'Person', 'name': 'Varshith Pappuri', 'jobTitle': 'Communication & RF Systems — GARI', 'image': 'https://gari.live/team/varshith-pappuri.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 15, 'item': { '@type': 'Person', 'name': 'Rohan Jason Bellapu', 'jobTitle': 'Sensor & Payload Systems Lead — GARI', 'image': 'https://gari.live/team/rohan-jason-bellapu.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 16, 'item': { '@type': 'Person', 'name': 'Satya Rishi Chodesetty', 'jobTitle': 'Power & Electrical Systems — GARI', 'image': 'https://gari.live/team/satya-rishi-chodesetty.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 17, 'item': { '@type': 'Person', 'name': 'Hanzel Vergis Thomas', 'jobTitle': 'Descent & Recovery Systems — GARI', 'image': 'https://gari.live/team/hanzel-vergis-thomas.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 18, 'item': { '@type': 'Person', 'name': 'Harshith Venkata Naga Pavana Jangala', 'jobTitle': 'Aerospace Engineer — GARI', 'image': 'https://gari.live/team/harshith-venkata.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 19, 'item': { '@type': 'Person', 'name': 'Krishna Nishita', 'jobTitle': 'Core Team — GARI', 'image': 'https://gari.live/team/krishna-nishita.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 20, 'item': { '@type': 'Person', 'name': 'Shaik Farhat Raheem', 'jobTitle': 'Core Team — GARI', 'image': 'https://gari.live/team/shaik-farhat-raheem.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 21, 'item': { '@type': 'Person', 'name': 'Krrish Mathur', 'jobTitle': 'Core Team — GARI', 'image': 'https://gari.live/team/krrish-mathur.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 22, 'item': { '@type': 'Person', 'name': 'Prajwal KM', 'jobTitle': 'Core Team — GARI', 'image': 'https://gari.live/team/prajwal-km.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 23, 'item': { '@type': 'Person', 'name': 'Naga Manikanta Uppala', 'jobTitle': 'Core Team — GARI', 'image': 'https://gari.live/team/naga-manikanta-uppala.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 24, 'item': { '@type': 'Person', 'name': 'Gill Mandeep Kaur', 'jobTitle': 'Core Team — GARI', 'image': 'https://gari.live/team/gill-mandeep-kaur.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 25, 'item': { '@type': 'Person', 'name': 'Vutukuru Sai Pranav', 'jobTitle': 'Core Team — GARI', 'image': 'https://gari.live/team/vutukuru-sai-pranav.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 26, 'item': { '@type': 'Person', 'name': 'Pulidindi Abhinav', 'jobTitle': 'Core Team — GARI', 'image': 'https://gari.live/team/pulidindi-abhinav.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 27, 'item': { '@type': 'Person', 'name': 'Toka Priyanka', 'jobTitle': 'Core Team — GARI', 'image': 'https://gari.live/team/toka-priyanka.jpg', 'url': 'https://gari.live/team' } },
              { '@type': 'ListItem', 'position': 28, 'item': { '@type': 'Person', 'name': 'Bhimineni Yoga Nandini', 'jobTitle': 'Core Team — GARI', 'image': 'https://gari.live/team/bhimineni-yoga-nandini.jpg', 'url': 'https://gari.live/team' } },
            ],
          },
          // Dedicated Person schemas — Knowledge Graph / Entity disambiguation
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': 'https://gari.live/#person-harshith',
            'name': 'Harshith Venkata Naga Pavana Jangala',
            'alternateName': ['Harshith Venkata', 'Harshith GARI', 'Harshith Jangala', 'Harshith GITAM aerospace'],
            'jobTitle': 'Aerospace Engineer',
            'description': 'Harshith Venkata Naga Pavana Jangala is an Aerospace Engineer and core member at GARI — GITAM Aerospace Rocketry Initiative, GITAM University Hyderabad. He supports propulsion, structural design, and avionics across the rocket and CanSat programs including IN-SPACe CAN-7USAT 2026.',
            'image': 'https://gari.live/team/harshith-venkata.jpg',
            'url': 'https://gari.live/team',
            'sameAs': ['https://www.linkedin.com/in/harshith-venkata-naga-pavana-jangala-203852306'],
            'worksFor': { '@id': 'https://gari.live/#organization' },
            'affiliation': {
              '@type': 'CollegeOrUniversity',
              'name': 'GITAM University',
              'url': 'https://www.gitam.edu',
              'sameAs': 'https://en.wikipedia.org/wiki/GITAM_University',
            },
            'knowsAbout': ['Aerospace Engineering', 'Propulsion', 'Structural Design', 'Avionics', 'CanSat', 'Rocketry', 'IN-SPACe', 'GITAM'],
            'nationality': { '@type': 'Country', 'name': 'India' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': 'https://gari.live/#person-bharat',
            'name': 'Bodapati Bharat Chandra',
            'alternateName': ['Bharat Chandra', 'Bharat GARI', 'Bodapati Bharat', 'Bharat ground station GARI'],
            'jobTitle': 'Ground Station & Software Lead',
            'description': 'Bodapati Bharat Chandra is the Ground Station and Software Lead at GARI — GITAM Aerospace Rocketry Initiative, GITAM University Hyderabad. He designed and built the custom ground control system for real-time telemetry visualization and mission logging for the IN-SPACe CAN-7USAT 2026 CanSat mission. His portfolio: bharatchandra.me.',
            'image': 'https://gari.live/team/bodapati-bharat-chandra.jpg',
            'url': 'https://bharatchandra.me',
            'sameAs': ['https://bharatchandra.me', 'https://github.com/BharatChandra-sys'],
            'worksFor': { '@id': 'https://gari.live/#organization' },
            'affiliation': {
              '@type': 'CollegeOrUniversity',
              'name': 'GITAM University',
              'url': 'https://www.gitam.edu',
              'sameAs': 'https://en.wikipedia.org/wiki/GITAM_University',
            },
            'knowsAbout': ['Ground Control Systems', 'Telemetry Software', 'Mission Control', 'Software Engineering', 'Aerospace Software', 'CanSat', 'React', 'Full-Stack Development', 'GITAM'],
            'nationality': { '@type': 'Country', 'name': 'India' },
          },
        ]}
      />

      <PageHero
        eyebrow="The team"
        lines={['Every flight starts', 'with people.']}
        lead="30+ students across aerospace, electronics, computer science and mechanical engineering, organised into two flight programs."
      />

      <section className="section theme-dark team-leads-section">
        <div className="container">
          <Head eyebrow="Leadership" title="Program leads." />
          <RevealGroup className="team-leads">
            {leads.map((m) => (
              <RevealItem key={m.name}>
                <button className="member member--lead" onClick={() => setOpen(m)}>
                  <Portrait member={m} />
                  <span className="eyebrow">{m.team}</span>
                  <span className="member-name">{m.name}</span>
                  <span className="member-role">{m.role}</span>
                </button>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section theme-light">
        <div className="container">
          <div className="team-toolbar">
            <Head eyebrow="Members" title="The whole crew." />
            <Reveal className="segmented segmented--light" role="tablist" aria-label="Filter team">
              {filters.map((f) => (
                <button
                  key={f.key}
                  role="tab"
                  aria-selected={filter === f.key}
                  className={filter === f.key ? 'is-active' : undefined}
                  onClick={() => setFilter(f.key)}
                >
                  {filter === f.key && (
                    <motion.span layoutId="team-pill" className="segmented-pill" transition={{ duration: 0.4, ease: ease.out }} />
                  )}
                  <span className="segmented-label">{f.label}</span>
                </button>
              ))}
            </Reveal>
          </div>

          <motion.ul layout className="team-grid">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((m) => (
                <motion.li
                  layout
                  key={`${m.team}-${m.name}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: ease.out }}
                >
                  <button className="member" onClick={() => setOpen(m)} aria-label={`${m.name}, ${m.role}. View profile`}>
                    <Portrait member={m} />
                    <span className="member-name">{m.name}</span>
                    <span className="member-role">{m.role}</span>
                    <span className="member-meta">{m.branch.replace(' Engineering', '').replace('and ', '& ')} · {m.year}</span>
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </section>

      <ClosingCTA
        eyebrow="Recruiting"
        title="Your name could be on this page."
        lead="GARI is open to every branch at GITAM University. Enthusiasm and commitment matter more than experience."
        primary={{ to: '/apply', label: 'Apply to join' }}
        secondary={{ to: '/about', label: 'How GARI is organised' }}
      />

      <AnimatePresence>
        {open && <MemberSheet member={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default TeamPage;
