export type GalleryCategory =
  | "all"
  | "winter-program"
  | "hiking"
  | "public-speaking"
  | "personal-development"
  | "summer-training"
  | "tournament";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  categoryLabel: string;
  categories: GalleryCategory[]; // Can match multiple tabs
  image: string;
  alt: string;
  aspectRatioClass: string; // Tailored aspect ratio for masonry flow
  description?: string;
  date?: string;
}

export const galleryTabs: { id: GalleryCategory; label: string }[] = [
  { id: "all", label: "ALL" },
  { id: "winter-program", label: "WINTER PROGRAM" },
  { id: "hiking", label: "HIKING" },
  { id: "public-speaking", label: "PUBLIC SPEAKING" },
  { id: "personal-development", label: "PERSONAL DEVELOPMENT" },
  { id: "summer-training", label: "SUMMER TRAINING" },
  { id: "tournament", label: "TOURNAMENT" },
];

export const galleryItems: GalleryItem[] = [
  // 1. Garage / Gym rope battle & fitness
  {
    id: "team-fitness-1",
    title: "Strength & Agility Conditioning",
    category: "personal-development",
    categoryLabel: "Personal Development",
    categories: ["personal-development", "winter-program"],
    image: "/images/event_team_fitness.jpg",
    alt: "Athletes practicing grip endurance and monkey bar fitness",
    aspectRatioClass: "aspect-[16/11]",
  },
  // 2. Bowling / team recreation & bowling alley
  {
    id: "fence-battle-match",
    title: "Championship Turf Action",
    category: "tournament",
    categoryLabel: "Tournament",
    categories: ["tournament", "summer-training"],
    image: "/images/event_fence_battle.jpg",
    alt: "Youth field hockey match play near the goal cage",
    aspectRatioClass: "aspect-[16/10]",
  },
  // 3. Indoor study & classroom clinic
  {
    id: "indoor-drills-clinic",
    title: "Indoor Technical Clinic",
    category: "winter-program",
    categoryLabel: "Winter Program",
    categories: ["winter-program", "personal-development"],
    image: "/images/event_indoor_drills.jpg",
    alt: "Players seated and practicing technical tactical drills",
    aspectRatioClass: "aspect-[16/11]",
  },
  // 4. Floor stretch & flexibility
  {
    id: "slide-blue-stretch",
    title: "Flexibility & Defensive Drills",
    category: "personal-development",
    categoryLabel: "Personal Development",
    categories: ["personal-development", "winter-program"],
    image: "/images/event_slide_blue.jpg",
    alt: "Players stretching and practicing mobility drills",
    aspectRatioClass: "aspect-[16/10]",
  },
  // 5. Tall gymnastics / monkey bars frame
  {
    id: "tall-monkey-bars",
    title: "Grip & Core Endurance Studio",
    category: "personal-development",
    categoryLabel: "Personal Development",
    categories: ["personal-development", "winter-program"],
    image: "/images/event_team_fitness.jpg",
    alt: "Athlete hanging on monkey bars indoor fitness equipment",
    aspectRatioClass: "aspect-[9/16]",
  },
  // 6. Forest hike tree trunk group
  {
    id: "forest-hike-stump",
    title: "Wilderness Team Expedition",
    category: "hiking",
    categoryLabel: "Hiking",
    categories: ["hiking", "personal-development"],
    image: "/images/about_team_group.png",
    alt: "Youth team standing on giant forest tree stump in Abbotsford trail",
    aspectRatioClass: "aspect-[4/5]",
  },
  // 7. Public speaking & speech microphone
  {
    id: "speech-ceremony",
    title: "Leadership & Public Speaking",
    category: "public-speaking",
    categoryLabel: "Public Speaking",
    categories: ["public-speaking", "personal-development"],
    image: "/images/event_mic_speech.jpg",
    alt: "Athlete and coach speaking at the microphone",
    aspectRatioClass: "aspect-[3/4]",
  },
  // 8. Boy at mic with trophy
  {
    id: "boy-mic-trophy",
    title: "Youth Athlete Address",
    category: "public-speaking",
    categoryLabel: "Public Speaking",
    categories: ["public-speaking", "personal-development", "tournament"],
    image: "/images/event_boy_mic.png",
    alt: "Junior player holding microphone presenting at event",
    aspectRatioClass: "aspect-[3/4]",
  },
  // 9. Pine forest hike & outdoor gathering
  {
    id: "community-forest",
    title: "Abbotsford Pine Forest Gathering",
    category: "hiking",
    categoryLabel: "Hiking",
    categories: ["hiking", "personal-development"],
    image: "/images/expertise_community.jpg",
    alt: "Large group united under tall pine trees in nature trail",
    aspectRatioClass: "aspect-[16/10]",
  },
  // 10. Grass field coaching & tactical circle
  {
    id: "grass-field-coaching",
    title: "Open Field Tactical Practice",
    category: "summer-training",
    categoryLabel: "Summer Training",
    categories: ["summer-training", "personal-development"],
    image: "/images/upcoming_event_1.jpg",
    alt: "Coaches and youth players in open green grass field",
    aspectRatioClass: "aspect-[16/11]",
  },
  // 11. Red jersey tournament drive
  {
    id: "red-action-play",
    title: "Red Jersey Attack",
    category: "tournament",
    categoryLabel: "Tournament",
    categories: ["tournament", "summer-training"],
    image: "/images/event_red_action.jpg",
    alt: "Player in red jersey charging during league match",
    aspectRatioClass: "aspect-[3/4]",
  },
  // 12. Reverse stick strike on goal
  {
    id: "goal-shot-strike",
    title: "Precision Strike on Target",
    category: "tournament",
    categoryLabel: "Tournament",
    categories: ["tournament"],
    image: "/images/event_goal_shot.jpg",
    alt: "Striker taking powerful shot on goal cage",
    aspectRatioClass: "aspect-[16/11]",
  },
  // 13. Slide tackle defense
  {
    id: "low-slide-tackle",
    title: "Slide Tackle Defense",
    category: "tournament",
    categoryLabel: "Tournament",
    categories: ["tournament", "summer-training"],
    image: "/images/event_low_tackle.jpg",
    alt: "Defensive slide tackle executed cleanly on turf",
    aspectRatioClass: "aspect-[16/10]",
  },
  // 14. Pre-game sticks circle
  {
    id: "sticks-circle-unity",
    title: "Team Unity & Core Values",
    category: "personal-development",
    categoryLabel: "Personal Development",
    categories: ["personal-development", "tournament"],
    image: "/images/about_sticks_huddle.png",
    alt: "Hockey sticks forming circle of unity",
    aspectRatioClass: "aspect-square",
  },
  // 15. Coach Jaswed & youth squad
  {
    id: "coach-jaswed-squad",
    title: "Coach Mentorship & Leadership",
    category: "personal-development",
    categoryLabel: "Personal Development",
    categories: ["personal-development", "tournament"],
    image: "/images/coach_jaswed.jpg",
    alt: "Coach Jaswed with smiling team in jerseys",
    aspectRatioClass: "aspect-[3/4]",
  },
  // 16. Summer camp festival tents
  {
    id: "girls-camp-tents",
    title: "Summer Camp Pavilion Days",
    category: "summer-training",
    categoryLabel: "Summer Training",
    categories: ["summer-training", "personal-development"],
    image: "/images/event_girls_tents.jpg",
    alt: "Players under tournament canopies sharing laughs",
    aspectRatioClass: "aspect-[3/4]",
  },
  // 17. Junior hockey training
  {
    id: "kids-action-drill",
    title: "Grassroots Development Program",
    category: "summer-training",
    categoryLabel: "Summer Training",
    categories: ["summer-training", "personal-development"],
    image: "/images/event_kids_action.jpg",
    alt: "Young juniors learning stick handling and sportsmanship",
    aspectRatioClass: "aspect-[3/4]",
  },
  // 18. Championship trophy celebration
  {
    id: "tournament-trophy",
    title: "Trophy Victory Celebration",
    category: "tournament",
    categoryLabel: "Tournament",
    categories: ["tournament"],
    image: "/images/expertise_tournaments.png",
    alt: "Team lifting tournament medals and championship trophy",
    aspectRatioClass: "aspect-[16/10]",
  },
  // 19. Matchfield wide action
  {
    id: "match-field-turf",
    title: "Midfield Command",
    category: "tournament",
    categoryLabel: "Tournament",
    categories: ["tournament"],
    image: "/images/event_match_field.jpg",
    alt: "Turf match with players moving into open space",
    aspectRatioClass: "aspect-[16/10]",
  },
  // 20. Community hockey outdoor
  {
    id: "community-hockey-pass",
    title: "Community Growth & Character",
    category: "hiking",
    categoryLabel: "Hiking",
    categories: ["hiking", "personal-development", "summer-training"],
    image: "/images/blog_community_hockey.jpg",
    alt: "Youth player smiling holding hockey stick in nature park",
    aspectRatioClass: "aspect-[16/10]",
  },
];
