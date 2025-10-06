function getNextId() {
    const counterRef = firebase.database().ref('globalCounters/myIdCounter');
    return counterRef.transaction((currentId) => {
      return (currentId || 0) + 1; // Increment or initialize to 1
    }).then((transactionResult) => {
      if (transactionResult.committed) {
        return transactionResult.snapshot.val(); // Return the new ID
      } else {
        // Transaction was aborted, handle accordingly (e.g., retry)
        console.log("Transaction aborted, retrying...");
        return getNextId(); // Retry the transaction
      }
    });
  }
  
  // Example usage:
  getNextId().then((newId) => {
    console.log('New ID:', newId);
    firebase.database().ref(`items/${newId}`).set({
      name: `Item ${newId}`
    });
  });