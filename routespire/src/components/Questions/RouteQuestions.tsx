import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Car, 
  Truck, 
  Bike, 
  Gauge, 
  Plus, 
  Minus, 
  Users, 
  Baby, 
  Dog, 
  Hotel, 
  Tent, 
  Home, 
  Star, 
  DollarSign,
  Utensils, 
  Coffee, 
  ShoppingBag, 
  Mountain, 
  Waves, 
  Sunset, 
  Music,
  GraduationCap, 
  Heart, 
  Plus as PlusIcon
} from 'lucide-react';
import styles from './RouteQuestions.module.css';

// Interfaces for data structures
interface TravelerGroup {
  label: string;
  description: string;
  count: number;
  icon: React.ReactNode;
}

interface StayOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface FoodOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface ActivityOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

function RouteQuestions() {
  // Step control state
  const [currentStep, setCurrentStep] = useState(1);

  // Location and trip type state
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(true);

  // Date and duration state
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [strictEndDate, setStrictEndDate] = useState(true);
  const [duration, setDuration] = useState<number | null>(null);

  // Driving limit state
  const [driveLimitUnit, setDriveLimitUnit] = useState<'hours' | 'miles'>('hours');
  const [driveLimit, setDriveLimit] = useState<number>(driveLimitUnit === 'hours' ? 6 : 400);

  // Vehicle information state
  const [vehicleType, setVehicleType] = useState<'car' | 'rv' | 'motorcycle'>('car');
  const [mpg, setMpg] = useState<number>(25);

  // Travelers information state
  const [travelers, setTravelers] = useState<TravelerGroup[]>([
    { label: 'Adults', description: 'Ages 35+', count: 0, icon: <Users size={20} /> },
    { label: 'Young Adults', description: 'Ages 21-34', count: 0, icon: <Users size={20} /> },
    { label: 'Teens', description: 'Ages 13-20', count: 0, icon: <Users size={20} /> },
    { label: 'Children', description: 'Ages 3-12', count: 0, icon: <Users size={20} /> },
    { label: 'Infants', description: 'Ages 2 and under', count: 0, icon: <Baby size={20} /> },
    { label: 'Dogs', description: 'Ages puppy and older', count: 0, icon: <Dog size={20} /> },
  ]);

  // Stay preferences state
  const [selectedStayType, setSelectedStayType] = useState<string>('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4]); // 0-4 representing $ levels

  // Food preferences state
  const [selectedFoodType, setSelectedFoodType] = useState<string>('popular');
  const [foodPriceRange, setFoodPriceRange] = useState<[number, number]>([0, 3]);

  // Activity preferences state
  const [selectedActivities, setSelectedActivities] = useState<string[]>(['']);
  const [customActivity, setCustomActivity] = useState('');
  const [userActivities, setUserActivities] = useState<string[]>([]);
  const [activityPriceRange, setActivityPriceRange] = useState<[number, number]>([0, 4]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  // Additional information state
  const [additionalInfo, setAdditionalInfo] = useState('');

  // Error message state
  const [error, setError] = useState('');

  // Constants for options
  const stayOptions: StayOption[] = [
    { id: 'popular', label: 'Most Popular Places', icon: <Star size={20} /> },
    { id: 'hotels', label: 'Hotels/Motels', icon: <Hotel size={20} /> },
    { id: 'rv', label: 'RV-Friendly', icon: <Truck size={20} /> },
    { id: 'boutique', label: 'Boutique Stays', icon: <Home size={20} /> },
    { id: 'cabins', label: 'Cabins/Cottages', icon: <Home size={20} /> },
    { id: 'camping', label: 'Tents/Camping', icon: <Tent size={20} /> },
    { id: 'none', label: 'No Recommendation', icon: <MapPin size={20} /> },
  ];

  const foodOptions: FoodOption[] = [
    { id: 'popular', label: 'Most Popular Places', icon: <Star size={20} /> },
    { id: 'restaurants', label: 'Restaurants', icon: <Utensils size={20} /> },
    { id: 'quickbites', label: 'Quick Bites', icon: <Coffee size={20} /> },
    { id: 'selfbrought', label: 'Self-Brought Food', icon: <ShoppingBag size={20} /> },
    { id: 'none', label: 'No Recommendation', icon: <MapPin size={20} /> },
  ];

  const activityOptions: ActivityOption[] = [
    { id: 'popular', label: 'Most Popular Activities', icon: <Star size={20} /> },
    { id: 'outdoors', label: 'Outdoors & Adventures', icon: <Mountain size={20} /> },
    { id: 'beach', label: 'Beach & Water Activities', icon: <Waves size={20} /> },
    { id: 'wellness', label: 'Relaxation & Wellness', icon: <Sunset size={20} /> },
    { id: 'nightlife', label: 'Nightlife & Entertainment', icon: <Music size={20} /> },
    { id: 'educational', label: 'Educational', icon: <GraduationCap size={20} /> },
  ];

  // Activity suggestions for autocomplete
  const ACTIVITY_SUGGESTIONS = [
    "Amusement Parks", "Aquariums", "Art Galleries", "Backpacking", "Beach Relaxation",
    "Beaches", "Bird Watching", "Boat Tours", "Boating", "Botanical Gardens",
    "Camping", "Canoeing", "Cave Exploration", "City Tours", "Concerts",
    "Cooking Classes", "Cultural Festivals", "Cycling", "Dining", "Farm Visits",
    "Fishing", "Filming", "Food Tours", "Golfing", "Hiking",
    "Historical Monuments", "Historical Sites", "Horseback Riding", "Hot Air Ballooning", "Jet Skiing",
    "Kayaking", "Lighthouses", "Live Music", "Local Markets", "Mountain Biking",
    "Museums", "Music", "National Forests", "National Parks", "Picnicking",
    "Photography", "Rafting", "Roadside Attractions", "Rock Climbing", "Running",
    "Scenic Drives", "Shopping", "Sightseeing", "Small Towns", "Snowboarding",
    "Skiing", "Spas", "Sports Events", "Stargazing", "Stand-Up Paddleboarding",
    "Surfing", "Swimming", "Theater Performances", "Theme Parks", "Tours",
    "Visiting Waterfalls", "Whale Watching", "Wildlife Watching", "Wine Tasting", "Yoga",
    "Ziplining", "Zoos"
  ].sort();

  // Event handler and helper functions

  // Toggle selected activity in activity options
  const toggleActivity = (activityId: string) => {
    setSelectedActivities(prev => {
      if (prev.includes(activityId)) {
        return prev.filter(id => id !== activityId);
      }
      return [...prev, activityId];
    });
  };

  // Handle change in start date input
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time portion to compare dates only
  
    if (selectedDate < today) {
      setError('Start date cannot be earlier than today');
      return;
    }
  
    setStartDate(e.target.value);
    // Clear end date if it's now invalid
    if (endDate) {
      const end = new Date(endDate);
      const maxDate = new Date(selectedDate);
      maxDate.setDate(maxDate.getDate() + 60);
      if (end <= selectedDate || end > maxDate) {
        setEndDate('');
      }
    }
    setError('');
  };

  // Handle change in end date input
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);  // Set the date first
    
    if (startDate && newEndDate) {  // Only validate if both dates exist
      const start = new Date(startDate);
      const end = new Date(newEndDate);
      const maxDate = new Date(start);
      maxDate.setDate(start.getDate() + 60);
      
      // Calculate the difference in days
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 0) {
        setError('End date must be at least 1 day after start date');
      } else if (end > maxDate) {
        setError('Trip duration cannot exceed 60 days');
      } else {
        setError('');
      }
    }
  };

  // Handle input in custom activity field
  const handleCustomActivityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCustomActivity(input);
  
    if (input.trim()) {
      const filtered = ACTIVITY_SUGGESTIONS.filter(
        activity => activity.toLowerCase().startsWith(input.toLowerCase())
      ).slice(0, 5); // Show only top 5 matches
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle click on suggestion in activity autocomplete
  const handleSuggestionClick = (suggestion: string) => {
    setCustomActivity('');
    setUserActivities(prev => [...prev, suggestion]);
    setShowSuggestions(false);
  };
  
  // Handle key down events in custom activity input
  const handleCustomActivityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // If Enter is pressed and there's valid input
    if (e.key === 'Enter' && customActivity.trim()) {
      e.preventDefault();
      addCustomActivity();
    }
    // If comma is pressed and there's valid input
    if (e.key === ',' && customActivity.trim()) {
      e.preventDefault(); // Prevent the comma from being added to the input
      addCustomActivity();
    }
  };

  // Add custom activity to user activities list
  const addCustomActivity = () => {
    if (customActivity.trim()) {
      setUserActivities(prev => [...prev, customActivity.trim()]);
      setCustomActivity('');
    }
  };

  // Remove activity from user activities list
  const removeCustomActivity = (activity: string) => {
    setUserActivities(prev => prev.filter(a => a !== activity));
  };

  // Handle change in activity price range
  const handleActivityPriceRangeChange = (index: number, value: number) => {
    const newRange = [...activityPriceRange] as [number, number];
    newRange[index] = value;
    
    if (index === 0 && value > newRange[1]) {
      newRange[1] = value;
    } else if (index === 1 && value < newRange[0]) {
      newRange[0] = value;
    }
    
    setActivityPriceRange(newRange);
  };

  // Update traveler count for a specific traveler group
  const updateTravelerCount = (index: number, increment: boolean) => {
    const newTravelers = [...travelers];
    if (increment) {
      newTravelers[index].count++;
    } else if (newTravelers[index].count > 0) {
      newTravelers[index].count--;
    }
    setTravelers(newTravelers);
  };

  // Get total number of travelers
  const getTotalTravelers = () => {
    return travelers.reduce((total, group) => total + group.count, 0);
  };

  // Get label for price based on value
  const getPriceLabel = (value: number) => {
    if (value === 0) return 'Free';
    return '$'.repeat(value);
  };

  // Handle change in stay price range
  const handlePriceRangeChange = (index: number, value: number) => {
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    
    if (index === 0 && value > newRange[1]) {
      newRange[1] = value;
    } else if (index === 1 && value < newRange[0]) {
      newRange[0] = value;
    }
    
    setPriceRange(newRange);
  };

  // Handle change in food price range
  const handleFoodPriceRangeChange = (index: number, value: number) => {
    const newRange = [...foodPriceRange] as [number, number];
    newRange[index] = value;
    
    if (index === 0 && value > newRange[1]) {
      newRange[1] = value;
    } else if (index === 1 && value < newRange[0]) {
      newRange[0] = value;
    }
    
    setFoodPriceRange(newRange);
  };

  // Proceed to next step with validation
  const handleNext = () => {
    if (currentStep === 1) {
      if (!startLocation.trim()) {
        setError('Please enter a starting location');
        return;
      }
      setError('');
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!startDate) {
        setError('Please select a start date');
        return;
      }
      if (!endDate) {
        setError('Please select an end date');
        return;
      }
      
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 0) {
        setError('End date must be at least 1 day after start date');
        return;
      }
      
      const maxDate = new Date(start);
      maxDate.setDate(start.getDate() + 60);
      if (end > maxDate) {
        setError('Trip duration cannot exceed 60 days');
        return;
      }
      
      setError('');
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (driveLimitUnit === 'hours' && (driveLimit < 2 || driveLimit > 10)) {
        setError('Daily drive hours must be between 2 and 10');
        return;
      }
      if (driveLimitUnit === 'miles' && (driveLimit < 150 || driveLimit > 650)) {
        setError('Daily drive miles must be between 150 and 650');
        return;
      }
      setError('');
      setCurrentStep(4);
    } else if (currentStep === 4) {
      if (mpg < 1 || mpg > 150) {
        setError('Please enter a valid MPG between 1 and 150');
        return;
      }
      setError('');
      setCurrentStep(5);
    } else if (currentStep === 5) {
      if (getTotalTravelers() === 0) {
        setError('Please add at least one traveler');
        return;
      }
      setError('');
      setCurrentStep(6);
    } else if (currentStep === 6) {
      if (!selectedStayType) {
        setError('Please select a preferred stay type');
        return;
      }
      setError('');
      setCurrentStep(7);
    } else if (currentStep === 7) {
      if (!selectedFoodType) {
        setError('Please select a food preference');
        return;
      }
      setError('');
      setCurrentStep(8);
    } else if (currentStep === 8) {
      if (selectedActivities.length === 0) {
        setError('Please select at least one activity preference');
        return;
      }
      setError('');
      setCurrentStep(9);
    } else if (currentStep === 9) {
      // No validation needed as this section is optional
      setError('');
      // Handle final submission with all data
      console.log({
        startLocation,
        endLocation,
        isRoundTrip,
        startDate,
        endDate,
        driveLimitUnit,
        driveLimit,
        vehicleType,
        mpg,
        travelers,
        selectedStayType,
        priceRange,
        selectedFoodType,
        foodPriceRange,
        selectedActivities,
        userActivities,
        activityPriceRange,
        additionalInfo
      });
    }
  };

  // Go back to previous step
  const handleBack = () => {
    setCurrentStep(currentStep > 1 ? currentStep - 1 : 1);
    setError('');
  };

  // Get minimum date for date inputs (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get label for driving limit based on unit
  const getLimitLabel = () => {
    if (driveLimitUnit === 'hours') {
      return `${driveLimit} ${driveLimit === 1 ? 'hour' : 'hours'}`;
    }
    return `${driveLimit} miles`;
  };

  // useEffect hooks

  // Update duration when startDate or endDate changes
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDuration(diffDays);
    } else {
      setDuration(null);
    }
  }, [startDate, endDate]);

  // Reset drive limit when driveLimitUnit changes
  useEffect(() => {
    setDriveLimit(driveLimitUnit === 'hours' ? 6 : 400);
  }, [driveLimitUnit]);

// Return statement rendering the component UI
return (
  <div className={styles.container}>
    {/* Progress Bar */}
    <div className={styles.progressBar}>
      <div 
        className={styles.progressFill} 
        style={{ width: `${currentStep * 11.11}%` }}
      />
    </div>

    <div className={styles.content}>
      <div className={styles.card}>
        {/* Step 1: Location and trip type */}
        {currentStep === 1 ? (
          <>
            <h1 className={styles.title}>Let's plan your route</h1>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                Starting Location <span className={styles.required}>*</span>
              </label>
              <div className={styles.inputWrapper}>
                <MapPin className={styles.icon} />
                <input
                  type="text"
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                  placeholder="Enter city or address"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                Destination
              </label>
              <div className={styles.inputWrapper}>
                <MapPin className={styles.icon} />
                <input
                  type="text"
                  value={endLocation}
                  onChange={(e) => setEndLocation(e.target.value)}
                  placeholder="Enter city or address (optional)"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Trip Type</label>
              <div className={styles.tripTypeButtons}>
                <button
                  onClick={() => setIsRoundTrip(true)}
                  className={`${styles.tripTypeButton} ${isRoundTrip ? styles.tripTypeActive : ''}`}
                >
                  Round Trip
                </button>
                <button
                  onClick={() => setIsRoundTrip(false)}
                  className={`${styles.tripTypeButton} ${!isRoundTrip ? styles.tripTypeActive : ''}`}
                >
                  One-Way
                </button>
              </div>
            </div>
          </>
        ) : currentStep === 2 ? (
          <>
            {/* Step 2: Date and duration */}
            <h1 className={styles.title}>When are you traveling?</h1>
        
            <div className={styles.inputGroup}>
              <label className={styles.label}>
                Start Date <span className={styles.required}>*</span>
              </label>
              <div className={styles.inputWrapper}>
                <Calendar className={styles.icon} />
                <input
                  type="date"
                  value={startDate}
                  min={getMinDate()}
                  onChange={handleStartDateChange}
                  className={styles.input}
                />
              </div>
            </div>
        
            <div className={styles.inputGroup}>
              <div className={styles.endDateHeader}>
                <label className={styles.label}>
                  End Date <span className={styles.required}>*</span>
                </label>
                <div className={styles.toggleWrapper}>
                  <label className={styles.toggleLabel}>
                    <span className={styles.toggleText}>
                      {strictEndDate ? 'Strict end date' : 'Flexible end date'}
                    </span>
                    <div 
                      className={`${styles.toggle} ${strictEndDate ? styles.toggleActive : ''}`}
                      onClick={() => setStrictEndDate(!strictEndDate)}
                    >
                      <div className={styles.toggleHandle} />
                    </div>
                  </label>
                </div>
              </div>
              <div className={styles.inputWrapper}>
                <Calendar className={styles.icon} />
                <input
                  type="date"
                  value={endDate}
                  min={startDate || getMinDate()}
                  max={startDate ? (() => {
                    const maxDate = new Date(startDate);
                    maxDate.setDate(maxDate.getDate() + 60);
                    return maxDate.toISOString().split('T')[0];
                  })() : undefined}
                  onChange={handleEndDateChange}
                  className={styles.input}
                />
              </div>
            </div>
        
            {duration !== null && (
              <div className={styles.durationDisplay}>
                {!strictEndDate && '~'}{duration} {duration === 1 ? 'Day' : 'Days'}
              </div>
            )}
          </>
        ) : currentStep === 3 ? (
          <>
            {/* Step 3: Driving limit */}
            <h1 className={styles.title}>What is the most you are willing to drive per day?</h1>

            <div className={styles.inputGroup}>
              <label className={styles.label}>
                Daily Drive Limit <span className={styles.required}>*</span>
              </label>
              <div className={styles.tripTypeButtons}>
                <button
                  onClick={() => setDriveLimitUnit('hours')}
                  className={`${styles.tripTypeButton} ${driveLimitUnit === 'hours' ? styles.tripTypeActive : ''}`}
                >
                  <Clock className={styles.buttonIcon} />
                  Hours
                </button>
                <button
                  onClick={() => setDriveLimitUnit('miles')}
                  className={`${styles.tripTypeButton} ${driveLimitUnit === 'miles' ? styles.tripTypeActive : ''}`}
                >
                  <Car className={styles.buttonIcon} />
                  Miles
                </button>
              </div>

              <div className={styles.sliderContainer}>
                <input
                  type="range"
                  min={driveLimitUnit === 'hours' ? 2 : 150}
                  max={driveLimitUnit === 'hours' ? 10 : 650}
                  step={driveLimitUnit === 'hours' ? 0.5 : 25}
                  value={driveLimit}
                  onChange={(e) => setDriveLimit(Number(e.target.value))}
                  className={styles.slider}
                />
                <div className={styles.sliderValue}>{getLimitLabel()}</div>
              </div>
            </div>
          </>
        ) : currentStep === 4 ? (
          <>
            {/* Step 4: Vehicle information */}
            <h1 className={styles.title}>What type of vehicle are you driving?</h1>

            <div className={styles.vehicleSection}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Vehicle Type <span className={styles.required}>*</span>
                </label>
                <div className={styles.vehicleButtons}>
                  <button
                    onClick={() => setVehicleType('car')}
                    className={`${styles.vehicleButton} ${vehicleType === 'car' ? styles.vehicleActive : ''}`}
                  >
                    <Car className={styles.buttonIcon} />
                    Car/Truck/Van
                  </button>
                  <button
                    onClick={() => setVehicleType('rv')}
                    className={`${styles.vehicleButton} ${vehicleType === 'rv' ? styles.vehicleActive : ''}`}
                  >
                    <Truck className={styles.buttonIcon} />
                    RV/Camper/Motorhome
                  </button>
                  <button
                    onClick={() => setVehicleType('motorcycle')}
                    className={`${styles.vehicleButton} ${vehicleType === 'motorcycle' ? styles.vehicleActive : ''}`}
                  >
                    <Bike className={styles.buttonIcon} />
                    Motorcycle
                  </button>
                </div>

                <div className={styles.mpgContainer}>
                  <label className={styles.label}>
                    Fuel Economy (MPG or MPGe) <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.inputWrapper}>
                    <Gauge className={styles.icon} />
                    <input
                      type="number"
                      min="1"
                      max="150"
                      value={mpg}
                      onChange={(e) => setMpg(Number(e.target.value))}
                      placeholder="Enter your vehicle's MPG"
                      className={styles.input}
                    />
                  </div>
                  </div>
              </div>
            </div>
          </>
        ) : currentStep === 5 ? (
          <>
            {/* Step 5: Travelers information */}
            <h1 className={styles.title}>Who will be traveling?</h1>
            
            <div className={styles.travelersSection}>
              {travelers.map((group, index) => (
                <div key={group.label} className={styles.travelerGroup}>
                  <div className={styles.travelerInfo}>
                    <div className={styles.travelerIcon}>
                      {group.icon}
                    </div>
                    <div className={styles.travelerLabels}>
                      <span className={styles.travelerLabel}>{group.label}</span>
                      <span className={styles.travelerDescription}>{group.description}</span>
                    </div>
                  </div>
                  
                  <div className={styles.counterControls}>
                    <button
                      onClick={() => updateTravelerCount(index, false)}
                      className={`${styles.counterButton} ${group.count === 0 ? styles.counterButtonDisabled : ''}`}
                      disabled={group.count === 0}
                    >
                      <Minus size={16} />
                    </button>
                    <span className={styles.counterValue}>{group.count}</span>
                    <button
                      onClick={() => updateTravelerCount(index, true)}
                      className={styles.counterButton}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}

              <div className={styles.totalTravelers}>
                <span>Total Travelers: {getTotalTravelers()}</span>
              </div>
            </div>
          </>
        ) : currentStep === 6 ? (
          <>
            {/* Step 6: Stay preferences */}
            <h1 className={styles.title}>Where would you like to stay?</h1>

            <div className={styles.staysSection}>
              <div className={styles.stayOptions}>
                {stayOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedStayType(option.id)}
                    className={`${styles.stayOption} ${selectedStayType === option.id ? styles.stayOptionActive : ''}`}
                  >
                    <div className={styles.stayIcon}>{option.icon}</div>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>

              <div className={styles.priceRangeSection}>
                <label className={styles.label}>
                  Budget Range
                </label>
                
                <div className={styles.priceRangeControls}>
                  <div className={styles.priceTrack}></div>
                  <div 
                    className={styles.priceRange} 
                    style={{
                      left: `${(priceRange[0] / 4) * 100}%`,
                      width: `${((priceRange[1] - priceRange[0]) / 4) * 100}%`
                    }}
                  ></div>
                  
                  <div className={styles.priceDots}>
                    {[0, 1, 2, 3, 4].map((value) => (
                      <div
                        key={value}
                        className={`${styles.priceDot} ${
                          value >= priceRange[0] && value <= priceRange[1] ? styles.priceDotActive : ''
                        }`}
                      />
                    ))}
                  </div>
                  
                  <input
                    type="range"
                    min={0}
                    max={4}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(0, Number(e.target.value))}
                    className={styles.priceSlider}
                  />
                  <input
                    type="range"
                    min={0}
                    max={4}
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(1, Number(e.target.value))}
                    className={`${styles.priceSlider} ${styles.priceSliderUpper}`}
                  />
                </div>

                <div className={styles.priceLabels}>
                  {['Free', '$', '$$', '$$$', '$$$$'].map((label, index) => (
                    <span
                      key={label}
                      className={styles.priceLabel}
                      style={{ left: `${(index / 4) * 100}%` }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : currentStep === 7 ? (
          <>
            {/* Step 7: Food preferences */}
            <h1 className={styles.title}>What are your dining preferences?</h1>
        
            <div className={styles.foodSection}>
              <div className={styles.foodOptions}>
                {foodOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedFoodType(option.id)}
                    className={`${styles.foodOption} ${selectedFoodType === option.id ? styles.foodOptionActive : ''}`}
                  >
                    <div className={styles.foodIcon}>{option.icon}</div>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
        
              <div className={styles.priceRangeSection}>
                <label className={styles.label}>
                  Budget Range
                </label>
                
                <div className={styles.priceRangeControls}>
                  <div className={styles.priceTrack}></div>
                  <div 
                    className={styles.priceRange} 
                    style={{
                      left: `${(foodPriceRange[0] / 3) * 100}%`,
                      width: `${((foodPriceRange[1] - foodPriceRange[0]) / 3) * 100}%`
                    }}
                  ></div>
                  
                  <div className={styles.priceDots}>
                    {[0, 1, 2, 3].map((value) => (
                      <div
                        key={value}
                        className={`${styles.priceDot} ${
                          value >= foodPriceRange[0] && value <= foodPriceRange[1] ? styles.priceDotActive : ''
                        }`}
                      />
                    ))}
                  </div>
                  
                  <input
                    type="range"
                    min={0}
                    max={3}
                    value={foodPriceRange[0]}
                    onChange={(e) => handleFoodPriceRangeChange(0, Number(e.target.value))}
                    className={styles.priceSlider}
                  />
                  <input
                    type="range"
                    min={0}
                    max={3}
                    value={foodPriceRange[1]}
                    onChange={(e) => handleFoodPriceRangeChange(1, Number(e.target.value))}
                    className={`${styles.priceSlider} ${styles.priceSliderUpper}`}
                  />
                </div>
        
                <div className={styles.priceLabels}>
                  {['$', '$$', '$$$', '$$$$'].map((label, index) => (
                    <span
                      key={label}
                      className={styles.priceLabel}
                      style={{ left: `${(index / 3) * 100}%` }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : currentStep === 8 ? (
          <>
            {/* Step 8: Activity preferences */}
            <h1 className={styles.title}>What kind of activities do you want to do?</h1>
        
            <div className={styles.activitiesSection}>
              <div className={styles.activityOptions}>
                {activityOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => toggleActivity(option.id)}
                    className={`${styles.activityOption} ${
                      selectedActivities.includes(option.id) ? styles.activityOptionActive : ''
                    }`}
                  >
                    <div className={styles.activityIcon}>{option.icon}</div>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
        
              <div className={styles.customActivitySection}>
                <label className={styles.label}>
                  Add Your Own Activities
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    value={customActivity}
                    onChange={handleCustomActivityInput}
                    onKeyDown={handleCustomActivityKeyDown}
                    onBlur={() => {
                      // Delay hiding suggestions to allow for clicks
                      setTimeout(() => setShowSuggestions(false), 200);
                    }}
                    onFocus={() => {
                      if (customActivity.trim()) {
                        setShowSuggestions(true);
                      }
                    }}
                    placeholder="Type an activity (e.g., 'Snowboarding')"
                    className={styles.input}
                  />
                  <button
                    onClick={addCustomActivity}
                    className={styles.addActivityButton}
                    disabled={!customActivity.trim()}
                  >
                    <PlusIcon size={20} />
                  </button>
                  
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className={styles.suggestionsDropdown}>
                      {filteredSuggestions.map((suggestion) => (
                        <button
                          key={suggestion}
                          className={styles.suggestionItem}
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {userActivities.length > 0 && (
                  <div className={styles.userActivities}>
                    <label className={styles.label}>Your Added Activities:</label>
                    <div className={styles.activityTags}>
                      {userActivities.map((activity) => (
                        <div key={activity} className={styles.activityTag}>
                          <span>{activity}</span>
                          <button
                            onClick={() => removeCustomActivity(activity)}
                            className={styles.removeActivityButton}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
        
              <div className={styles.priceRangeSection}>
                <label className={styles.label}>
                  Activities Budget Range
                </label>
                
                <div className={styles.priceRangeControls}>
                  <div className={styles.priceTrack}></div>
                  <div 
                    className={styles.priceRange} 
                    style={{
                      left: `${(activityPriceRange[0] / 4) * 100}%`,
                      width: `${((activityPriceRange[1] - activityPriceRange[0]) / 4) * 100}%`
                    }}
                  ></div>
                  
                  <div className={styles.priceDots}>
                    {[0, 1, 2, 3, 4].map((value) => (
                      <div
                        key={value}
                        className={`${styles.priceDot} ${
                          value >= activityPriceRange[0] && value <= activityPriceRange[1] ? styles.priceDotActive : ''
                        }`}
                      />
                    ))}
                  </div>
                  
                  <input
                    type="range"
                    min={0}
                    max={4}
                    value={activityPriceRange[0]}
                    onChange={(e) => handleActivityPriceRangeChange(0, Number(e.target.value))}
                    className={styles.priceSlider}
                  />
                  <input
                    type="range"
                    min={0}
                    max={4}
                    value={activityPriceRange[1]}
                    onChange={(e) => handleActivityPriceRangeChange(1, Number(e.target.value))}
                    className={`${styles.priceSlider} ${styles.priceSliderUpper}`}
                  />
                </div>
        
                <div className={styles.priceLabels}>
                  {['Free', '$', '$$', '$$$', '$$$$'].map((label, index) => (
                    <span
                      key={label}
                      className={styles.priceLabel}
                      style={{ left: `${(index / 4) * 100}%` }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Step 9: Additional information */}
            <h1 className={styles.title}>Any additional information?</h1>
        
            <div className={styles.additionalInfoSection}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Additional Information
                  <span className={styles.optional}> (Optional)</span>
                </label>
                <div className={styles.textareaWrapper}>
                  <textarea
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder="Share any other preferences, requirements, or information that might help us plan your perfect trip..."
                    className={styles.textarea}
                    rows={6}
                  />
                </div>
                <p className={styles.hint}>
                  Examples: accessibility requirements, specific attractions you'd like to visit,
                  preferred travel pace, specific dates you'd like to reach certain locations, etc.
                </p>
              </div>
            </div>
          </>
        )}

        {/* Display error message if any */}
        {error && (
          <p className={styles.error}>{error}</p>
        )}

        {/* Navigation buttons */}
        <div className={styles.buttonGroup}>
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className={styles.backButton}
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className={styles.nextButton}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

export default RouteQuestions;