export default function getCurrentTimestamp() {
    const now = new Date();
  
    // Get the components of the date and time
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();
  
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    // Format the timestamp
    const formattedTimestamp = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    
    return formattedTimestamp;
}