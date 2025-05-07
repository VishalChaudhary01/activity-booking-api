import { Activity } from '../models/activity.model';

const activities = [
  {
    title: 'Cricket Match',
    description: 'Local T20 match at the stadium',
    location: 'New Delhi',
    date: new Date('2025-06-15T16:00:00'),
  },
  {
    title: 'Movie Night',
    description: 'Watching Inception at the community hall',
    location: 'Mumbai',
    date: new Date('2025-06-20T19:00:00'),
  },
  {
    title: 'Football Match',
    description: 'Inter-school tournament final',
    location: 'Bangalore',
    date: new Date('2025-06-25T15:30:00'),
  },
];

export const seedActivities = async () => {
  try {
    const count = await Activity.countDocuments();
    if (count > 0) {
      console.log('Skip seeding,Activities already present.');
      return;
    }

    await Activity.insertMany(activities);
    console.log('✅ Activities seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};
