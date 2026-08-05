export type BeyondCard = {
  title: string;
  description: string;
  image?: string;
  href?: string;
};

export type BeyondTable = {
  headers: string[];
  rows: string[][];
};

export type BeyondSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  image?: string;
  imageAlt?: string;
  cards?: BeyondCard[];
  table?: BeyondTable;
};

export type BeyondPage = {
  title: string;
  heroImage?: string;
  heroAlt: string;
  intro?: string[];
  quote?: string;
  sections?: BeyondSection[];
  gallery?: { image: string; alt: string }[];
};

export const beyondPages: Record<string, BeyondPage> = {
  'learning-beyond-the-classroom': {
    title: 'Learning Beyond the Classroom',
    heroImage: 'https://picsum.photos/id/1067/1920/980',
    heroAlt: 'Students engaged in sports, arts and outdoor activities',
    intro: [
      'At BIST, learning extends far beyond the classroom. Students are encouraged to discover interests, develop talents and build confidence through a rich programme of activities, leadership opportunities and community experiences.',
      'Our co-curricular programme supports academic growth by helping students collaborate, communicate, lead, reflect and take responsible risks.',
      'From sport and music to service, outdoor education and student leadership, every opportunity is designed to help students flourish as balanced, curious and compassionate young people.',
    ],
    quote:
      '"The opportunities beyond lessons help us find what we enjoy, meet new people and become more confident." - BIST student',
    sections: [
      {
        title: 'Explore activities',
        cards: [
          {
            title: 'Sports and Athletics',
            description: 'Team sport, fitness, competition and healthy habits.',
            image: 'https://picsum.photos/id/1058/640/420',
            href: '/beyond-the-classroom/sports-and-athletics',
          },
          {
            title: 'Outdoor Education',
            description: 'Expeditions, challenge, resilience and environmental awareness.',
            image: 'https://picsum.photos/id/1018/640/420',
            href: '/beyond-the-classroom/outdoor-education',
          },
          {
            title: 'Performing Arts',
            description: 'Drama, music, productions and creative confidence.',
            image: 'https://picsum.photos/id/1035/640/420',
            href: '/beyond-the-classroom/performing-arts',
          },
          {
            title: 'Student Leadership',
            description: 'Council, houses, service and student voice.',
            image: 'https://picsum.photos/id/1031/640/420',
            href: '/beyond-the-classroom/the-student-council',
          },
        ],
      },
    ],
  },
  'sports-and-athletics': {
    title: 'Sports and Athletics',
    heroImage: 'https://picsum.photos/id/1058/1920/980',
    heroAlt: 'Students playing team sports',
    intro: [
      'Sport is an important part of school life at BIST. Students are encouraged to participate, compete, improve and enjoy the benefits of an active lifestyle.',
      'Our sports programme supports physical wellbeing while helping students develop discipline, respect, resilience and pride in representing their school.',
    ],
    quote: '"Sport at BIST taught me how to work with others and keep going when things get difficult." - BIST student',
    sections: [
      {
        title: 'Benefits of sport',
        bullets: ['Teamwork and collaboration', 'Leadership and responsibility', 'Fitness, wellbeing and confidence'],
      },
      {
        title: 'Sports offered',
        bullets: ['Football', 'Basketball', 'Swimming', 'Athletics', 'Volleyball', 'Netball', 'Badminton', 'Cross country'],
        image: 'https://picsum.photos/id/1076/900/680',
        imageAlt: 'School team training together',
      },
    ],
  },
  'outdoor-education': {
    title: 'Outdoor Education',
    heroImage: 'https://picsum.photos/id/1018/1920/980',
    heroAlt: 'Students outdoors on expedition',
    intro: [
      'Outdoor Education gives students the chance to challenge themselves, build resilience and learn in environments beyond the classroom.',
      'Through carefully planned experiences, students develop teamwork, independence, confidence and a deeper appreciation of the natural world.',
      'The programme connects with wider opportunities including the Duke of Edinburgh Award and Yacht Club, giving students meaningful ways to apply skills in real-world settings.',
    ],
    quote: '"Outdoor Education helped me realise I could do more than I thought." - BIST student',
    sections: [
      {
        title: 'Expedition learning',
        paragraphs: [
          'Students learn to plan, communicate, problem solve and support one another through activities that require commitment and reflection.',
          'Experiences may include hiking, camping, sailing, team challenges and environmental learning.',
        ],
        image: 'https://picsum.photos/id/1015/1000/700',
        imageAlt: 'Students on an outdoor expedition',
      },
    ],
  },
  'duke-of-edinburghs-award': {
    title: "Duke of Edinburgh's Award",
    heroImage: 'https://picsum.photos/id/1015/1920/980',
    heroAlt: 'Students camping on an expedition',
    intro: [
      "The Duke of Edinburgh's Award is a globally recognised programme that encourages students to develop independence, commitment and service.",
      'Students can progress through Bronze, Silver and Gold levels, each requiring sustained effort across volunteering, physical, skills and expedition sections.',
    ],
    sections: [
      {
        title: 'Bronze, Silver and Gold',
        paragraphs: [
          'Each level increases in challenge and responsibility. Students set personal goals, track progress and reflect on what they learn through the process.',
        ],
      },
      {
        title: 'The Adventurous Journey',
        bullets: [
          'Planning routes and expedition aims',
          'Working safely as a team',
          'Navigating, camping and managing equipment',
          'Reflecting on challenge, leadership and resilience',
        ],
        image: 'https://picsum.photos/id/1022/1000/700',
        imageAlt: 'Students preparing expedition activities',
      },
      {
        title: 'Volunteering, physical and skills',
        paragraphs: [
          'Students also complete sections focused on community service, personal fitness and skill development, helping them become more balanced, capable and reflective.',
        ],
      },
    ],
  },
  'performing-arts': {
    title: 'Performing Arts',
    heroImage: 'https://picsum.photos/id/1035/1920/980',
    heroAlt: 'Students performing on stage',
    intro: [
      'Performing Arts at BIST gives students opportunities to express themselves, collaborate creatively and perform with confidence.',
      'Through drama, music and production work, students develop communication skills, imagination, discipline and stage presence.',
    ],
    quote: '"Performing helped me become more confident speaking and working with a team." - BIST student',
    sections: [
      {
        title: 'Productions and opportunities',
        paragraphs: [
          'Students can take part in drama productions, musicals, showcases, assemblies and special events throughout the year.',
          'Opportunities include acting, singing, stage management, technical support, rehearsal leadership and ensemble work.',
        ],
        image: 'https://picsum.photos/id/1059/1000/700',
        imageAlt: 'Students rehearsing a performance',
      },
    ],
  },
  'co-curricular-music': {
    title: 'Co-Curricular Music',
    heroImage: 'https://picsum.photos/id/1061/1920/980',
    heroAlt: 'Students playing instruments',
    intro: [
      'Music enriches school life and gives students a powerful way to develop creativity, discipline and collaboration.',
      'Our co-curricular music programme supports both experienced musicians and students beginning their musical journey.',
    ],
    sections: [
      {
        title: 'Benefits of Music',
        bullets: ['Confidence through performance', 'Creativity and expression', 'Teamwork in ensembles', 'Focus, practice and discipline'],
      },
      {
        title: 'Instrumental Tuition',
        bullets: ['Piano', 'Guitar', 'Violin', 'Drums', 'Voice', 'Woodwind', 'Brass'],
      },
      {
        title: 'Ensembles',
        bullets: ['Choir', 'Orchestra', 'Bands', 'Chamber groups', 'Performance showcases'],
        image: 'https://picsum.photos/id/1082/1000/700',
        imageAlt: 'Students in a music performance',
      },
    ],
  },
  'model-united-nations-mun': {
    title: 'Model United Nations (MUN)',
    heroImage: 'https://picsum.photos/id/1027/1920/980',
    heroAlt: 'Students debating in a formal conference setting',
    intro: [
      'Model United Nations gives students the opportunity to debate global issues, represent countries and develop a deeper understanding of diplomacy and international relations.',
      'Students research, write resolutions, speak formally, negotiate with delegates and respond thoughtfully to complex world challenges.',
    ],
    quote:
      '"MUN teaches us to listen carefully, speak with purpose and understand perspectives beyond our own." - Secretary-General, BIST MUN',
    sections: [
      {
        title: 'Conferences and skills',
        paragraphs: [
          'Through school-based and external conferences, students develop public speaking, research, critical thinking, negotiation and leadership skills.',
          'MUN supports international mindedness and encourages students to engage responsibly with the world around them.',
        ],
      },
    ],
  },
  'the-student-council': {
    title: 'The Student Council',
    heroImage: 'https://picsum.photos/id/1031/1920/980',
    heroAlt: 'Student Council members working together',
    intro: [
      'The Student Council gives students a voice in school life and helps them contribute positively to the BIST community.',
      'Students work with staff and peers to gather ideas, represent views, lead initiatives and support events.',
    ],
    sections: [
      {
        title: 'Council structure',
        paragraphs: ['The council includes an Executive Team and Class Representatives who work together across year groups.'],
        bullets: [
          'Represent student voice and share feedback',
          'Lead assemblies, campaigns and community projects',
          'Support school events and charitable initiatives',
          'Model respectful communication and responsible leadership',
        ],
      },
    ],
  },
  'our-house-system': {
    title: 'Our House System',
    heroImage: 'https://picsum.photos/id/1048/1920/980',
    heroAlt: 'Students taking part in house events',
    intro: [
      'The House System builds belonging, healthy competition and school spirit across BIST.',
      'Students belong to one of four Houses: North, South, East and West. Houses bring students together across year groups and encourage teamwork, leadership and pride.',
    ],
    sections: [
      {
        title: 'Points and competitions',
        paragraphs: [
          'House points are awarded for effort, achievement, participation, leadership and positive contributions to the school community.',
          'Competitions may include sport, arts, academic challenges, service events and whole-school celebrations.',
        ],
      },
    ],
  },
  'our-extra-curricular-programme': {
    title: 'Our Extra-Curricular Programme',
    heroImage: 'https://picsum.photos/id/1080/1920/980',
    heroAlt: 'A variety of student activities and clubs',
    intro: [
      'BIST offers a broad extra-curricular programme so students can explore interests, develop talents and build friendships beyond lessons.',
      'Activities are designed to support balance, confidence, leadership and joyful participation.',
    ],
    sections: [
      {
        title: 'Activity categories',
        cards: [
          { title: 'Sports', description: 'Football, basketball, swimming, athletics and team games.', image: 'https://picsum.photos/id/1058/640/420' },
          { title: 'Arts', description: 'Drama, music, visual arts, performance and creative workshops.', image: 'https://picsum.photos/id/1035/640/420' },
          { title: 'STEM', description: 'Coding, robotics, science clubs, design thinking and inquiry.', image: 'https://picsum.photos/id/1074/640/420' },
          { title: 'Service', description: 'Community projects, charity initiatives and student leadership.', image: 'https://picsum.photos/id/1031/640/420' },
        ],
      },
      {
        title: 'Activities may include',
        bullets: [
          'Football',
          'Basketball',
          'Volleyball',
          'Dodgeball',
          'Gymnastic',
          'Badminton',
          'Table tennis',
          'Coding',
        ],
      },
    ],
  },
  'our-community': {
    title: 'Our Community',
    heroImage: 'https://picsum.photos/id/1026/1920/980',
    heroAlt: 'BIST community gathering',
    intro: [
      'BIST is a diverse international community where students, families and staff work together with shared purpose and care.',
      'Community life is strengthened through events, service, celebration, partnership and a culture of mutual respect.',
    ],
    sections: [
      {
        title: 'Together at BIST',
        paragraphs: [
          'Our community experiences help students feel known, valued and connected. Families are welcomed into the life of the school through events, learning celebrations and meaningful partnerships.',
        ],
      },
    ],
  },
  'uniform-shop': {
    title: 'Uniform Shop',
    heroImage: 'https://picsum.photos/id/1060/1920/980',
    heroAlt: 'School uniform display',
    intro: [
      'The BIST Uniform Shop supports families with school uniform purchases through our partnership with Kapes.',
      'Families can purchase required uniform items and access guidance on sizing, availability and ordering.',
    ],
    gallery: [
      { image: 'https://picsum.photos/id/1011/640/420', alt: 'School uniform shirt display' },
      { image: 'https://picsum.photos/id/1025/640/420', alt: 'School sports uniform display' },
      { image: 'https://picsum.photos/id/1031/640/420', alt: 'School uniform accessories' },
    ],
    sections: [
      {
        title: 'Opening hours',
        table: {
          headers: ['Day', 'Hours'],
          rows: [
            ['Sunday to Thursday', '7:30 AM - 3:30 PM'],
            ['Friday & Saturday', 'Closed'],
            ['Holiday periods', 'Timings announced by school communication'],
          ],
        },
      },
      {
        title: 'Online ordering',
        paragraphs: [
          'Families can order selected items online through the Kapes ordering system where available. Please check school communications for current ordering links and collection details.',
        ],
      },
    ],
  },
  cafeteria: {
    title: 'Cafeteria',
    heroImage: 'https://picsum.photos/id/1080/1920/980',
    heroAlt: 'Students eating in a cafeteria',
    intro: [
      'The BIST cafeteria provides students with food options during the school day through our partnership with Catered.',
      'Menus are designed to offer convenient, balanced choices for students and staff.',
    ],
    sections: [
      {
        title: 'Menu and service',
        paragraphs: [
          'The cafeteria offers a range of snacks, meals and drinks. Menu availability may vary by section and school schedule.',
          'Families are encouraged to review current menu information shared through school communication channels.',
        ],
      },
    ],
  },
};

export const beyondSlugs = Object.keys(beyondPages);
