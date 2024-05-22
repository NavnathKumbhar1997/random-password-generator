// Function to generate a random password
export function generatePassword(length, includeNumbers, includeAlphabets, includeSpecialChars) {
    // Define character sets
    const numbers = '0123456789';
    const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    // Initialize character pool
    let characterPool = '';
    // Add numbers to character pool if includeNumbers is true
    if (includeNumbers) characterPool += numbers;
    // Add alphabets to character pool if includeAlphabets is true
    if (includeAlphabets) characterPool += alphabets;
    // Add special characters to character pool if includeSpecialChars is true
    if (includeSpecialChars) characterPool += specialChars;
  
    // If character pool is empty, return an empty string
    if (characterPool === '') return '';
  
    // Initialize password
    let password = '';
    // Generate random password based on the character pool and specified length
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      password += characterPool[randomIndex];
    }
  
    return password; // Return the generated password
  }
