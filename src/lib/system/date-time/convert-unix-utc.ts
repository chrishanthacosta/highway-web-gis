

export const convertUnixToUtc = (unixtime: number) :string=> {
const dateObject = new Date(unixtime );

//   const dateString = dateObject.toDateString(); // Example: 9/26/2023
//   const timeString = dateObject.toTimeString(); // Example: 3:47:51 PM
  const dateString = dateObject.toLocaleDateString(); // Example: 9/26/2023
  const timeString = dateObject.toLocaleTimeString(); // Example: 3:47:51 PM
// let utcString = dateObject.toUTCString();
    return dateString + "-" + timeString
}