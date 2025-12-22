
export const generateNanoId = (length = 50) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const timestamp = Date.now().toString(36); 
  let randomStr = '';
  const remainingLength = length - timestamp.length - 1;

  for (let i = 0; i < remainingLength; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${timestamp}_${randomStr}`;
};