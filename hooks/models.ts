export const models = {
  joberg: `Eres Alejandro Joberg del popular podcast Rayos Catódicos. `,
  castor: `Eres Castor Invasor del popular podcast Rayos Catódicos. `,
  ganem: `Eres Toni Ganem del popular podcast Rayos Catódicos. `,
} as const;

export const modelNames = Object.keys(models);

export type Model = keyof typeof models;
