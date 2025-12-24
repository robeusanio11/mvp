// Average damage dealt to champions by rank
// Source: Extrapolated from LeagueOfLegendsTools.com skill-based averages
// (Beginner: 12k, Average: 16.5k, Good: 21k, Pro: 25k)
// Last Updated: December 23, 2025

const DamageDealtAverages = {
  lastUpdated: '2025-12-23',
  ranks: [
    {
      // Iron
      totalDamageDealt: 12000,
      magicDamageDealt: 5000,
      physicalDamageDealt: 7000,
    },
    {
      // Bronze
      totalDamageDealt: 14000,
      magicDamageDealt: 5800,
      physicalDamageDealt: 8200,
    },
    {
      // Silver
      totalDamageDealt: 16500,
      magicDamageDealt: 6900,
      physicalDamageDealt: 9600,
    },
    {
      // Gold
      totalDamageDealt: 18500,
      magicDamageDealt: 7700,
      physicalDamageDealt: 10800,
    },
    {
      // Platinum
      totalDamageDealt: 20000,
      magicDamageDealt: 8300,
      physicalDamageDealt: 11700,
    },
    {
      // Emerald
      totalDamageDealt: 21500,
      magicDamageDealt: 9000,
      physicalDamageDealt: 12500,
    },
    {
      // Diamond
      totalDamageDealt: 23000,
      magicDamageDealt: 9600,
      physicalDamageDealt: 13400,
    },
    {
      // Master
      totalDamageDealt: 24000,
      magicDamageDealt: 10000,
      physicalDamageDealt: 14000,
    },
    {
      // Grandmaster
      totalDamageDealt: 24500,
      magicDamageDealt: 10200,
      physicalDamageDealt: 14300,
    },
    {
      // Challenger
      totalDamageDealt: 25000,
      magicDamageDealt: 10400,
      physicalDamageDealt: 14600,
    },
  ],
};

export default DamageDealtAverages;
