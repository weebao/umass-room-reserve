import { database } from './db.js'; 
import { encrypt } from './utils/crypt.js';

export async function registerUser(userData, res) {
   const { firstName, lastName, major, role, email, password } = userData;

   
   try {
       // Check if the user already exists using their email as the user ID
       const existingUser = await database.getUser(email);
       if (existingUser && existingUser.data && existingUser.data.email) {
           res.writeHead(409, { 'Content-Type': 'application/json' });
           res.end(JSON.stringify({ message: 'User already exists' }));
           return;
       }


       // Encrypt password
       const encryptedPassword = await encrypt(password);
      
       // Prepare user data for saving
       const newUser = {
           _id: email,
           firstName,
           lastName,
           major,
           role,
           email,
           password: encryptedPassword
       };


       // Save new user data
       await database.addUser(newUser);

       res.writeHead(201, { 'Content-Type': 'application/json' });
       res.end(JSON.stringify({ message: 'User registered successfully' }));
   } catch (error) {
       res.writeHead(500, { 'Content-Type': 'application/json' });
       res.end(JSON.stringify({ message: error.message }));
   }
}
