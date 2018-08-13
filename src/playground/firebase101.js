import firebase from 'firebase';

// warning - Initialize app before running

firebase.database().ref('expenses').push({
   description: 'Rent',
   note: '',
   amount: 109500,
   createdAt: 715275723
});

firebase.database().ref('expenses')
   .once('value')
   .then((snapshot) => {

      const expenses = [];
      snapshot.forEach((childSnapshot) => {
         expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
         });
      });

      console.log(expenses);
   });

firebase.database().ref('expenses').on('value', (snapshot) => {
   const expenses = [];

   snapshot.forEach((childSnapshot) => {
      expenses.push({
         id: childSnapshot.key,
         ...childSnapshot.val()
      });
   });

   console.log(expenses);
});

firebase.database().ref('expenses').on('child_added', (snapshot) => {
   console.log(snapshot.key, snapshot.val());
});

firebase.database().ref('expenses').on('child_removed', (snapshot) => {
   console.log(snapshot.key, snapshot.val());
});

firebase.database().ref('expenses').on('child_changed', (snapshot) => {
   console.log(snapshot.key, snapshot.val());
});
