const os = require('os');

function getMacAddress() {
  const networkInterfaces = os.networkInterfaces();
  const macAddresses = {};

  // Loop through all network interfaces
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    
    // Find the interface with a valid MAC address (non-internal)
    for (const iface of interfaces) {
      if (iface.mac && iface.mac !== '00:00:00:00:00:00') {
        macAddresses[interfaceName] = iface.mac;
      }
    }
  }

  return macAddresses;
}

const macs = getMacAddress();
console.log('MAC Addresses:', macs);








////////


// npm install getmac


// const getmac = require('getmac');

// // Get a single, reliable MAC address
// const mac = getmac.default();
// console.log('MAC Address:', mac);

// // Or, use the promise-based version
// getmac.getMac().then((macAddress) => {
//   console.log('MAC Address:', macAddress);
// });






///

const os = require('os');

console.log('OS Platform:', os.platform());
console.log('Hostname:', os.hostname());
console.log('User Info:', os.userInfo());
console.log('Home Directory:', os.homedir());










