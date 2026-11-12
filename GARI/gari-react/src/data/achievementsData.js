const buildImageSeries = (folder, prefix, extension, count, labelPrefix) =>
  Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');

    return {
      type: 'image',
      src: `/achievements/${folder}/${prefix}_${number}.${extension}`,
      label: `${labelPrefix} ${number}`,
    };
  });

const buildVideoSeries = (folder, prefix, extension, count, labelPrefix, poster) =>
  Array.from({ length: count }, (_, index) => {
    const number = String(index + 1).padStart(2, '0');

    return {
      type: 'video',
      src: `/achievements/${folder}/${prefix}_${number}.${extension}`,
      poster,
      label: `${labelPrefix} ${number}`,
    };
  });

const roverPhotoSeries = buildImageSeries(
  '01_rover_for_extraterrestrial_planets',
  'rover_extraterrestrial_photo',
  'jpeg',
  4,
  'Rover photo'
);

const roverVideoSeries = buildVideoSeries(
  '01_rover_for_extraterrestrial_planets',
  'rover_extraterrestrial_video',
  'mp4',
  8,
  'Rover motion test',
  roverPhotoSeries[0].src
);

const gimbalProjectMedia = buildImageSeries(
  '02_2_axis_gimbal_rocket_thrust_control',
  'gimbal_thrust_control_cad',
  'jpeg',
  1,
  'Gimbal CAD'
);

const hexaProjectMedia = buildImageSeries(
  '03_hexa_copter_making',
  'hexa_copter_photo',
  'jpeg',
  3,
  'Hexa build'
);

const rescueProjectMedia = buildImageSeries(
  '04_rover_emergency_rescue_operations',
  'emergency_rescue_rover_photo',
  'jpeg',
  8,
  'Rescue rover'
);

const lineFollowerMedia = [
  {
    type: 'image',
    src: '/achievements/05_line_follower_bot_2d_maze/line_follower_bot_photo_01.jpeg',
    label: 'Line follower photo 01',
  },
  {
    type: 'image',
    src: '/achievements/05_line_follower_bot_2d_maze/line_follower_bot_photo_02.png',
    label: 'Line follower photo 02',
  },
];

const fixedWingMedia = buildImageSeries(
  '06_fixed_wing_aircraft_model',
  'fixed_wing_aircraft_photo',
  'jpeg',
  14,
  'Fixed wing'
);

export const projectArchives = [
  {
    slug: 'rover-extraterrestrial-planets',
    year: '2026',
    title: 'Rover for Extraterrestrial Planets',
    category: 'Rover Systems',
    summary: 'A planetary rover prototype with chassis, wiring, wheel, and motion-testing documentation.',
    about: 'This archive shows the rover prototype from design to field testing. The set includes close-up photos of the chassis and wiring, plus motion videos that demonstrate how the platform behaves during development.',
    mediaSummary: '4 photos and 8 motion tests',
    heroMedia: roverVideoSeries[0],
    media: [...roverPhotoSeries, ...roverVideoSeries],
  },
  {
    slug: 'gimbal-rocket-thrust-control',
    year: '2026',
    title: '2-Axis Gimbal Rocket Thrust Control',
    category: 'Thrust Control',
    summary: 'A CAD-based thrust-vectoring mechanism for agile rocket control studies.',
    about: 'The gimbal archive captures the CAD model for the two-axis thrust control mechanism. It is a focused engineering study showing the control hardware concept used for rocket attitude experimentation.',
    mediaSummary: '1 CAD reference image',
    heroMedia: gimbalProjectMedia[0],
    media: gimbalProjectMedia,
  },
  {
    slug: 'hexa-copter-making',
    year: '2026',
    title: 'Hexa Copter Making',
    category: 'Aerial Systems',
    summary: 'Build photos covering the multirotor frame, propulsion, and electronics assembly.',
    about: 'This project documents the hexa-copter build process with close views of the frame, motors, wiring, and the final assembled platform. It is useful as proof of broader mechatronics and flight-system work.',
    mediaSummary: '3 build photos',
    heroMedia: hexaProjectMedia[0],
    media: hexaProjectMedia,
  },
  {
    slug: 'rover-emergency-rescue-operations',
    year: '2026',
    title: 'Rover Emergency Rescue Operations',
    category: 'Rescue Robotics',
    summary: 'Rover development for unmanned emergency response and rescue scenarios.',
    about: 'The rescue rover archive shows the prototype in build and presentation settings. The photos highlight the chassis, manipulator, wiring, wheels, and team-side demonstrations of the concept.',
    mediaSummary: '8 field and prototype photos',
    heroMedia: rescueProjectMedia[0],
    media: rescueProjectMedia,
  },
  {
    slug: 'line-follower-bot-2d-maze',
    year: '2026',
    title: 'Line Follower Bot 2D Maze',
    category: 'Autonomous Mobility',
    summary: 'A compact robot built for maze navigation and line-following demos.',
    about: 'This smaller archive shows the line-follower platform used for path tracking experiments. It is included to show autonomous mobility work beyond the larger aerospace prototypes.',
    mediaSummary: '2 project images',
    heroMedia: lineFollowerMedia[1],
    media: lineFollowerMedia,
  },
  {
    slug: 'fixed-wing-aircraft-model',
    year: '2026',
    title: 'Fixed-Wing Aircraft Model',
    category: 'Flight Prototypes',
    summary: 'A large fixed-wing archive showing structure, component placement, and test setup.',
    about: 'This is the most complete still-image archive in the set. It contains multiple views of the fixed-wing model, including structure details, electronics placement, and demonstration images that support a serious aerospace portfolio.',
    mediaSummary: '14 project photos',
    heroMedia: fixedWingMedia[10],
    media: fixedWingMedia,
  },
];

export const projectStats = [
  { value: '6', label: 'prototypes documented' },
  { value: '40', label: 'photos and test videos' },
  { value: '3', label: 'design reviews cleared' },
  { value: '2', label: 'national finals programs' },
];

export const competitions = [
  {
    name: 'Rocket — Critical Design Review cleared',
    year: '2026',
    date: 'Sept 20',
    category: 'Model Rocketry India',
    result: 'Cleared',
    description: 'Detailed design, manufacturing approach and integration plan approved by IN-SPACe. Next: Flight Readiness Review, Oct 21.',
  },
  {
    name: 'Selected for the IN-SPACe National Finals',
    year: '2026',
    date: 'Nov 17–20',
    category: 'CAN-7USAT · Model Rocketry',
    result: 'Selected',
    description: 'Both programs compete at Kushinagar, Uttar Pradesh.',
  },
  {
    name: 'Preliminary Design Review cleared — both programs',
    year: '2025',
    date: 'Nov',
    category: 'CanSat · Rocket',
    result: 'Cleared',
    description: 'System architecture and subsystem definitions approved for the CanSat and the rocket.',
  },
  {
    name: 'Spaceport America Cup',
    year: 'Future',
    date: '',
    category: 'Intercollegiate rocketry',
    result: 'Target',
    description: "The world's largest intercollegiate rocket competition — a future program target.",
  },
];

export const featuredProject = projectArchives[0];