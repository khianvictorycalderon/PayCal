export default function generateUniqueID (length = 9, existingIDs: string[]): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  const generate = () => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  let newID = generate();
  while (existingIDs.includes(newID)) {
    newID = generate();
  }

  return newID;
};