/**
 * Vagabond - AI Travel Itinerary Planner
 * Core Application Script
 */

// ==========================================================================
// 1. CURATED DESTINATIONS DATABASE
// ==========================================================================

const DESTINATIONS_DATABASE = {
  Paris: {
    city: "Paris",
    country: "France",
    theme: "Romantic, Artistic, & Historical",
    multipliers: { accommodation: 1.5, food: 1.4, transport: 1.2, activities: 1.3, misc: 1.2 },
    weather: {
      Spring: { temp: "15°C", icon: "cloud-sun", desc: "Mild & Pleasant", advice: "Pack layers and an umbrella for occasional spring showers." },
      Summer: { temp: "25°C", icon: "sun", desc: "Warm & Sunny", advice: "Bring light clothing, sunglasses, and sunscreen. Perfect for cafe patios." },
      Autumn: { temp: "14°C", icon: "cloud-drizzle", desc: "Cool & Golden", advice: "Pack a trench coat, scarf, and comfortable walking boots." },
      Winter: { temp: "6°C", icon: "cloud-snow", desc: "Cold & Crisp", advice: "Bring a thick wool coat, gloves, thermal layers, and lip balm." }
    },
    attractions: [
      { name: "Eiffel Tower", desc: "The iconic wrought-iron lattice monument.", cost: 30, tip: "Book sunset tickets 3 months in advance." },
      { name: "Louvre Museum", desc: "The world's largest art museum, home to the Mona Lisa.", cost: 22, tip: "Enter through the Carousel du Louvre entrance to skip main lines." },
      { name: "Sainte-Chapelle", desc: "A Gothic chapel with jaw-dropping 13th-century stained glass.", cost: 15, tip: "Visit on a sunny day morning for maximum stained glass glow." },
      { name: "Seine River Cruise", desc: "A scenic boat tour cruising past historical monuments.", cost: 18, tip: "Take a night cruise when the Eiffel Tower is illuminated." },
      { name: "Palace of Versailles", desc: "The opulent former royal residence of King Louis XIV.", cost: 25, tip: "Rent a bike in the gardens to explore the massive grounds." },
      { name: "Montmartre & Sacré-Cœur", desc: "A hilltop bohemian neighborhood with panoramic city views.", cost: 0, tip: "Watch out for street scammers near the lower steps." }
    ],
    restaurants: [
      { name: "Le Bistrot Paul Bert", style: "Traditional Bistro", desc: "Famed classic steak frites and grand soufflés.", avgCost: 45 },
      { name: "L'As du Fallafel", style: "Street Food", desc: "Renowned falafel wraps in the Jewish Quarter (Le Marais).", avgCost: 12 },
      { name: "Café de Flore", style: "Historical Cafe", desc: "Iconic coffee spot frequented by writers and philosophers.", avgCost: 22 },
      { name: "Epicure", style: "Fine Dining", desc: "3-Michelin-starred luxurious French culinary experience.", avgCost: 280 }
    ],
    activities: {
      Nature: [
        { title: "Luxembourg Gardens Walk", desc: "Stroll along gravel paths, see the Medici Fountain, and watch vintage wooden sailboats on the grand pond." },
        { title: "Canal Saint-Martin Picnic", desc: "Join locals sitting on the canal edge with wine, cheese, and fresh baguettes." },
        { title: "Jardin des Plantes Botanical Gardens", desc: "Wander through historic glasshouses, alpine gardens, and cherry blossom trees." }
      ],
      Adventure: [
        { title: "Explore the Catacombs", desc: "Walk through the chilling underground ossuary housing the bones of millions." },
        { title: "Climb the Arc de Triomphe", desc: "Ascend the 284 spiral steps for an unmatched view of the twelve radiating avenues." },
        { title: "Verdon Gorge Day Trip", desc: "Climb, kayak, or hike the dramatic limestone canyon trails." }
      ],
      Food: [
        { title: "Cheese & Wine Masterclass", desc: "Taste aged artisanal cheeses paired with grand cru wines in a vaulted cellar." },
        { title: "Croissant Baking Workshop", desc: "Learn the secrets of folding puff pastry dough from a local Parisian chef." },
        { title: "Rue Montorgueil Tasting Stroll", desc: "Graze on fresh oysters, macarons, and warm escargots along a historic food street." }
      ],
      History: [
        { title: "Marais Guided Heritage Walk", desc: "Discover medieval houses, Jewish history, and royal plazas like Place des Vosges." },
        { title: "Conciergerie Revolutionary Tour", desc: "Walk through the medieval palace cells where Marie Antoinette was imprisoned." },
        { title: "Pere Lachaise Cemetery Tour", desc: "Find the graves of Oscar Wilde, Edith Piaf, and Jim Morrison." }
      ],
      Museums: [
        { title: "Musée de l'Orangerie", desc: "Sit in the oval rooms surrounding Claude Monet's massive Water Lilies canvases." },
        { title: "Centre Pompidou Art Exploration", desc: "Browse Europe's largest modern art collection inside an inside-out high-tech building." },
        { title: "Musée Rodin Sculpture Gardens", desc: "See 'The Thinker' set amongst lush flowerbeds and fountains." }
      ],
      Shopping: [
        { title: "Les Puces de Saint-Ouen Flea Market", desc: "Browse vintage trinkets, luxury antiques, and retro clothing in a massive market complex." },
        { title: "Galeries Lafayette Dome View", desc: "Shop under the spectacular neo-byzantine glass dome and walk the glass skywalk." },
        { title: "Rue du Faubourg Saint-Honoré", desc: "Window shop at some of the world's most exclusive haute couture fashion houses." }
      ],
      Nightlife: [
        { title: "Moulin Rouge Cabaret Show", desc: "Experience the world-famous French Cancan dance with champagne." },
        { title: "Caveau de la Huchette Jazz Club", desc: "Dance to live swing music in a medieval cellar that inspired La La Land." },
        { title: "Speakeasy Hunting in Bastille", desc: "Locate hidden doors leading to premium craft cocktail lounges." }
      ],
      Photography: [
        { title: "Trocadéro Sunrise Photo Session", desc: "Capture the golden hour lighting up the Eiffel Tower without crowds." },
        { title: "Rue de l'Université Shoot", desc: "Photograph the towering monument framed by cobblestones and classic Haussmann buildings." },
        { title: "Sinking House Illusion Capture", desc: "Take a clever perspective photo next to the lawns of Sacré-Cœur." }
      ],
      General: [
        { title: "Seine Riverbank Stroll", desc: "Walk along the UNESCO-listed banks, browsing booksellers (bouquinistes) and bridges." },
        { title: "Belleville Panoramic View", desc: "Take in a local, alternative view of the city skyline away from main tourist spots." },
        { title: "Place du Tertre Artist Watch", desc: "Watch street painters sketch portraits in the heart of Montmartre." }
      ]
    }
  },
  Tokyo: {
    city: "Tokyo",
    country: "Japan",
    theme: "Futuristic, Traditional, & Culinary",
    multipliers: { accommodation: 1.3, food: 1.1, transport: 1.1, activities: 1.2, misc: 1.1 },
    weather: {
      Spring: { temp: "16°C", icon: "cherry-blossom", desc: "Sakura Season / Mild", advice: "Book accommodation early. Carry a light cardigan." },
      Summer: { temp: "28°C", icon: "sun-dim", desc: "Hot & Humid", advice: "Wear breathable clothing. Keep hydrated and look for indoor AC spots." },
      Autumn: { temp: "18°C", icon: "leaf", desc: "Cool & Colorful foliage", advice: "Perfect weather for hiking and walking. Bring a light jacket." },
      Winter: { temp: "7°C", icon: "cloud-snow", desc: "Cold & Sunny", advice: "Dry air, clear skies (ideal for viewing Mt. Fuji). Pack a thick jacket." }
    },
    attractions: [
      { name: "Shibuya Crossing & Hachiko", desc: "The world's busiest pedestrian scramble crossing.", cost: 0, tip: "Get a window seat at L'Occitane Cafe for great aerial videos." },
      { name: "Senso-ji Temple", desc: "Tokyo's oldest and most sacred Buddhist temple complex.", cost: 0, tip: "Visit at night when the lanterns and pagoda are illuminated and quiet." },
      { name: "Tokyo Skytree", desc: "The tallest structure in Japan, providing infinite views.", cost: 25, tip: "Check weather visibility parameters before purchasing tickets." },
      { name: "teamLab Planets", desc: "An immersive, body-on digital art museum walking through water.", cost: 28, tip: "Wear shorts/pants that roll up, as water depth reaches calf level." },
      { name: "Meiji Shrine", desc: "A peaceful shrine nestled inside a dense forest of 120,000 trees.", cost: 0, tip: "Look for traditional Shinto weddings walking through the courtyard." },
      { name: "Tsukiji Outer Market", desc: "A vibrant market packed with fresh sushi stalls and street food.", cost: 0, tip: "Arrive hungry around 8:00 AM; try the tamagoyaki (sweet omelette)." }
    ],
    restaurants: [
      { name: "Ichiran Ramen Shinjuku", style: "Casual Ramen", desc: "Tonkotsu ramen eaten in individual solo dining booths.", avgCost: 15 },
      { name: "Sukiyabashi Jiro", style: "Fine Dining", desc: "World-famous legendary sushi counter (reservation required).", avgCost: 350 },
      { name: "Shinjuku Omoide Yokocho", style: "Yakitori Stalls", desc: "Atmospheric alleyways serving grilled skewers over hot coals.", avgCost: 25 },
      { name: "Harajuku Gyoza Lou", style: "Dumpling Spot", desc: "Crispy pan-fried or steamed pork and chive gyoza.", avgCost: 10 }
    ],
    activities: {
      Nature: [
        { title: "Shinjuku Gyoen Garden Stroll", desc: "Wander through French, English landscape, and traditional Japanese tea gardens." },
        { title: "Mount Takao Hiking", desc: "Hike just 50 mins from Tokyo for scenic forest paths and mountain temple shrines." },
        { title: "Ueno Park Boat Rowing", desc: "Rent a swan boat and paddle on Shinobazu Pond surrounded by lotus plants." }
      ],
      Adventure: [
        { title: "Go-Karting through City Streets", desc: "Drive custom go-karts in Akihabara dressed as your favorite characters (International License required)." },
        { title: "VR Park Shinjuku", desc: "Experience cutting-edge Japanese virtual reality simulations and bungee drops." },
        { title: "Bouldering in Akihabara", desc: "Try indoor rock climbing alongside Tokyo's hobbyists." }
      ],
      Food: [
        { title: "Sushi Making Workshop", desc: "Learn how to prepare seasoned shari rice and master slice-rolling techniques from a sushi chef." },
        { title: "Izakaya Hopping in Golden Gai", desc: "Explore 200 tiny matchbox bars, tasting highballs and small-plate otsumami snacks." },
        { title: "Depachika Food Hall Crawl", desc: "Sample gourmet sweets, bento boxes, and premium fruits in the basement of Mitsukoshi Ginza." }
      ],
      History: [
        { title: "Edo-Tokyo Museum Exploration", desc: "See life-sized replicas of historic houses and kabuki theatres from old Edo." },
        { title: "Imperial Palace Garden Tour", desc: "Walk past historical guardhouses, stone walls, and the double bridge." },
        { title: "Asakusa Rickshaw Ride", desc: "Ride in a hand-drawn rickshaw through retro streets while hearing neighborhood history." }
      ],
      Museums: [
        { title: "Ghibli Museum Mitaka", desc: "Step inside the whimsical world of Hayao Miyazaki (Tickets must be bought on the 10th of the previous month)." },
        { title: "National Museum of Nature & Science", desc: "See dinosaur skeletons and historical technological innovations in Ueno." },
        { title: "Yayoi Kusama Museum", desc: "Interact with the legendary artist's dot patterns and infinity mirror installations." }
      ],
      Shopping: [
        { title: "Akihabara Retro Gaming Quest", desc: "Shop for vintage consoles and collectibles at Super Potato and Mandarake." },
        { title: "Harajuku Takeshita Street fashion hunt", desc: "Browse colorful fashion, crazy socks, and buy a giant rainbow cotton candy." },
        { title: "Ginza Luxury Window Shopping", desc: "Visit massive flagship stores, stationery megastores (Itoya), and art gallery basements." }
      ],
      Nightlife: [
        { title: "Karaoke Kan Shinjuku", style: "Karaoke", desc: "Rent a private room with neon lights and tambourines, singing classic hits." },
        { title: "Roppongi Hills Clubbing", desc: "Dance at high-energy electronic clubs frequented by international visitors." },
        { title: "Yurakucho Girders Drinks", desc: "Enjoy beer and skewers under the active train tracks with local businessmen." }
      ],
      Photography: [
        { title: "Kabukicho Neon Night Shoot", desc: "Capture the glowing neon signs, Godzilla head, and busy street crossways." },
        { title: "Meguro River Sakura Photography", desc: "Photograph cherry blossoms draping over a quiet canal illuminated by pink lanterns." },
        { title: "Hie Shrine Torii Corridor", desc: "Get a scenic shot of red Torii gates winding up a hill in the middle of skyscrapers." }
      ],
      General: [
        { title: "Tsukiji Fish Breakfast", desc: "Graze on grilled wagyu skewers, raw sea urchin, strawberry mochi, and tamago." },
        { title: "Sensory Walk in Akihabara", desc: "Immerse yourself in arcade game soundscapes and anime billboard sights." },
        { title: "Senso-ji Fortunes (Omikuji)", desc: "Shake a wooden cylinder, draw a fortune slip, and tie it to the temple wires." }
      ]
    }
  },
  "New York": {
    city: "New York",
    country: "USA",
    theme: "Vibrant, Urban, & Cinematic",
    multipliers: { accommodation: 1.8, food: 1.5, transport: 1.3, activities: 1.4, misc: 1.3 },
    weather: {
      Spring: { temp: "14°C", icon: "cloud-sun", desc: "Crisp & Blooming", advice: "Central Park looks gorgeous. Carry a light jacket and comfortable walk sneakers." },
      Summer: { temp: "27°C", icon: "sun", desc: "Hot & Muggy", advice: "Drink plenty of water. Escape the heat in air-conditioned museums." },
      Autumn: { temp: "16°C", icon: "leaf", desc: "Breezy & Golden foliage", advice: "Best season for walks. Pack sweaters, leather jacket, and boots." },
      Winter: { temp: "2°C", icon: "snowflake", desc: "Very Cold & Snowy", advice: "Temperatures drop below freezing. Bring puffer coat, gloves, and earmuffs." }
    },
    attractions: [
      { name: "Statue of Liberty & Ellis Island", desc: "The colossal neoclassical sculpture welcoming immigrants.", cost: 24, tip: "Take the earliest ferry to avoid long airport-style security queues." },
      { name: "Empire State Building", desc: "The legendary Art Deco skyscraper offering observation deck views.", cost: 44, tip: "Visit after 10 PM to see the city lights sparkle without lines." },
      { name: "Metropolitan Museum of Art", desc: "One of the world's finest art institutions spanning 5000 years.", cost: 30, tip: "Visit the rooftop garden for fantastic views over Central Park." },
      { name: "Top of the Rock", desc: "Rockefeller Center observation deck with clear views of Empire State.", cost: 40, tip: "Visit at sunset to capture both daytime and nighttime skyline photos." },
      { name: "High Line & Vessel", desc: "A linear public park built on a historic elevated freight rail line.", cost: 0, tip: "Walk south-to-north, starting at Gansevoort Street in Meatpacking." },
      { name: "9/11 Memorial & Museum", desc: "A poignant memorial centered inside the footprints of the Twin Towers.", cost: 28, tip: "Admission to the memorial pools is free; museum requires tickets." }
    ],
    restaurants: [
      { name: "Katz's Delicatessen", style: "Deli", desc: "Legendary, massive pastrami on rye served cafeteria-style.", avgCost: 30 },
      { name: "Joe's Pizza Greenwich Village", style: "Pizza", desc: "Famous, thin-crust classic New York street slices.", avgCost: 8 },
      { name: "Balthazar", style: "French Brasserie", desc: "High-energy SoHo spot serving oysters, steak frites, and pastries.", avgCost: 65 },
      { name: "Peter Luger Steak House", style: "Steakhouse", desc: "Historic Brooklyn venue serving dry-aged porterhouse steaks (Cash only).", avgCost: 110 }
    ],
    activities: {
      Nature: [
        { title: "Central Park Bike Ride", desc: "Rent a bike and loop the rolling hills, stopping at Bethesda Fountain and Bow Bridge." },
        { title: "Walk the Brooklyn Bridge", desc: "Cross the wooden promenade from Manhattan to Brooklyn Heights for skyline views." },
        { title: "Kayaking on the Hudson River", desc: "Paddle for free at Pier 26, enjoying views of One World Trade." }
      ],
      Adventure: [
        { title: "Helicopter Skyline Flight", desc: "Fly high over the Statue of Liberty and Manhattan skyscrapers for epic aerial views." },
        { title: "Edge Observation Deck climb", desc: "Leap out onto the highest outdoor sky deck in the Western Hemisphere." },
        { title: "Roosevelt Island Tramway Ride", desc: "Ride the red aerial cable car floating parallel to the Queensboro Bridge." }
      ],
      Food: [
        { title: "Chelsea Market Tasting Crawl", desc: "Sample artisanal tacos, lobster rolls, and fresh gourmet donuts under one roof." },
        { title: "Chinatown & Little Italy Tour", desc: "Graze on steamed soup dumplings, fresh cannoli, and local bubble tea." },
        { title: "Smorgasburg Brooklyn Food Fest", desc: "Try crazy fusion street food from 100 local vendors (Summer weekends)." }
      ],
      History: [
        { title: "Tenement Museum Tour", desc: "Walk inside preserved historic apartments showing the lives of working-class immigrants." },
        { title: "Grand Central Terminal Tour", desc: "Learn secrets of the Whispering Gallery and the gold-painted celestial ceiling." },
        { title: "Federal Hall & Wall Street Walk", desc: "Stand where George Washington took the oath of office as president." }
      ],
      Museums: [
        { title: "Museum of Modern Art (MoMA)", desc: "See iconic works like Vincent van Gogh's 'The Starry Night' and Andy Warhol's soup cans." },
        { title: "American Museum of Natural History", desc: "Explore the giant dinosaur halls, ocean life exhibits, and Hayden Planetarium." },
        { title: "Guggenheim Museum Spiral Walk", desc: "Walk up the spiral gallery ramp inside Frank Lloyd Wright's masterpiece building." }
      ],
      Shopping: [
        { title: "Fifth Avenue Shopping Walk", desc: "Browse high-end fashion boutiques, Apple glass cube, and historic department stores." },
        { title: "SoHo Cobblestone Boutiques", desc: "Shop for trendy streetwear, designer labels, and indie cosmetics." },
        { title: "Brooklyn Flea Market Hunt", desc: "Shop for vintage records, retro maps, and handmade jewelry under DUMBO archway." }
      ],
      Nightlife: [
        { title: "Broadway Musical Show", desc: "See a world-class theatrical performance in the heart of Times Square." },
        { title: "Greenwich Village Jazz Tour", desc: "Listen to legendary saxophonists at Village Vanguard or Blue Note." },
        { title: "Rooftop Bar Hopping in Williamsburg", desc: "Sip craft cocktails overlooking the lit-up Manhattan skyline." }
      ],
      Photography: [
        { title: "DUMBO Washington Street Spot", desc: "Photograph the Manhattan Bridge framed perfectly between red-brick warehouses." },
        { title: "Times Square Night Lights capture", desc: "Capture the dizzying billboard glow using long-exposure camera settings." },
        { title: "The Flatiron Building Perspective", desc: "Photograph the triangular historical skyscraper framed by yellow taxis." }
      ],
      General: [
        { title: "Staten Island Ferry Cruise", desc: "Take the free commuter ferry sailing right past the Statue of Liberty." },
        { title: "High Line Park Walk", desc: "Stroll along the elevated gardens, enjoying street art and urban views." },
        { title: "Bryant Park Relaxing", desc: "Grab a green bistro chair, read a book, and watch locals play chess." }
      ]
    }
  },
  London: {
    city: "London",
    country: "UK",
    theme: "Royal, Historic, & Eclectic",
    multipliers: { accommodation: 1.5, food: 1.3, transport: 1.4, activities: 1.2, misc: 1.2 },
    weather: {
      Spring: { temp: "12°C", icon: "cloud-drizzle", desc: "Mild & Rainy", advice: "Carry an umbrella and wear waterproof boots. Gardens are lush." },
      Summer: { temp: "22°C", icon: "sun-dim", desc: "Warm & Pleasant", advice: "Enjoy pub gardens and picnics. Bring light wear and sunglasses." },
      Autumn: { temp: "13°C", icon: "cloud", desc: "Cool & Foggy", advice: "Wrap up in cozy layers. Perfect season for indoor museum crawls." },
      Winter: { temp: "5°C", icon: "cloud-rain", desc: "Cold & Wet", advice: "Gloomy days but beautiful festive lights. Warm coat and gloves are vital." }
    },
    attractions: [
      { name: "Tower of London", desc: "The historic fortress housing the dazzling Crown Jewels.", cost: 35, tip: "Join the free tour led by the Yeoman Warders (Beefeaters)." },
      { name: "British Museum", desc: "A massive museum dedicated to history, art, and culture.", cost: 0, tip: "Entry is free, but booking a timed entry ticket online is highly recommended." },
      { name: "London Eye", desc: "The giant observation wheel rotating on the South Bank.", cost: 38, tip: "Book fast-track tickets online to bypass the massive queues." },
      { name: "Westminster Abbey", desc: "The historic royal church where coronations and weddings occur.", cost: 30, tip: "Attend Evensong service for free entry and beautiful choral music." },
      { name: "Buckingham Palace", desc: "The official administrative headquarters of the Monarch.", cost: 0, tip: "Check online for Changing of the Guard schedules before going." },
      { name: "Sky Garden", desc: "A landscaped botanical garden offering 360-degree city views.", cost: 0, tip: "Tickets are free but released every Monday morning. Book immediately." }
    ],
    restaurants: [
      { name: "Dishoom Covent Garden", style: "Indian Cafe", desc: "Highly popular Bombay street-style food and house black daal.", avgCost: 28 },
      { name: "Rules Restaurant", style: "Historic British", desc: "London's oldest restaurant serving classic game, pies, and puddings.", avgCost: 70 },
      { name: "Duck & Waffle", style: "Modern British", desc: "Dine on sweet-savory duck leg on a waffle, 40 floors up (Open 24/7).", avgCost: 55 },
      { name: "Poppies Fish & Chips", style: "Traditional Pub Fare", desc: "Classic retro chippy serving newspaper-wrapped cod and mushy peas.", avgCost: 18 }
    ],
    activities: {
      Nature: [
        { title: "Hyde Park Row Boating", desc: "Rent a pedalo boat on the Serpentine Lake, feeding swans and ducks." },
        { title: "Kew Gardens Glasshouses", desc: "Explore the world's largest collection of living plants under historic Victorian iron domes." },
        { title: "Richmond Park Deer Spotting", desc: "Walk the massive oak forests looking for wild herds of red and fallow deer." }
      ],
      Adventure: [
        { title: "Up at The O2 Climb", desc: "Put on a climbing suit and walk over the roof of the giant dome structure." },
        { title: "Speedboat on the Thames", desc: "Ride a high-speed RIB boat zooming under Tower Bridge with music." },
        { title: "Slide at ArcelorMittal Orbit", desc: "Ride the world's tallest, longest tunnel slide in Queen Elizabeth Olympic Park." }
      ],
      Food: [
        { title: "Borough Market Stroll", desc: "Sample artisanal truffles, hot salt beef bagels, and giant cheese toasties." },
        { title: "Traditional Afternoon High Tea", desc: "Enjoy finger sandwiches, warm scones, clotted cream, and tea in a grand tea room." },
        { title: "Brick Lane Curry Feast", desc: "Taste authentic Bangladeshi curries in London's street art central." }
      ],
      History: [
        { title: "Jack the Ripper Night Walk", desc: "Explore the dark streets of Whitechapel tracking Victorian-era crimes." },
        { title: "Churchill War Rooms Tour", desc: "Walk through the underground bunker where WWII strategic decisions were made." },
        { title: "Globe Theatre Tour", desc: "Explore the reconstructed open-air Elizabethan theatre where Shakespeare's plays debuted." }
      ],
      Museums: [
        { title: "Natural History Museum", desc: "See the massive blue whale skeleton suspended under cathedral-like arches." },
        { title: "Victoria and Albert Museum (V&A)", desc: "Wander through the world's premier museum of art, design, and fashion." },
        { title: "Tate Modern Galleries", desc: "Explore contemporary international art housed in a colossal former power station." }
      ],
      Shopping: [
        { title: "Camden Market Punk Exploration", desc: "Shop for vintage leather jackets, gothic clothes, and retro vinyl records." },
        { title: "Harrods Department Store Wander", desc: "Explore the famous Food Halls, Toy Kingdom, and Egyptian Escalator." },
        { title: "Portobello Road Antiques Hunt", desc: "Browse a mile-long street market lined with colorful houses in Notting Hill." }
      ],
      Nightlife: [
        { title: "West End Theatre Show", desc: "See long-running hit musicals like Les Misérables or Phantom of the Opera." },
        { title: "Soho Pub Crawl", desc: "Sip pints at historic pubs once frequented by musicians, artists, and royalty." },
        { title: "Shoreditch Craft Cocktail hunting", desc: "Visit innovative cocktail bars hidden behind vintage shop fronts." }
      ],
      Photography: [
        { title: "Westminster Bridge Big Ben Capture", desc: "Photograph the iconic clock tower framed by red double-decker buses." },
        { title: "Notting Hill Colorful Houses", desc: "Take photos of pastel-colored terraced houses on Lancaster Road." },
        { title: "Leadenhall Market Photo Session", desc: "Capture the Victorian glass roof and gold-green architecture (Diagon Alley filming location)." }
      ],
      General: [
        { title: "Changing of the Guard Ceremony", desc: "Watch the Queen's guard march in red tunics and bearskin hats." },
        { title: "South Bank Walk", desc: "Walk past book stalls, street performers, food markets, and the National Theatre." },
        { title: "Double-Decker Route 15 Ride", desc: "Hop on a historic Routemaster bus driving past St Paul's Cathedral to Tower Hill." }
      ]
    }
  },
  Dubai: {
    city: "Dubai",
    country: "UAE",
    theme: "Luxurious, Modern, & Futuristic",
    multipliers: { accommodation: 1.6, food: 1.3, transport: 1.2, activities: 1.5, misc: 1.3 },
    weather: {
      Spring: { temp: "26°C", icon: "sun", desc: "Warm & Sunny", advice: "Great beach weather. Carry swimwear and sun lotion." },
      Summer: { temp: "41°C", icon: "thermometer", desc: "Extremely Hot", advice: "Avoid outdoor daytime activities. Malls and indoor parks are heavily air-conditioned." },
      Autumn: { temp: "29°C", icon: "sun-dim", desc: "Warm & Clear", advice: "Pleasant evening temperatures. Perfect for desert camps and marina walks." },
      Winter: { temp: "20°C", icon: "cloud-sun", desc: "Perfect / Mild", advice: "Best outdoor season. Cool breezes at night; carry a light jacket." }
    },
    attractions: [
      { name: "Burj Khalifa", desc: "The world's tallest building, piercing the sky.", cost: 48, tip: "Book 'At the Top' tickets for 4:30 PM to catch both daylight and sunset views." },
      { name: "Dubai Mall & Fountain Show", desc: "A massive shopping center featuring a giant indoor aquarium.", cost: 0, tip: "Watch the water fountain show from the balcony of Apple Store." },
      { name: "Palm Jumeirah & Atlantis", desc: "A man-made archipelago shaped like a palm tree.", cost: 0, tip: "Ride the Palm Monorail to get the best views of the crescent villas." },
      { name: "Museum of the Future", desc: "An architectural marvel displaying future-focused technologies.", cost: 40, tip: "Tickets sell out weeks in advance; book immediately upon travel planning." },
      { name: "Miracle Garden", desc: "The world's largest natural flower garden with 150 million blooms.", cost: 25, tip: "Open only from November to April. Visit early in the day." },
      { name: "Desert Safari Camp", desc: "An excursion into golden dunes with camel rides and dinner.", cost: 60, tip: "Opt for a premium camp that includes dune bashing and a BBQ dinner." }
    ],
    restaurants: [
      { name: "Al Ustad Special Kebab", style: "Traditional Persian", desc: "Historic legendary restaurant famous for yogurt-marinated kebabs.", avgCost: 15 },
      { name: "Zuma Dubai", style: "Fine Dining Izakaya", desc: "Award-winning premium Japanese food in DIFC.", avgCost: 120 },
      { name: "Pierchic", style: "Seafood Fine Dining", desc: "Overwater wooden pier dining overlooking the Burj Al Arab.", avgCost: 180 },
      { name: "Arabian Tea House", style: "Traditional Emirati", desc: "Charming courtyard serving authentic Emirati breakfast platters.", avgCost: 22 }
    ],
    activities: {
      Nature: [
        { title: "Dubai Miracle Garden stroll", desc: "Walk past floral castles, giant clocks, and life-size floral Emirates airplanes." },
        { title: "Ras Al Khor Wildlife Sanctuary", desc: "Watch thousands of pink flamingos wading in wetlands with the city skyline behind." },
        { title: "Hatta Dam Kayaking", desc: "Kayak on turquoise waters nestled within rugged Hajar Mountain valleys." }
      ],
      Adventure: [
        { title: "Desert Dune Bashing", desc: "Ride in a 4x4 vehicle slipping and sliding down steep sand dunes." },
        { title: "Skydive over Palm Jumeirah", desc: "Freefall from 13,000 feet over the famous palm-shaped island." },
        { title: "Deep Dive Dubai", desc: "Explore a sunken post-apocalyptic city inside the world's deepest pool (60 meters)." }
      ],
      Food: [
        { title: "Spice & Gold Souk Graze", desc: "Sample saffron tea, local dates, camel milk ice cream, and traditional spices." },
        { title: "Dubai Marina Dinner Cruise", desc: "Sip mocktails on a traditional wooden dhow while sailing past illuminated skyscrapers." },
        { title: "Global Village Street Food Hunt", desc: "Try Turkish baked potatoes, Emirati lugaimat dumplings, and Bosnian kebabs." }
      ],
      History: [
        { title: "Al Fahidi Historical Neighborhood Walk", desc: "Explore gypsum and coral houses with traditional wind towers dating to the 1890s." },
        { title: "Abra Boat Ride across Dubai Creek", desc: "Cross the historic creek on a traditional wooden water taxi for just 1 AED." },
        { title: "Dubai Museum Heritage Tour", desc: "See traditional pearl diving gears and interactive history in Al Fahidi Fort." }
      ],
      Museums: [
        { title: "Etihad Museum Exploration", desc: "Learn about the unification of the seven Emirates inside a sleek contemporary pavilion." },
        { title: "Louvre Abu Dhabi Day Excursion", desc: "Take a day taxi to Abu Dhabi to see the spectacular floating domed art museum." },
        { title: "Al Shindagha Perfume House", desc: "Discover the heritage of Arabian perfume making, smelling pure oud and frankincense." }
      ],
      Shopping: [
        { title: "Gold Souk Bargaining Quest", desc: "Walk through rows of shops displaying heavy gold necklaces, diamonds, and silver." },
        { title: "Dubai Mall Premium Walk", desc: "Browse high-end fashion avenues and watch the giant indoor waterfall." },
        { title: "Souk Madinat Jumeirah Wander", desc: "Shop for lamps, carpets, and spices in a modern bazaar built along internal waterways." }
      ],
      Nightlife: [
        { title: "Dubai Marina Yacht Party", desc: "Cruise alongside superyachts enjoying music, food, and views." },
        { title: "Sip Cocktails at Gevora Rooftop", desc: "Have drinks on top of the world's tallest hotel, overlooking Sheikh Zayed Road." },
        { title: "La Perle Dragone Show", desc: "Watch a high-tech aqua theatrical show featuring divers, acrobats, and motorcycles." }
      ],
      Photography: [
        { title: "Dubai Frame Observation Deck", desc: "Stand on the glass bridge, capturing 'Old Dubai' on one side and 'New Dubai' on the other." },
        { title: "Wings of Mexico Capture", desc: "Photograph yourself framed inside golden wings with the Burj Khalifa right behind." },
        { title: "The Pointe Palm Fountain Shoot", desc: "Photograph the massive fountain shoot with Atlantis Hotel in the background." }
      ],
      General: [
        { title: "Kite Beach Sunset stroll", desc: "Walk along the sandy beach with views of the sail-shaped Burj Al Arab." },
        { title: "Ski Dubai Indoor Slopes", desc: "Escape hot weather by skiing, snowboarding, or meeting penguins in sub-zero snow." },
        { title: "Sunset Camel Ride in Dunes", desc: "Ride a camel across quiet desert sands, taking photos of the golden dunes." }
      ]
    }
  },
  Singapore: {
    city: "Singapore",
    country: "Singapore",
    theme: "Green, Futuristic, & Multicultural",
    multipliers: { accommodation: 1.4, food: 1.0, transport: 1.0, activities: 1.3, misc: 1.1 },
    weather: {
      Spring: { temp: "28°C", icon: "cloud-sun-rain", desc: "Tropical & Humid", advice: "Afternoon thunder showers are common. Carry an umbrella." },
      Summer: { temp: "29°C", icon: "sun-dim", desc: "Hot & Breezy", advice: "Wear light linen shirts. Drink plenty of fresh coconut water." },
      Autumn: { temp: "28°C", icon: "cloud-rain", desc: "Humid & Showery", advice: "Enjoy indoor gardens, shopping malls, and underpass networks." },
      Winter: { temp: "27°C", icon: "cloud-drizzle", desc: "Monsoon Season / Wet", advice: "Northeast monsoon brings heavy downpours. Museums are ideal." }
    },
    attractions: [
      { name: "Gardens by the Bay", desc: "Futuristic park featuring giant Supertree structures and glass conservatories.", cost: 24, tip: "Watch the free Garden Rhapsody light show at 7:45 PM and 8:45 PM." },
      { name: "Marina Bay Sands SkyPark", desc: "The iconic boat-shaped hotel rooftop observatory deck.", cost: 20, tip: "Get drinks at CÉ LA VI rooftop bar instead of buying observation deck tickets." },
      { name: "Sentosa Island & Universal Studios", desc: "A massive resort island featuring beaches and rollercoasters.", cost: 60, tip: "Take the Sentosa Express monorail or walk the boardwalk for free entry." },
      { name: "Singapore Zoo & Night Safari", desc: "A world-renowned open-concept zoo active at night.", cost: 35, tip: "Book the Night Safari tram ride in advance to secure seats." },
      { name: "Chinatown Heritage Centre", desc: "Shophouses showing the lives of Singapore's early Chinese migrants.", cost: 12, tip: "Dine at Chinatown Complex Food Centre after touring the temple." },
      { name: "Jewel Changi Airport", desc: "The spectacular dome housing the world's tallest indoor waterfall.", cost: 0, tip: "See it when you land or before you leave; light show runs hourly." }
    ],
    restaurants: [
      { name: "Liao Fan Hawker Chan", style: "Soya Sauce Chicken", desc: "World's cheapest Michelin-starred meal (original stall).", avgCost: 6 },
      { name: "Lau Pa Sat Hawker Centre", style: "Satay Street", desc: "Historic food pavilion closing down the street at night for satay grills.", avgCost: 15 },
      { name: "Jumbo Seafood East Coast", style: "Seafood Diner", desc: "Famous for sweet-savory Singaporean Chilli Crab with fried buns.", avgCost: 75 },
      { name: "Din Tai Fung Marina Bay", style: "Taiwanese Dumplings", desc: "Perfectly folded, delicate Xiao Long Bao soup dumplings.", avgCost: 24 }
    ],
    activities: {
      Nature: [
        { title: "Cloud Forest Waterfall Walk", desc: "Explore the misty greenhouse with a 35-meter indoor waterfall and exotic plants." },
        { title: "MacRitchie Reservoir Treetop Walk", desc: "Hike through tropical rainforest, crossing a 250-meter suspension bridge above the canopy." },
        { title: "Singapore Botanic Gardens", desc: "Stroll the lush UNESCO World Heritage site, visiting the national orchid collection." }
      ],
      Adventure: [
        { title: "AJ Hackett Sentosa Bungy", desc: "Leap from a 50-meter-high beach tower over Siloso Beach sands." },
        { title: "Skyline Luge Sentosa", desc: "Zoom down winding tracks on a gravity-fueled kart ride." },
        { title: "Southern Ridges Walk", desc: "Hike the 10km trail crossing Henderson Waves bridge, the highest pedestrian bridge in the city." }
      ],
      Food: [
        { title: "Hawker Centre Safari", desc: "Taste Michelin-approved Hainanese chicken rice, char kway teow noodles, and laksa soup." },
        { title: "Sling Cocktail at Raffles Hotel", desc: "Sip the original Singapore Sling inside the historic colonial Long Bar, tossing peanut shells on the floor." },
        { title: "Little India Spice Tour", desc: "Sample crispy paper thosai, samosas, and pulled pulled tea (Teh Tarik)." }
      ],
      History: [
        { title: "Fort Canning Battlebox Tour", desc: "Go underground into the WWII British command center bunker where Singapore surrendered." },
        { title: "Chinatown Shophouse Heritage Walk", desc: "See beautifully restored shophouses and visit the Buddha Tooth Relic Temple." },
        { title: "Katong Peranakan House Stroll", desc: "Learn about Straits Chinese culture while viewing colorful, pastel-painted houses." }
      ],
      Museums: [
        { title: "ArtScience Museum Exploration", desc: "Walk through interactive digital installations inside a building shaped like a lotus flower." },
        { title: "National Gallery Singapore", desc: "Browse Southeast Asian modern art housed in the grand former Supreme Court building." },
        { title: "National Museum of Singapore", desc: "Interact with multimedia exhibits outlining Singapore's transformation story." }
      ],
      Shopping: [
        { title: "Orchard Road Malls Crawl", desc: "Explore miles of connected shopping malls packed with luxury brands and underground food halls." },
        { title: "Kampong Glam Boutique Hunting", desc: "Browse hipster shops, custom perfumes, and indie cafes on Haji Lane." },
        { title: "Mustafa Centre 24/7 Quest", desc: "Explore a massive discount department store selling everything from electronics to spices." }
      ],
      Nightlife: [
        { title: "Clarke Quay Clubbing", desc: "Dance at high-energy bars, clubs, and floating restaurants along the Singapore River." },
        { title: "Night Safari tram ride", desc: "View nocturnal animals active in naturalistic enclosures under the moonlight." },
        { title: "Speakeasy Bar Hopping", desc: "Locate hidden doors behind telephone booths or vintage toy shops in Chinatown." }
      ],
      Photography: [
        { title: "Supertree Grove Light Show capture", desc: "Capture long-exposure photos of illuminated supertrees glowing against the night sky." },
        { title: "Haji Lane Street Art Shoot", desc: "Photograph colorful murals, eccentric store fronts, and narrow alleys." },
        { title: "Merlion Park Marina Bay capture", desc: "Take a classic photo of the water-spouting Merlion statue with Marina Bay Sands in the frame." }
      ],
      General: [
        { title: "Singapore River Cruise", desc: "Ride a traditional wooden bumboat past historic quays, bridges, and skyscrapers." },
        { title: "Spectra Light & Water Show", desc: "Watch the free laser, light, and fountain show on the waters of Marina Bay." },
        { title: "Jewel Vortex Light Show", desc: "Watch colors dance down the rain vortex indoor waterfall." }
      ]
    }
  },
  Bali: {
    city: "Bali",
    country: "Indonesia",
    theme: "Tropical, Spiritual, & Relaxing",
    multipliers: { accommodation: 0.6, food: 0.6, transport: 0.7, activities: 0.8, misc: 0.7 },
    weather: {
      Spring: { temp: "27°C", icon: "cloud-sun", desc: "Dry & Warm", advice: "Ideal season. Bright sunny days with low humidity." },
      Summer: { temp: "26°C", icon: "sun", desc: "Sunny & Breezy", advice: "Great surfing conditions. High season, book transport ahead." },
      Autumn: { temp: "27°C", icon: "cloud-drizzle", desc: "Transition Season", advice: "Occasional showers. Warm and quiet tourist spots." },
      Winter: { temp: "28°C", icon: "cloud-rain", desc: "Wet Monsoon", advice: "Frequent tropical downpours. High humidity. Prepare rain gear." }
    },
    attractions: [
      { name: "Ubud Monkey Forest", desc: "A sanctuary for grey long-tailed macaques among ancient banyan trees.", cost: 6, tip: "Keep your sunglasses and phone zipped up inside a bag." },
      { name: "Tanah Lot Temple", desc: "An ancient Hindu pilgrimage temple perched on a wave-swept rock offshore.", cost: 5, tip: "Go early to walk the reef, or stay for sunset when it is dramatically backlit." },
      { name: "Tegallalang Rice Terraces", desc: "Spectacular stepped green rice paddies using subak irrigation.", cost: 3, tip: "Wear stable shoes; walking the narrow clay paths can be slippery." },
      { name: "Mount Batur Volcano Trek", desc: "An active volcano hiked for sunrise views.", cost: 35, tip: "Hire a local guide; depart Ubud by 2:30 AM to reach the summit for sunrise." },
      { name: "Uluwatu Temple & Kecak Dance", desc: "A sea temple perched on a cliff edge presenting traditional dance.", cost: 10, tip: "Kecak fire dance starts around 6:00 PM; buy tickets at 5:00 PM." },
      { name: "Nusa Penida Day Trip", desc: "An island excursion to see Kelingking 'T-Rex' beach and cliffs.", cost: 45, tip: "Take a fast boat from Sanur. Roads on Nusa Penida are notoriously bumpy." }
    ],
    restaurants: [
      { name: "Warung Naughty Nuri's Ubud", style: "Indonesian BBQ", desc: "Famous for sticky glazed pork ribs and giant shaken martinis.", avgCost: 20 },
      { name: "Locavore Bali", style: "Fine Dining", desc: "Innovative tasting menu utilizing 100% local Indonesian ingredients.", avgCost: 95 },
      { name: "Potato Head Beach Club", style: "Beach Club Bistro", desc: "Oceanfront daybeds serving tropical cocktails and wood-fired pizzas.", avgCost: 35 },
      { name: "Warung Makan Bu Oki", style: "Local Warung", desc: "Authentic, super cheap Balinese Nasi Campur spicy rice platter.", avgCost: 4 }
    ],
    activities: {
      Nature: [
        { title: "Tegenungan Waterfall Walk", desc: "Hike down jungle steps to swim in the pool beneath a roaring waterfall." },
        { title: "Campuhan Ridge Walk", desc: "Stroll a grassy path winding between river valleys in Ubud during sunrise." },
        { title: "West Bali National Park boat ride", desc: "Snorkel in pristine marine waters looking for green sea turtles and coral reef cliffs." }
      ],
      Adventure: [
        { title: "Ayung River White Water Rafting", desc: "Paddle through rapids, class II-III, passing stone carvings and jungle waterfalls." },
        { title: "ATV Quad Biking through caves", desc: "Drive a quad bike through muddy trails, rice fields, and dark gorilla caves." },
        { title: "Surfing at Canggu Beach", desc: "Rent a surfboard and catch waves at Batu Bolong beach with a local instructor." }
      ],
      Food: [
        { title: "Balinese Cooking Masterclass", desc: "Visit a local market, pick fresh galangal and spices, then prepare satay lilit in a village kitchen." },
        { title: "Coffee Plantation Tasting", desc: "Sample traditional ginger tea, lemongrass tea, and learn how Luwak coffee is roasted." },
        { title: "Jimbaran Bay Seafood BBQ", desc: "Dine on grilled snapper, clams, and prawns brushed in sambal on daybeds on the sand." }
      ],
      History: [
        { title: "Tirta Empul Holy Water Bathing", desc: "Participate in a traditional purification ritual, walking under stone spring spouts." },
        { title: "Goa Gajah (Elephant Cave) Tour", desc: "Explore a 9th-century cave entrance carved with menacing faces and ancient relics." },
        { title: "Klungkung Palace Heritage Walk", desc: "See traditional Kamasan paintings depicting historical court trials on royal pavilion ceilings." }
      ],
      Museums: [
        { title: "Blanco Renaissance Museum", desc: "Explore the eccentric hilltop mansion and artwork of the 'Salvador Dali of Bali'." },
        { title: "Museum Neka Art Gallery", desc: "Trace Balinese painting styles from traditional wayang puppets to modern art." },
        { title: "Museum Puri Lukisan", desc: "Browse beautiful wood carvings and historic paintings in the heart of Ubud gardens." }
      ],
      Shopping: [
        { title: "Ubud Art Market Hunt", desc: "Bargain for round rattan bags, linen shirts, batik sarongs, and wooden carvings." },
        { title: "Seminyak Designer Boutiques", desc: "Shop for upscale resort wear, designer swimwear, and organic skin care." },
        { title: "Sukawati Art Market Quest", desc: "Visit a local wholesale market for cheap souvenirs and handmade goods." }
      ],
      Nightlife: [
        { title: "La Brisa Canggu Sunset Drinks", desc: "Sip cocktails in a rustic beach club built from reclaimed fishing boats." },
        { title: "Single Fin Uluwatu Party", desc: "Listen to live acoustic sets and DJs overlooking the famous surf break." },
        { title: "Clubbing at ShiShi Seminyak", desc: "Dance on three floors presenting techno, hip hop, and house music with neon lights." }
      ],
      Photography: [
        { title: "Bali Swing over Tegallalang", desc: "Get a photo swinging out over the palm valleys wearing a long dress." },
        { title: "Lempuyang Temple Gates of Heaven", desc: "Photograph yourself framed by the grand stone gates with Mount Agung behind." },
        { title: "Handara Gate Capture", desc: "Photograph the iconic giant Balinese stone gate surrounded by mist and golf green lawns." }
      ],
      General: [
        { title: "Yoga Class in Yoga Barn", desc: "Take a calming vinyasa or sound healing class in a massive bamboo open-air studio." },
        { title: "Sanur Beach Bicycle Ride", desc: "Ride along the paved beach path, passing local fishing boats and cafes." },
        { title: "Massage in Canggu Spa", desc: "Enjoy a traditional full-body Balinese oil massage for a cheap price." }
      ]
    }
  },
  Goa: {
    city: "Goa",
    country: "India",
    theme: "Portuguese Heritage, Beaches, & Nightlife",
    multipliers: { accommodation: 0.5, food: 0.5, transport: 0.6, activities: 0.7, misc: 0.6 },
    weather: {
      Spring: { temp: "29°C", icon: "sun", desc: "Hot & Sunny", advice: "Wear hats and loose cotton clothing. Perfect for evening dips." },
      Summer: { temp: "32°C", icon: "sun-dim", desc: "Humid & Sultry", advice: "Avoid mid-day sun. Look for shade and drink refreshing nimbu pani." },
      Autumn: { temp: "27°C", icon: "cloud-sun", desc: "Warm & Lush green", advice: "Monsoon is ending; waterfalls are full and nature is spectacular." },
      Winter: { temp: "24°C", icon: "wind", desc: "Pleasant & Windy", advice: "Best season. Cool sea breezes. Carry light layers for chilly nights." }
    },
    attractions: [
      { name: "Basilica of Bom Jesus", desc: "A UNESCO site housing the mortal remains of St. Francis Xavier.", cost: 0, tip: "Ensure shoulders and knees are covered when entering the church." },
      { name: "Fort Aguada & Lighthouse", desc: "A 17th-century Portuguese fortress overlooking the Arabian Sea.", cost: 3, tip: "Visit early morning to escape hot sun and crowds on the fort walls." },
      { name: "Dudhsagar Falls", desc: "A four-tiered waterfall looking like a sea of milk, accessible by jeep.", cost: 15, tip: "Jeep tours run from November to May. Wear swimwear underneath clothes." },
      { name: "Anjuna Flea Market", desc: "A massive weekly market packed with spices, jewelry, and clothes.", cost: 0, tip: "Runs only on Wednesdays. Start your bargaining at 50% of the asking price." },
      { name: "Fontainhas Latin Quarter", desc: "A colorful neighborhood with narrow streets and Portuguese villas.", cost: 0, tip: "Dine at a local cafe and take photographs of the bright yellow and blue walls." },
      { name: "Dona Paula Viewpoint", desc: "A scenic rocky headland offering views of Mormugao Harbor.", cost: 0, tip: "Go at sunset to watch local fishing boats return to the estuary." }
    ],
    restaurants: [
      { name: "Fisherman's Wharf Mobor", style: "Seafood Resto", desc: "Riverside dining serving spicy Goan fish curry rice and crab masala.", avgCost: 22 },
      { name: "Britto's Baga Beach", style: "Beach Shack", desc: "Iconic beach restaurant serving cold beers and vindaloo.", avgCost: 15 },
      { name: "Mum's Kitchen Panaji", style: "Traditional Goan", desc: "Homestyle family recipes preservation of Hindu & Christian cuisines.", avgCost: 25 },
      { name: "Gunpowder Assagao", style: "South Indian Fusion", desc: "Charming cottage garden serving spicy curries and flaky malabar parottas.", avgCost: 18 }
    ],
    activities: {
      Nature: [
        { title: "Spice Plantation Tour", desc: "Walk past pepper vines, nutmeg trees, and watch elephants bathe. Enjoy a spice-infused buffet lunch." },
        { title: "Dolphin Spotting Cruise", desc: "Ride a wooden boat out from Sinquerim Beach to watch wild dolphins jump in the bay." },
        { title: "Sal Backwaters Kayaking", desc: "Paddle through quiet mangrove channels looking for kingfishers and otters." }
      ],
      Adventure: [
        { title: "Water Sports at Calangute", desc: "Go jet skiing, parasailing, and ride a banana boat towed by speedboats." },
        { title: "Scuba Diving at Grande Island", desc: "Try a beginner dive to see marine coral reefs and shipwrecks in Goa." },
        { title: "Trek to Arambol Sweet Lake", desc: "Hike past banyan trees to find a fresh-water lake nestled right next to the sea." }
      ],
      Food: [
        { title: "Feni Distillery Tour", desc: "Learn how cashew apple juice is traditionally stomped and distilled to make Goa's signature liquor (Feni)." },
        { title: "Goan Curry Masterclass", desc: "Learn how to grind fresh coconut masala paste for a classic prawns curry." },
        { title: "Baga Shack Dinner Crawl", desc: "Graze on fish tikka, butter garlic prawns, and local poee bread at sunset." }
      ],
      History: [
        { title: "Old Goa Heritage Walk", desc: "Visit massive churches like Se Cathedral and the ruins of St. Augustine Tower." },
        { title: "Reis Magos Fort Tour", desc: "Explore a restored hilltop fort that once defended the narrowest point of Mandovi River." },
        { title: "Cabo de Rama Fort Hike", desc: "Hike the ruins of a clifftop fort named after Lord Rama, enjoying views of the sea." }
      ],
      Museums: [
        { title: "Museum of Christian Art", desc: "Browse a unique collection of indo-portuguese sacred art inside Santa Monica convent." },
        { title: "Houses of Goa Museum", desc: "See an architectural building displaying the evolution of Goan residential style." },
        { title: "Big Foot Heritage Museum", desc: "Walk through a recreated historic village showing traditional Goan occupations." }
      ],
      Shopping: [
        { title: "Mapusa Friday Market Quest", desc: "Browse a local market packed with dried fish, home-made sausages, and local pottery." },
        { title: "Saturday Night Bazaar Arpora", desc: "Shop for designer clothes, boutique spices, and enjoy live music performances." },
        { title: "Panaji Market Spice Hunt", desc: "Buy premium cashew nuts, local feni bottle, and Goan spices." }
      ],
      Nightlife: [
        { title: "Beach Party at Curlies", desc: "Dance on the sand of Anjuna Beach under the stars to techno music." },
        { title: "Clubbing at Tito's Lane", desc: "Visit Goa's most famous club strip, dancing to Bollywood and EDM music." },
        { title: "Casino Night on Mandovi", desc: "Board a floating luxury casino vessel for drinks, dinner, and card games." }
      ],
      Photography: [
        { title: "Fontainhas Pastel Walls", desc: "Photograph yourself in front of yellow, blue, and orange tiled villas." },
        { title: "Arambol Beach Sunset drum circle", desc: "Capture photos of fire spinners and musicians gathering on the sand at sunset." },
        { title: "Fort Tiracol Ocean Capture", desc: "Photograph the white walls of the fort hotel overlooking the calm Terekhol river inlet." }
      ],
      General: [
        { title: "Sunset Cruise on Mandovi River", desc: "Ride a triple-deck cruise boat enjoying Goan folk dances and music." },
        { title: "Arambol Mud Bathing", desc: "Bathe in mineral-rich yellow mud pools located in Arambol hills." },
        { title: "Morjim Beach Nest Watch", desc: "Spot Olive Ridley sea turtle nesting sites protected by local conservationists." }
      ]
    }
  }
};

// Universal/Fallback templates for unsupported destinations
const FALLBACK_DESTINATION = {
  theme: "Custom Adventurer's Destination",
  multipliers: { accommodation: 1.0, food: 1.0, transport: 1.0, activities: 1.0, misc: 1.0 },
  weather: {
    Spring: { temp: "18°C", icon: "cloud-sun", desc: "Mild & Breezy", advice: "Perfect walking conditions. Pack layers." },
    Summer: { temp: "26°C", icon: "sun", desc: "Warm & Sunny", advice: "Bring sunscreen and stay hydrated." },
    Autumn: { temp: "15°C", icon: "leaf", desc: "Cool & Golden", advice: "Expect chilly winds. Wear sweaters." },
    Winter: { temp: "8°C", icon: "snowflake", desc: "Cold & Crisp", advice: "Wrap up in warm thermal layers." }
  },
  attractions: [
    { name: "Downtown Historical Square", desc: "The cultural hub featuring local architecture and statues.", cost: 0, tip: "Great starting point for walking tours." },
    { name: "Central Heritage Museum", desc: "Displays art and relics depicting the region's rich timeline.", cost: 15, tip: "Check out the temporary exhibitions." },
    { name: "City Botanical Garden", desc: "A green oasis boasting rare local floral species.", cost: 8, tip: "Ideal spot for a quiet picnic." }
  ],
  restaurants: [
    { name: "The Local Bistro", style: "Traditional Bistro", desc: "Serves regional favorites made from local market ingredients.", avgCost: 25 },
    { name: "Street Food Plaza", style: "Street Food", desc: "An open market cluster serving local delicacies.", avgCost: 10 },
    { name: "Panorama Fine Dining", style: "Fine Dining", desc: "Rooftop dining featuring gourmet culinary fusions.", avgCost: 80 }
  ],
  activities: {
    Nature: [
      { title: "Scenic Park Trek", desc: "Hike the local trail winding through forests and views." },
      { title: "Riverfront Bike Ride", desc: "Rent a bike and ride along the scenic local riverbanks." }
    ],
    Adventure: [
      { title: "City Rooftop Tour", desc: "Get an adventurous view of the skyline from climbing points." },
      { title: "Eco Forest Exploration", desc: "Try zip-lining and canopy walking in nearby nature parks." }
    ],
    Food: [
      { title: "Local Culinary Tour", desc: "Sample traditional delicacies at three different heritage eateries." },
      { title: "Regional Coffee Tasting", desc: "Taste specialty coffees and pastries popular in the region." }
    ],
    History: [
      { title: "Heritage Building Tour", desc: "Explore local monuments and discover the foundation history." },
      { title: "Historic District Guided Walk", desc: "Hear stories of early founders and landmarks." }
    ],
    Museums: [
      { title: "Modern Art Centre", desc: "Browse contemporary pieces created by regional and national artists." },
      { title: "Cultural History Archives", desc: "View documents, photos, and relics illustrating the area's growth." }
    ],
    Shopping: [
      { title: "Central Shopping District Walk", desc: "Browse high street shops, souvenirs, and craft stores." },
      { title: "Weekly Artisans Market", desc: "Buy handcrafted woodworks, textiles, and local preserves." }
    ],
    Nightlife: [
      { title: "High Street Live Music Cafe", desc: "Listen to regional bands playing acoustic sessions." },
      { title: "Local Lounge Pub Crawl", desc: "Explore the most popular bars and clubs downtown." }
    ],
    Photography: [
      { title: "Panoramic Viewpoint Shoot", desc: "Capture the golden hour lighting up the town grid." },
      { title: "Murals & Street Art Walk", desc: "Photograph massive wall paintings depicting community stories." }
    ],
    General: [
      { title: "Discovery Walking Tour", desc: "Get familiar with the town center, parks, and alleys." },
      { title: "Relax at Local Plaza", desc: "Grab a tea, sit by the fountain, and watch the town buzz." }
    ]
  }
};

// ==========================================================================
// 2. STATE MANAGEMENT & DOM REFERENCES
// ==========================================================================

let appState = {
  currentTrip: null,
  savedTrips: [],
  theme: "dark"
};

// DOM Elements
const selectDestination = document.getElementById("select-destination");
const customDestinationGroup = document.getElementById("custom-destination-group");
const inputCustomDestination = document.getElementById("input-custom-destination");
const inputDuration = document.getElementById("input-duration");
const inputStartDate = document.getElementById("input-start-date");
const inputBudget = document.getElementById("input-budget");
const selectStyle = document.getElementById("select-style");
const selectTransport = document.getElementById("select-transport");
const selectAccommodation = document.getElementById("select-accommodation");
const itineraryForm = document.getElementById("itinerary-form");
const validationAlert = document.getElementById("validation-alert");
const btnGenerate = document.getElementById("btn-generate");
const btnSaveTrip = document.getElementById("btn-save-trip");
const btnClearAll = document.getElementById("btn-clear-all");
const themeToggle = document.getElementById("theme-toggle");

// Results container
const resultsPlaceholder = document.getElementById("results-placeholder");
const resultsContent = document.getElementById("results-content");

// Stats selectors
const statDestName = document.getElementById("stat-dest-name");
const statTotalDays = document.getElementById("stat-total-days");
const statTripBudget = document.getElementById("stat-trip-budget");
const statEstimatedCost = document.getElementById("stat-estimated-cost");
const statSavingsCost = document.getElementById("stat-savings-cost");
const statSavingsLabel = document.getElementById("stat-savings-label");
const statActivitiesCount = document.getElementById("stat-activities-count");

// Budget selectors
const budgetRingIndicator = document.getElementById("budget-ring-indicator");
const budgetPctVal = document.getElementById("budget-pct-val");
const budgetUtilizationStatus = document.getElementById("budget-utilization-status");
const breakdownHotelCost = document.getElementById("breakdown-hotel-cost");
const breakdownFoodCost = document.getElementById("breakdown-food-cost");
const breakdownTransportCost = document.getElementById("breakdown-transport-cost");
const breakdownActivitiesCost = document.getElementById("breakdown-activities-cost");
const breakdownMiscCost = document.getElementById("breakdown-misc-cost");
const breakdownHotelFill = document.getElementById("breakdown-hotel-fill");
const breakdownFoodFill = document.getElementById("breakdown-food-fill");
const breakdownTransportFill = document.getElementById("breakdown-transport-fill");
const breakdownActivitiesFill = document.getElementById("breakdown-activities-fill");
const breakdownMiscFill = document.getElementById("breakdown-misc-fill");

// Weather selectors
const weatherMainIcon = document.getElementById("weather-main-icon");
const weatherTempVal = document.getElementById("weather-temp-val");
const weatherDescription = document.getElementById("weather-description");
const weatherSeasonVal = document.getElementById("weather-season-val");
const weatherAdviceVal = document.getElementById("weather-advice-val");

// Attractions & Timeline
const attractionsListContainer = document.getElementById("attractions-list-container");
const itineraryTimelineContainer = document.getElementById("itinerary-timeline-container");
const btnToggleAllDays = document.getElementById("btn-toggle-all-days");

// Checklist & Saved List
const checklistProgressText = document.getElementById("checklist-progress-text");
const checklistProgressFill = document.getElementById("checklist-progress-fill");
const checklistContainer = document.getElementById("checklist-container");
const savedTripsContainer = document.getElementById("saved-trips-container");

// Dashboard counter values
const qsTripsSaved = document.getElementById("qs-trips-saved");

// ==========================================================================
// 3. INITIALIZATION & THEME HANDLER
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Load saved theme
  const savedTheme = localStorage.getItem("vagabond_theme") || "dark";
  setTheme(savedTheme);

  // Initialize dates
  const today = new Date().toISOString().split("T")[0];
  inputStartDate.setAttribute("min", today);
  inputStartDate.value = today;

  // Load Saved Trips
  loadSavedTrips();

  // Attach Listeners
  selectDestination.addEventListener("change", handleDestinationChange);
  itineraryForm.addEventListener("submit", handleFormSubmit);
  btnSaveTrip.addEventListener("click", handleSaveTrip);
  btnClearAll.addEventListener("click", handleClearAllTrips);
  themeToggle.addEventListener("click", handleThemeToggle);
  btnToggleAllDays.addEventListener("click", handleToggleAllDays);

  // Initialize icons
  lucide.createIcons();
});

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  appState.theme = theme;
  localStorage.setItem("vagabond_theme", theme);
}

function handleThemeToggle() {
  const newTheme = appState.theme === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

function handleDestinationChange() {
  if (selectDestination.value === "custom") {
    customDestinationGroup.style.display = "block";
    inputCustomDestination.setAttribute("required", "required");
  } else {
    customDestinationGroup.style.display = "none";
    inputCustomDestination.removeAttribute("required");
  }
}

// ==========================================================================
// 4. ITINERARY & BUDGET GENERATION LOGIC
// ==========================================================================

function handleFormSubmit(e) {
  e.preventDefault();
  validationAlert.style.display = "none";

  // Basic Validation
  if (!itineraryForm.checkValidity()) {
    validationAlert.textContent = "Please fill in all required fields correctly.";
    validationAlert.style.display = "block";
    itineraryForm.reportValidity();
    return;
  }

  const destinationVal = selectDestination.value;
  let destName = destinationVal;
  let isCustom = false;

  if (destinationVal === "custom") {
    destName = inputCustomDestination.value.trim();
    isCustom = true;
    if (!destName) {
      validationAlert.textContent = "Please enter custom destination name.";
      validationAlert.style.display = "block";
      inputCustomDestination.focus();
      return;
    }
  }

  const duration = parseInt(inputDuration.value);
  const budget = parseInt(inputBudget.value);
  const startDate = inputStartDate.value;
  const travelStyle = selectStyle.value;
  const transport = selectTransport.value;
  const accommodation = selectAccommodation.value;

  if (duration <= 0 || duration > 30) {
    validationAlert.textContent = "Trip duration must be between 1 and 30 days.";
    validationAlert.style.display = "block";
    inputDuration.focus();
    return;
  }

  if (budget <= 0) {
    validationAlert.textContent = "Overall budget must be a positive number.";
    validationAlert.style.display = "block";
    inputBudget.focus();
    return;
  }

  // Get interests
  const checkedInterests = Array.from(
    document.querySelectorAll('input[name="interests"]:checked')
  ).map(cb => cb.value);

  // Generate Itinerary State
  const trip = generateTripData({
    destName,
    isCustom,
    destinationVal,
    duration,
    budget,
    startDate,
    travelStyle,
    transport,
    accommodation,
    interests: checkedInterests
  });

  appState.currentTrip = trip;
  btnSaveTrip.removeAttribute("disabled");

  // Render Layouts
  renderTripDashboard(trip);

  // Scroll to Results
  resultsContent.scrollIntoView({ behavior: "smooth" });
}

function generateTripData(inputs) {
  const {
    destName,
    isCustom,
    destinationVal,
    duration,
    budget,
    startDate,
    travelStyle,
    transport,
    accommodation,
    interests
  } = inputs;

  const db = isCustom ? FALLBACK_DESTINATION : DESTINATIONS_DATABASE[destinationVal];
  const mult = db.multipliers;

  // 1. Calculate Budget Breakdown
  // Base daily costs in USD
  let baseAcc = 120;
  if (accommodation === "Hostel") baseAcc = 20;
  else if (accommodation === "Budget") baseAcc = 50;
  else if (accommodation === "Luxury") baseAcc = 350;

  let baseFood = 40;
  if (accommodation === "Hostel") baseFood = 15;
  else if (accommodation === "Budget") baseFood = 25;
  else if (accommodation === "Luxury") baseFood = 120;

  let baseTransport = 10;
  if (transport === "Flight") baseTransport = 50; // flat-rate daily average
  else if (transport === "Train") baseTransport = 20;
  else if (transport === "Car Rental") baseTransport = 45;

  let baseActivities = 30;
  if (interests.length > 5) baseActivities = 50;
  else if (interests.length < 2) baseActivities = 15;
  if (accommodation === "Luxury") baseActivities += 30;

  // Multiplied Daily Estimates
  const dailyAcc = baseAcc * mult.accommodation;
  const dailyFood = baseFood * mult.food;
  const dailyTransport = baseTransport * mult.transport;
  const dailyActivities = baseActivities * mult.activities;
  const dailyMisc = (dailyAcc + dailyFood + dailyTransport + dailyActivities) * 0.1 * mult.misc;

  // Total estimates
  const estAcc = Math.round(dailyAcc * duration);
  const estFood = Math.round(dailyFood * duration);
  const estTransport = Math.round(dailyTransport * duration);
  const estActivities = Math.round(dailyActivities * duration);
  const estMisc = Math.round(dailyMisc * duration);
  const estTotal = estAcc + estFood + estTransport + estActivities + estMisc;

  // 2. Determine Season based on Start Month
  const startMonth = new Date(startDate).getMonth(); // 0-indexed
  let season = "Spring";
  if (startMonth >= 5 && startMonth <= 7) season = "Summer";
  else if (startMonth >= 8 && startMonth <= 10) season = "Autumn";
  else if (startMonth === 11 || startMonth <= 1) season = "Winter";

  // Fetch weather data
  const weatherInfo = db.weather[season];

  // 3. Generate Day-by-Day itinerary
  const itinerary = [];
  let actCount = 0;

  // Extract lists of activities by interest
  let pooledActivities = [];
  if (interests.length > 0) {
    interests.forEach(interest => {
      if (db.activities[interest]) {
        pooledActivities.push(...db.activities[interest]);
      }
    });
  }
  // Fill in with General activities if pool is sparse
  if (pooledActivities.length < duration * 3) {
    pooledActivities.push(...(db.activities.General || db.activities.Nature));
  }

  // Shuffle or cycle through pooled activities safely
  for (let day = 1; day <= duration; day++) {
    const morningIdx = (day * 3 - 3) % pooledActivities.length;
    const afternoonIdx = (day * 3 - 2) % pooledActivities.length;
    const eveningIdx = (day * 3 - 1) % pooledActivities.length;

    const morning = pooledActivities[morningIdx] || { title: "Explore Local Streets", desc: "Take a leisurely walk around and discover local cafes." };
    const afternoon = pooledActivities[afternoonIdx] || { title: "Visit Local Landmark", desc: "Sightsee the city's key points of interest." };
    const evening = pooledActivities[eveningIdx] || { title: "Relaxing Dinner & Walk", desc: "Enjoy regional delicacies and dynamic night atmosphere." };

    actCount += 3;

    // Daily food spots
    const restIdx = (day - 1) % db.restaurants.length;
    const rest = db.restaurants[restIdx];

    // Estimated daily cost breakdown
    const dayCost = Math.round(dailyAcc + dailyFood + dailyTransport + dailyActivities + dailyMisc);

    // Dynamic travel tip
    let dayTip = "Remember to stay hydrated and keep local currency handily available.";
    if (travelStyle === "Solo") {
      const soloTips = [
        "Great day to join a walking tour group and meet fellow travelers.",
        "Keep your maps downloaded offline. Share your live location with family.",
        "Avoid quiet alleys at night. Sit near cafe windows to soak local vibes."
      ];
      dayTip = soloTips[day % soloTips.length];
    } else if (travelStyle === "Family") {
      const familyTips = [
        "Ensure child strollers are easily foldable for transport transits.",
        "Pack dry snacks. Plan bathroom stops near landmarks.",
        "Look out for family discounts at museum gates."
      ];
      dayTip = familyTips[day % familyTips.length];
    } else if (travelStyle === "Couple") {
      const coupleTips = [
        "Take romantic photos at scenic viewpoints.",
        "Consider booking a cozy table corner at the recommended restaurant.",
        "Take a slow evening walk to catch beautiful city lights."
      ];
      dayTip = coupleTips[day % coupleTips.length];
    }

    itinerary.push({
      dayNumber: day,
      date: addDays(startDate, day - 1),
      morning,
      afternoon,
      evening,
      restaurant: rest,
      tips: dayTip,
      cost: dayCost
    });
  }

  // 4. Generate Checklist items
  const checklist = generateChecklistData(destName, season, travelStyle, interests);

  return {
    id: Date.now(),
    destName,
    destinationVal,
    isCustom,
    duration,
    budget,
    startDate,
    travelStyle,
    transport,
    accommodation,
    interests,
    season,
    weather: weatherInfo,
    breakdown: { accommodation: estAcc, food: estFood, transport: estTransport, activities: estActivities, misc: estMisc, total: estTotal },
    attractions: db.attractions,
    itinerary,
    checklist,
    activitiesPlannedCount: actCount
  };
}

function generateChecklistData(dest, season, style, interests) {
  const list = {
    Essentials: [
      { text: "Passport, Visa documents, & Photo IDs", checked: false },
      { text: "Travel insurance printouts & tickets", checked: false },
      { text: "Universal power outlets adapter", checked: false },
      { text: "Local currency (Cash) & backup credit cards", checked: false },
      { text: "First-aid essentials & personal prescriptions", checked: false }
    ],
    Clothing: [],
    Gear: [],
    Toiletries: [
      { text: "Toothbrush, paste, & dental floss", checked: false },
      { text: "Travel-size shampoo, wash, & conditioner", checked: false },
      { text: "Sunscreen lotion (SPF 30+)", checked: false },
      { text: "Deodorant & light perfume spray", checked: false }
    ]
  };

  // Clothing based on season
  if (season === "Summer") {
    list.Clothing.push(
      { text: "Light, breathable cotton t-shirts", checked: false },
      { text: "Shorts, skirts, & comfortable wear", checked: false },
      { text: "Swimwear & beach towel", checked: false },
      { text: "Sun hat or baseball cap", checked: false },
      { text: "Polarized sunglasses", checked: false }
    );
  } else if (season === "Winter") {
    list.Clothing.push(
      { text: "Heavy wool winter coat / Puffer jacket", checked: false },
      { text: "Thermal base layers (tops & bottoms)", checked: false },
      { text: "Warm gloves, thick scarf, & beanie", checked: false },
      { text: "Thick woolen socks", checked: false },
      { text: "Water-resistant walking boots", checked: false }
    );
  } else {
    // Spring / Autumn
    list.Clothing.push(
      { text: "Light jacket, windbreaker, or cardigan", checked: false },
      { text: "Denim jeans & comfortable trousers", checked: false },
      { text: "Sneakers for long city walks", checked: false },
      { text: "Compact folding umbrella", checked: false }
    );
  }

  // Gear based on interests
  if (interests.includes("Adventure")) {
    list.Gear.push(
      { text: "Sturdy hiking shoes", checked: false },
      { text: "Refillable insulated water bottle", checked: false },
      { text: "Compact daypack / hiking bag", checked: false }
    );
  }
  if (interests.includes("Photography")) {
    list.Gear.push(
      { text: "Camera, lens system, & SD cards", checked: false },
      { text: "Portable battery pack charger", checked: false },
      { text: "Microfiber cleaning cloth & lens cap", checked: false }
    );
  }
  if (interests.includes("Beaches")) {
    list.Gear.push(
      { text: "Waterproof dry bag for phone/keys", checked: false },
      { text: "Flip-flops & beach sandals", checked: false }
    );
  }

  // Gear based on Style
  if (style === "Solo") {
    list.Gear.push(
      { text: "Offline maps downloaded on device", checked: false },
      { text: "Mini emergency whistle & door stopper", checked: false },
      { text: "E-reader / travel novel book", checked: false }
    );
  } else if (style === "Family") {
    list.Gear.push(
      { text: "Child identification bands / cards", checked: false },
      { text: "Wet wipes & sanitizing sprays", checked: false },
      { text: "Kids travel toys & coloring papers", checked: false }
    );
  } else if (style === "Business") {
    list.Gear.push(
      { text: "Laptop, charger, & mouse", checked: false },
      { text: "Formal blazer & ironed wear", checked: false },
      { text: "Notebook & fine pen", checked: false }
    );
  }

  // Ensure clothing/gear is not empty
  if (list.Clothing.length === 0) {
    list.Clothing.push({ text: "Standard daily casual clothes", checked: false });
  }
  if (list.Gear.length === 0) {
    list.Gear.push({ text: "Portable power bank charger", checked: false });
  }

  return list;
}

// Helper: adds days to date string
function addDays(dateStr, days) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' });
}

// ==========================================================================
// 5. DASHBOARD RENDERING & ANIMATED COUNTERS
// ==========================================================================

function renderTripDashboard(trip) {
  resultsPlaceholder.style.display = "none";
  resultsContent.style.display = "block";

  // Static Details
  statDestName.textContent = `${trip.destName}, ${trip.isCustom ? "Custom" : DESTINATIONS_DATABASE[trip.destinationVal].country}`;

  // Animated counters
  animateCounter(statTotalDays, 0, trip.duration, 800);
  animateCounter(statTripBudget, 0, trip.budget, 1000, "$");
  animateCounter(statEstimatedCost, 0, trip.breakdown.total, 1000, "$");

  const savings = trip.budget - trip.breakdown.total;
  const savingsAbs = Math.abs(savings);
  if (savings >= 0) {
    statSavingsLabel.textContent = "Savings Remaining";
    statSavingsCost.className = "stat-value"; // reset color
    animateCounter(statSavingsCost, 0, savingsAbs, 1000, "$");
  } else {
    statSavingsLabel.textContent = "Amount Over Budget";
    statSavingsCost.className = "stat-value text-danger"; // make it red
    animateCounter(statSavingsCost, 0, savingsAbs, 1000, "-$");
  }
  animateCounter(statActivitiesCount, 0, trip.activitiesPlannedCount, 800);

  // Budget ring utilization
  const pct = Math.round((trip.breakdown.total / trip.budget) * 100);
  budgetPctVal.textContent = `${pct}%`;
  
  if (pct > 100) {
    budgetUtilizationStatus.textContent = "Over Budget";
    budgetUtilizationStatus.style.color = "var(--danger)";
    budgetRingIndicator.setAttribute("stroke", "var(--danger)");
  } else {
    budgetUtilizationStatus.textContent = "Under Budget";
    budgetUtilizationStatus.style.color = "var(--accent-green)";
    budgetRingIndicator.setAttribute("stroke", "var(--primary-glow)");
  }

  // Update ring dashoffset
  // dasharray is 439.8
  const offset = 439.8 - (439.8 * Math.min(pct, 100)) / 100;
  budgetRingIndicator.style.strokeDashoffset = offset;

  // Cost Breakdown Progress Bars
  updateProgressBar(breakdownHotelCost, breakdownHotelFill, trip.breakdown.accommodation, trip.budget);
  updateProgressBar(breakdownFoodCost, breakdownFoodFill, trip.breakdown.food, trip.budget);
  updateProgressBar(breakdownTransportCost, breakdownTransportFill, trip.breakdown.transport, trip.budget);
  updateProgressBar(breakdownActivitiesCost, breakdownActivitiesFill, trip.breakdown.activities, trip.budget);
  updateProgressBar(breakdownMiscCost, breakdownMiscFill, trip.breakdown.misc, trip.budget);

  // Weather Card
  weatherSeasonVal.textContent = trip.season;
  weatherTempVal.textContent = trip.weather.temp;
  weatherDescription.textContent = trip.weather.desc;
  weatherAdviceVal.textContent = trip.weather.advice;

  // Weather Icon
  let weatherIconName = "sun";
  if (trip.weather.icon === "cloud-sun") weatherIconName = "cloud-sun";
  else if (trip.weather.icon === "cloud-drizzle") weatherIconName = "cloud-drizzle";
  else if (trip.weather.icon === "cloud-snow") weatherIconName = "cloud-snow";
  else if (trip.weather.icon === "snowflake") weatherIconName = "snowflake";
  else if (trip.weather.icon === "cloud-rain") weatherIconName = "cloud-rain";
  else if (trip.weather.icon === "thermometer") weatherIconName = "thermometer";

  weatherMainIcon.innerHTML = `<i data-lucide="${weatherIconName}"></i>`;

  // Attractions
  renderAttractions(trip.attractions);

  // Day-by-Day timeline
  renderItineraryTimeline(trip.itinerary);

  // Packing list checklist
  renderPackingChecklist(trip.checklist);

  // Re-draw icons
  lucide.createIcons();
}

function updateProgressBar(costEl, fillEl, amount, budget) {
  costEl.textContent = `$${amount}`;
  const pct = Math.min((amount / budget) * 100, 100);
  fillEl.style.width = `${pct}%`;
}

function renderAttractions(attractions) {
  attractionsListContainer.innerHTML = "";
  const grid = document.createElement("div");
  grid.className = "attractions-grid-items";

  attractions.forEach(att => {
    const item = document.createElement("div");
    item.className = "attraction-item";
    item.innerHTML = `
      <div class="attraction-badge-icon">
        <i data-lucide="map-pin"></i>
      </div>
      <div class="attraction-details">
        <span class="attraction-name">${att.name} <span class="bar-cost">($${att.cost})</span></span>
        <span class="attraction-desc">${att.desc}</span>
        <span class="attraction-tip"><i data-lucide="lightbulb"></i> Tip: ${att.tip}</span>
      </div>
    `;
    grid.appendChild(item);
  });

  attractionsListContainer.appendChild(grid);
}

// Animated counter utility
function animateCounter(element, start, end, duration, prefix = "", suffix = "") {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.textContent = `${prefix}${end.toLocaleString()}${suffix}`;
    }
  };
  window.requestAnimationFrame(step);
}

// ==========================================================================
// 6. TIMELINE ACCORDION & ITINERARY RENDERING
// ==========================================================================

function renderItineraryTimeline(itinerary) {
  itineraryTimelineContainer.innerHTML = "";

  itinerary.forEach((day, index) => {
    const card = document.createElement("div");
    card.className = `timeline-day-card ${index === 0 ? "active" : ""}`;
    card.id = `day-card-${day.dayNumber}`;

    card.innerHTML = `
      <div class="timeline-node-dot"></div>
      <button class="day-header-btn" aria-expanded="${index === 0 ? "true" : "false"}" aria-controls="day-panel-${day.dayNumber}">
        <div class="day-header-left">
          <span class="day-number-badge">Day ${day.dayNumber}</span>
          <span class="day-title-text">${day.date}</span>
        </div>
        <div class="day-header-right">
          <span class="day-cost-tag">Est: $${day.cost}</span>
          <i data-lucide="chevron-down" class="day-chevron"></i>
        </div>
      </button>
      
      <div id="day-panel-${day.dayNumber}" class="day-content-collapsible" role="region">
        <div class="day-content-inner">
          <div class="day-slots-list">
            
            <div class="slot-item">
              <div class="slot-time-badge">
                <i data-lucide="coffee"></i>
                <span class="slot-time-label">Morning</span>
              </div>
              <div class="slot-details">
                <span class="slot-title">${day.morning.title}</span>
                <span class="slot-desc">${day.morning.desc}</span>
              </div>
            </div>

            <div class="slot-item">
              <div class="slot-time-badge">
                <i data-lucide="sun"></i>
                <span class="slot-time-label">Midday</span>
              </div>
              <div class="slot-details">
                <span class="slot-title">${day.afternoon.title}</span>
                <span class="slot-desc">${day.afternoon.desc}</span>
              </div>
            </div>

            <div class="slot-item">
              <div class="slot-time-badge">
                <i data-lucide="moon"></i>
                <span class="slot-time-label">Night</span>
              </div>
              <div class="slot-details">
                <span class="slot-title">${day.evening.title}</span>
                <span class="slot-desc">${day.evening.desc}</span>
              </div>
            </div>

          </div>

          <div class="day-extra-row">
            <div class="day-extra-box food">
              <i data-lucide="utensils"></i>
              <div class="day-extra-info">
                <span class="day-extra-label">Dining Recommendation</span>
                <span class="day-extra-val"><strong>${day.restaurant.name}</strong> (${day.restaurant.style}) - ${day.restaurant.desc} Est: $${day.restaurant.avgCost}</span>
              </div>
            </div>
            
            <div class="day-extra-box tips">
              <i data-lucide="shield-check"></i>
              <div class="day-extra-info">
                <span class="day-extra-label">Day Safety / Local Tip</span>
                <span class="day-extra-val">${day.tips}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Accordion Toggle Handlers
    const headerBtn = card.querySelector(".day-header-btn");
    headerBtn.addEventListener("click", () => {
      const isCurrentlyActive = card.classList.contains("active");
      
      // Close this or toggle
      if (isCurrentlyActive) {
        card.classList.remove("active");
        headerBtn.setAttribute("aria-expanded", "false");
      } else {
        card.classList.add("active");
        headerBtn.setAttribute("aria-expanded", "true");
      }
    });

    itineraryTimelineContainer.appendChild(card);
  });
}

function handleToggleAllDays() {
  const cards = Array.from(itineraryTimelineContainer.querySelectorAll(".timeline-day-card"));
  const anyActive = cards.some(c => c.classList.contains("active"));

  if (anyActive) {
    cards.forEach(c => {
      c.classList.remove("active");
      c.querySelector(".day-header-btn").setAttribute("aria-expanded", "false");
    });
    btnToggleAllDays.textContent = "Expand All";
  } else {
    cards.forEach(c => {
      c.classList.add("active");
      c.querySelector(".day-header-btn").setAttribute("aria-expanded", "true");
    });
    btnToggleAllDays.textContent = "Collapse All";
  }
}

// ==========================================================================
// 7. CHECKLIST PERSISTENCE & RENDERING
// ==========================================================================

function renderPackingChecklist(checklist) {
  checklistContainer.innerHTML = "";

  Object.keys(checklist).forEach(category => {
    const items = checklist[category];
    if (items.length === 0) return;

    const catPanel = document.createElement("div");
    catPanel.className = "checklist-cat-panel";

    let iconName = "briefcase";
    if (category === "Essentials") iconName = "key-round";
    else if (category === "Clothing") iconName = "shirt";
    else if (category === "Gear") iconName = "mountain";
    else if (category === "Toiletries") iconName = "sparkles";

    catPanel.innerHTML = `
      <div class="checklist-cat-title">
        <i data-lucide="${iconName}"></i>
        ${category}
      </div>
      <div class="checklist-items-list"></div>
    `;

    const listContainer = catPanel.querySelector(".checklist-items-list");

    items.forEach((item, index) => {
      const itemLabel = document.createElement("label");
      itemLabel.className = "check-item-label";
      itemLabel.innerHTML = `
        <input type="checkbox" ${item.checked ? "checked" : ""}>
        <span>${item.text}</span>
      `;

      const checkbox = itemLabel.querySelector("input");
      checkbox.addEventListener("change", () => {
        item.checked = checkbox.checked;
        updateChecklistProgress();
        // Save state immediately if saving trips is active
        saveTripsToLocalStorage();
      });

      listContainer.appendChild(itemLabel);
    });

    checklistContainer.appendChild(catPanel);
  });

  updateChecklistProgress();
}

function updateChecklistProgress() {
  if (!appState.currentTrip) return;

  const list = appState.currentTrip.checklist;
  let total = 0;
  let checked = 0;

  Object.keys(list).forEach(cat => {
    list[cat].forEach(item => {
      total++;
      if (item.checked) checked++;
    });
  });

  checklistProgressText.textContent = `${checked} / ${total} Completed`;
  const pct = total > 0 ? (checked / total) * 100 : 0;
  checklistProgressFill.style.width = `${pct}%`;
}

// ==========================================================================
// 8. SAVED TRIPS LOCAL STORAGE CONTROLLER
// ==========================================================================

function handleSaveTrip() {
  if (!appState.currentTrip) return;

  // Check if trip is already saved (update/overwrite)
  const existingIdx = appState.savedTrips.findIndex(t => t.id === appState.currentTrip.id);
  
  if (existingIdx >= 0) {
    appState.savedTrips[existingIdx] = appState.currentTrip;
  } else {
    // New Save
    appState.savedTrips.push(appState.currentTrip);
  }

  saveTripsToLocalStorage();
  renderSavedTripsList();
  showSaveConfirmationBadge();
}

function showSaveConfirmationBadge() {
  btnSaveTrip.innerHTML = `<i data-lucide="check-check"></i> Saved!`;
  btnSaveTrip.className = "btn btn-primary";
  lucide.createIcons();

  setTimeout(() => {
    btnSaveTrip.innerHTML = `<i data-lucide="bookmark"></i> Save Itinerary`;
    btnSaveTrip.className = "btn btn-secondary";
    lucide.createIcons();
  }, 2000);
}

function saveTripsToLocalStorage() {
  try {
    localStorage.setItem("vagabond_saved_trips", JSON.stringify(appState.savedTrips));
    qsTripsSaved.textContent = appState.savedTrips.length;
  } catch (err) {
    console.error("Local storage error:", err);
    validationAlert.textContent = "Notice: LocalStorage is full. Trip details could not be permanently saved.";
    validationAlert.style.display = "block";
  }
}

function loadSavedTrips() {
  try {
    const raw = localStorage.getItem("vagabond_saved_trips");
    if (raw) {
      appState.savedTrips = JSON.parse(raw);
    } else {
      appState.savedTrips = [];
    }
  } catch (err) {
    console.error("Failed to load saved trips", err);
    appState.savedTrips = [];
  }

  qsTripsSaved.textContent = appState.savedTrips.length;
  renderSavedTripsList();
}

function renderSavedTripsList() {
  savedTripsContainer.innerHTML = "";

  if (appState.savedTrips.length === 0) {
    savedTripsContainer.innerHTML = `
      <p class="empty-saved-note">No saved itineraries found. Generate and click "Save Itinerary" to store your vacation details.</p>
    `;
    return;
  }

  appState.savedTrips.forEach(trip => {
    const card = document.createElement("article");
    card.className = "saved-trip-card";
    
    // Format date nicely
    const dateFormatted = new Date(trip.startDate).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric"
    });

    card.innerHTML = `
      <div>
        <div class="saved-trip-head">
          <h3 class="saved-trip-dest">${trip.destName}</h3>
          <span class="saved-trip-badge">${trip.travelStyle}</span>
        </div>
        <span class="saved-trip-date"><i data-lucide="calendar"></i> ${dateFormatted}</span>
        
        <div class="saved-trip-meta">
          <div class="meta-field">
            <span class="meta-label">Duration</span>
            <span class="meta-val">${trip.duration} Days</span>
          </div>
          <div class="meta-field">
            <span class="meta-label">Est. Cost</span>
            <span class="meta-val">$${trip.breakdown.total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div class="saved-trip-actions">
        <button class="btn btn-secondary btn-sm btn-reload" data-id="${trip.id}">
          <i data-lucide="folder-open"></i> Reload
        </button>
        <button class="btn btn-danger btn-sm btn-delete" data-id="${trip.id}" aria-label="Delete saved trip for ${trip.destName}">
          <i data-lucide="trash-2"></i> Delete
        </button>
      </div>
    `;

    // Listeners for load/delete
    card.querySelector(".btn-reload").addEventListener("click", () => reloadTrip(trip.id));
    card.querySelector(".btn-delete").addEventListener("click", () => deleteTrip(trip.id));

    savedTripsContainer.appendChild(card);
  });

  lucide.createIcons();
}

function reloadTrip(tripId) {
  const trip = appState.savedTrips.find(t => t.id === tripId);
  if (!trip) return;

  // Restore inputs
  selectDestination.value = trip.destinationVal;
  handleDestinationChange();
  
  if (trip.isCustom) {
    inputCustomDestination.value = trip.destName;
  } else {
    inputCustomDestination.value = "";
  }

  inputDuration.value = trip.duration;
  inputStartDate.value = trip.startDate;
  inputBudget.value = trip.budget;
  selectStyle.value = trip.travelStyle;
  selectTransport.value = trip.transport;
  selectAccommodation.value = trip.accommodation;

  // Restore checkboxes
  const checkboxes = document.querySelectorAll('input[name="interests"]');
  checkboxes.forEach(cb => {
    cb.checked = trip.interests.includes(cb.value);
  });

  // Set active trip state and render
  appState.currentTrip = trip;
  btnSaveTrip.removeAttribute("disabled");
  renderTripDashboard(trip);

  // Scroll
  resultsContent.scrollIntoView({ behavior: "smooth" });
}

function deleteTrip(tripId) {
  appState.savedTrips = appState.savedTrips.filter(t => t.id !== tripId);
  
  // If the deleted trip is currently active, clear active state
  if (appState.currentTrip && appState.currentTrip.id === tripId) {
    appState.currentTrip = null;
    btnSaveTrip.setAttribute("disabled", "disabled");
  }

  saveTripsToLocalStorage();
  renderSavedTripsList();
}

function handleClearAllTrips() {
  if (confirm("Are you sure you want to delete all saved itineraries? This action cannot be undone.")) {
    appState.savedTrips = [];
    appState.currentTrip = null;
    btnSaveTrip.setAttribute("disabled", "disabled");
    saveTripsToLocalStorage();
    renderSavedTripsList();
  }
}
