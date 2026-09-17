export interface BlogSection {
  heading?: string;
  isCentered?: boolean;
  content?: string;
  items?: {
    numberTitle: string;
    description: string;
  }[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  isFeatured?: boolean;
  sections: BlogSection[];
  faqs: FaqItem[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    slug: "evolution-of-field-hockey-new-skills-and-training-trends",
    title: "Evolution of Field Hockey: New Skills and Training Trends",
    excerpt:
      "Field hockey, a sport filled with tradition and lightning speed action, has witnessed a sea change in the past decades...",
    image: "/images/blog_evolution_hockey.jpg",
    isFeatured: true,
    sections: [
      {
        content:
          "Field hockey, a sport filled with tradition and lightning speed action, has witnessed a sea change in the past decades. The grass pitch has given way to artificial turf, and the wooden stick has been substituted by high-tech composites. Along with this transformation came a change in the level of skill and training required to succeed in the game. In this blog, here, we address the newer trends of field hockey technique and methods of training that are revolutionizing the game.",
      },
      {
        heading: "THE NEW FIELD HOCKEY SCENARIO",
        isCentered: true,
        content:
          "Field hockey of today is faster, tactically astute, and extremely competitive. Those days are gone when natural ability would guarantee success. Today's top players are the result of high-tech skill acquisition, state-of-the-art training, and effective use of technology. Since the game is becoming increasingly popular on the international front, players and coaches are seeking to implement new methods to remain ahead.",
      },
      {
        heading: "NEW SKILLS IN FIELD HOCKEY",
        isCentered: true,
        items: [
          {
            numberTitle: "1. 3D SKILLS AND AIR DRIBBLING",
            description:
              "The most obvious of all the innovations in field hockey is the dominance of 3D skills. These are taking the ball from the ground just slightly to pass among players. Aerial dribbling is not just thrilling to look at but also offers scoring opportunities in tight spaces.",
          },
          {
            numberTitle: "2. REVERSE STICK SKILL",
            description:
              "Reverse and pass stick are fast becoming parts of any player's arsenal. Both allow dictatorial, cunning playmaking which can beat the strongest defense. Coaches these days value ambidextrous stick work right at a tender age.",
          },
          {
            numberTitle: "3. PENALTY CORNER EXPERTS AND DRAG FLICKERS",
            description:
              "The drag flick is also one of the big scoring techniques, especially at penalty corners. Drag flickers are specifically trained for strength and timing to be effective in this power-producing skill.",
          },
          {
            numberTitle: "4. RAPID TRANSITIONS AND COUNTERATTACKS",
            description:
              "Rapid transition to attack is a game-changer. Rapid breaks and counterattacks are now trained in teams with emphasis on vision, positioning, and correct passing.",
          },
        ],
      },
      {
        heading: "NEW AGE TRAINING METHODS",
        isCentered: true,
        items: [
          {
            numberTitle: "1. VIDEO ANALYSIS AND PERFORMANCE MONITORING",
            description:
              "Technology has left its mark on the field hockey pitch in a big way. Video analysis software is employed to help players as well as coaches review games and training sessions for feedback and correction on specific issues.",
          },
          {
            numberTitle: "2. VIRTUAL REALITY (VR) TRAINING",
            description:
              "Virtual reality is catching up fast in the form of field hockey practice. VR simulates actual games, decision-making, and reactions in controlled settings.",
          },
          {
            numberTitle: "3. FUNCTIONAL FITNESS AND POSITION-SPECIFIC CONDITIONING",
            description:
              "Schemes of training are no longer generic. Midfielder training will be quite different from the goalkeeper, with emphasis being placed on the most used muscles and movements needed in his position.",
          },
          {
            numberTitle: "4. SPORTS PSYCHOLOGY AND MENTAL SKILLS",
            description:
              "Mental toughness is now being looked at as important as physical fitness. Visualization, concentration training, and stress management techniques are now being included in training schemes to develop well-rounded players.",
          },
        ],
      },
      {
        heading: "YOUTH DEVELOPMENT AND GRASSROOTS INNOVATION",
        isCentered: true,
        content:
          "Junior programs also evolve to place greater emphasis on creativity. Children learn basic skills of the sport in the guise of fun and exciting drills through small-sided games that encourage imagination and activity. Talent spotting becomes more scientific in methodology, employing statistics and measures of performance to spot talent early.",
      },
      {
        heading: "THE ROLE OF COACHES AND ANALYTICS",
        isCentered: true,
        content:
          "Trainers are no longer motivators but technology consumers, skill enhancers, and data interpreters. They can monitor workload, pace, heart rate, and lots more via GPS tracking and analysis software to create training and prevent injuries.",
      },
      {
        heading: "GLOBAL REACH AND INCREASING DEMAND",
        isCentered: true,
        content:
          "The global popularity of field hockey is increasing even more with countries now investing in professional leagues, coaching development, and training centers. Therefore, the standard of the game is increasing, and new talent is coming from all around the world.",
      },
      {
        heading: "CONCLUSION",
        isCentered: true,
        content:
          "The evolution of field hockey is a testament to the sport's versatility and global popularity. New-age abilities, new paradigms in training, and worldwide spurt in popularity, field hockey is on a revolutionary spurt. Amateur or sporting phenomenon, one has to stay in touch with developments to touch the summit of success. In the coming times, it will be technology fusion and heritage that will take the game to dizzying heights.",
      },
    ],
    faqs: [
      {
        question: "1. What are new field hockey skills?",
        answer:
          "The most excellent skills are 3D dribbling, reverse stick skill, drag flick, and quick change of direction. Mastering these skills will significantly improve your game.",
      },
      {
        question: "2. How do beginners master advanced field hockey skills?",
        answer:
          "Start from teaching beginners first basics, then practice advanced moves in a slow, step-wise process. Learning through coaching with a coach or video tutorials will accelerate learning.",
      },
      {
        question: "3. What role does technology play to advance field hockey training?",
        answer:
          "Technology assists modern training by enabling the player to observe and learn through video analysis, virtual reality simulations, and use of performance monitor equipment.",
      },
      {
        question: "4. Is mental skill important for field hockey?",
        answer:
          "Mental resilience, focus, and self-belief are all of the utmost importance under pressure. More teams are now using sports psychology in practice.",
      },
      {
        question: "5. How much training must players do in order to be competitive at field hockey?",
        answer:
          "Competitive players must train 4-6 times a week, with a combination of skill, conditioning, and tactical performance. Recovery, and also mental preparation, is part of the package.",
      },
    ],
  },
  {
    id: "blog-2",
    slug: "the-role-of-technology-in-modern-hockey",
    title: "The Role of Technology in Modern Hockey",
    excerpt:
      "Modern hockey has seen a total makeover within the past few years, all thanks to technological advancements. Everything from equipment...",
    image: "/images/blog_tech_hockey.jpg",
    isFeatured: false,
    sections: [
      {
        content:
          "Modern hockey has seen a total makeover within the past few years, all thanks to technological advancements. Everything from equipment and artificial turf engineering to data analytics and wearable athlete telemetry has revolutionized how the sport is played, officiated, and enjoyed globally.",
      },
      {
        heading: "SMART EQUIPMENT AND WEARABLE SENSORS",
        isCentered: true,
        content:
          "Today's field hockey players are equipped with wearable sensors integrated into vests and wristbands that track sprint speeds, acceleration bursts, heart rates, and physical workload in real time. This biofeedback enables coaching staffs to tailor recovery protocols, prevent overtraining injuries, and optimize substitution rotations during high-tempo matches.",
      },
      {
        heading: "THE EVOLUTION OF COMPOSITE STICKS",
        isCentered: true,
        items: [
          {
            numberTitle: "1. CARBON FIBER ARCHITECTURE",
            description:
              "Wooden sticks have been replaced by multi-layered carbon fiber, Kevlar, and fiberglass matrices that provide unprecedented stiffness, vibration dampening, and slingshot ball velocity on drag flicks and slap shots.",
          },
          {
            numberTitle: "2. LOW BOW AND PRO BOW GEOMETRY",
            description:
              "Engineered bow profiles optimize dynamic ball lifting, 3D aerial drag maneuvers, and precision passing angles without compromising control.",
          },
          {
            numberTitle: "3. GOALKEEPER BALLISTIC PROTECTION",
            description:
              "High-density closed-cell foams and lightweight polymers allow goalkeepers to rebound shots traveling upwards of 120 km/h with maximal deflection control and safety.",
          },
        ],
      },
      {
        heading: "VIDEO REFERRALS AND TACTICAL SOFTWARE",
        isCentered: true,
        content:
          "High-definition video review systems provide transparent officiating at penalty corners and circle entries. Simultaneously, tactical telestration programs enable tactical coaches to provide instantaneous pitchside visual feedback to players during quarter intervals.",
      },
      {
        heading: "CONCLUSION",
        isCentered: true,
        content:
          "Technology and field hockey are now inseparable partners. Clubs that embrace digital tools, biomechanical analysis, and smart training regimens empower their athletes to reach collegiate and international podiums while preserving the sport's fast-flowing purity.",
      },
    ],
    faqs: [
      {
        question: "1. How do carbon fiber sticks compare to traditional wood?",
        answer:
          "Carbon fiber composite sticks deliver greater stiffness, higher ball velocity, and better durability than traditional mulberry wood sticks.",
      },
      {
        question: "2. What wearables do field hockey players use?",
        answer:
          "Players commonly wear GPS trackers, heart rate monitors, and smart vests to quantify distance covered, sprint speed, and fatigue levels.",
      },
      {
        question: "3. Does video review slow down field hockey matches?",
        answer:
          "Video referrals are strictly timed and limited per team to ensure fairness without interrupting the high-speed rhythm of the match.",
      },
    ],
  },
  {
    id: "blog-3",
    slug: "wolverines-field-hockey-club-inspiring-players-of-all-ages-in-abbotsford-bc",
    title: "Wolverines Field Hockey Club: Inspiring Players of All Ages in Abbotsford, BC",
    excerpt:
      "In the heart of Abbotsford, British Columbia, Wolverines Field Hockey Club (FHC) is a source of hope for young field...",
    image: "/images/blog_community_hockey.jpg",
    isFeatured: false,
    sections: [
      {
        content:
          "In the heart of Abbotsford, British Columbia, Wolverines Field Hockey Club (FHC) is a source of hope and athletic excellence for young field hockey athletes. Founded with the mission to promote grassroots sportsmanship, high-level skill cultivation, and an inclusive community culture, Wolverines FHC has grown into one of BC's premier athletic hubs.",
      },
      {
        heading: "FOSTERING COMMUNITY THROUGH SPORT",
        isCentered: true,
        content:
          "Field hockey in Abbotsford and the Fraser Valley is more than just a weekend competition; it is a deep-rooted community tradition. Families gather to support athletes across youth divisions (U10, U12, U14, U16) and senior premier squads, creating an uplifting environment where every child feels encouraged to learn, compete, and lead.",
      },
      {
        heading: "OUR CORE PILLARS OF EXCELLENCE",
        isCentered: true,
        items: [
          {
            numberTitle: "1. EXPERIENCED COACHING MENTORSHIP",
            description:
              "Our coaching lineup includes former national champions, certified tacticians, and passionate youth developers dedicated to technical precision and sportsmanship.",
          },
          {
            numberTitle: "2. YEAR-ROUND TURF & INDOOR TRAINING",
            description:
              "With elite access to Abbotsford Senior Turf and Haida Indoor Arena, our athletes train throughout every season, mastering outdoor tactics and lightning-fast indoor sideboard fundamentals.",
          },
          {
            numberTitle: "3. PATHWAY TO COLLEGIATE & NATIONAL TEAMS",
            description:
              "Wolverines athletes regularly earn recruitment opportunities with Canadian and US collegiate teams, Field Hockey BC provincial squads, and national junior development camps.",
          },
        ],
      },
      {
        heading: "JOINING THE WOLVERINES FAMILY",
        isCentered: true,
        content:
          "Whether you are picking up a hockey stick for the very first time or striving for international honors, Wolverines FHC welcomes you with open arms. Together, we are building champions on the pitch and leaders in our community.",
      },
      {
        heading: "CONCLUSION",
        isCentered: true,
        content:
          "The future of field hockey in Abbotsford shines brighter than ever. Join us on the turf, feel the energy of the pack, and become part of our storied legacy.",
      },
    ],
    faqs: [
      {
        question: "1. What age groups does Wolverines FHC cater to?",
        answer:
          "We offer comprehensive programs from U10 fundamentals all the way to U18 competitive leagues and Senior Premier Men's & Women's teams.",
      },
      {
        question: "2. Where do Wolverines teams practice in Abbotsford?",
        answer:
          "Our outdoor sessions take place at Abbotsford Senior Turf Field and Haida Field, while winter training operates inside Haida Indoor Arena.",
      },
      {
        question: "3. How can new players register for upcoming seasons?",
        answer:
          "New athletes can register directly through our online registration portal at /registration or contact us via our website contact form.",
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRecentPosts(currentSlug?: string): BlogPost[] {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, 2);
}
