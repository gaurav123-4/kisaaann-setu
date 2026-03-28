import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { AgriContent } from '../models/AgriContent.js';
import { ClimateAlert } from '../models/ClimateAlert.js';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kisan_setu';

async function seed() {
  await mongoose.connect(uri);

  if ((await AgriContent.countDocuments()) === 0) {
    await AgriContent.insertMany([
      {
        type: 'scheme',
        title: 'PM-KISAN (sample)',
        body: 'Direct income support for landholding farmers — check eligibility at official portal or CSC.',
        regionTags: [],
        priority: 2,
      },
      {
        type: 'tip',
        title: 'Soil moisture in erratic rain',
        body: 'Use mulching and short-duration varieties; prefer sowing close to forecast rain window.',
        regionTags: ['Siddharthnagar', 'Balrampur'],
        priority: 1,
      },
      {
        type: 'bulletin',
        title: 'Organic matter build-up',
        body: 'Farmyard manure, compost, and green manuring improve water holding and reduce fertilizer need.',
        regionTags: [],
        priority: 0,
      },
    ]);
    console.log('Inserted sample AgriContent.');
  } else {
    console.log('AgriContent already present, skipping content seed.');
  }

  if ((await ClimateAlert.countDocuments()) === 0) {
    await ClimateAlert.insertMany([
      {
        district: 'Siddharthnagar',
        severity: 'watch',
        title: 'Heat stress watch (sample)',
        body: 'Day temperatures may stress flowering crops; prefer morning irrigation and mulching where possible.',
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      {
        district: 'Balrampur',
        severity: 'info',
        title: 'Rainfall variability (sample)',
        body: 'Plan drainage for intense spells and protective irrigation for dry gaps.',
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    ]);
    console.log('Inserted sample ClimateAlert.');
  } else {
    console.log('ClimateAlert already present, skipping alert seed.');
  }

  await mongoose.disconnect();
  console.log('Seed finished.');
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
