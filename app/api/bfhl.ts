import type { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '../lib/firebase';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';


type Data = {
  is_success: boolean;
  user_id: string;
  email?: string;
  roll_number?: string;
  numbers?: string[];
  alphabets?: string[];
  highest_lowercase_alphabet?: string;
  file_valid?: boolean;
  file_mime_type?: string;
  file_size_kb?: string;
};

const parseData = (data: string[]) => {
  const numbers = data.filter((item) => !isNaN(Number(item)));
  const alphabets = data.filter((item) => /^[A-Za-z]+$/.test(item));
  const highest_lowercase_alphabet = alphabets
    .filter((ch) => ch === ch.toLowerCase())
    .sort()
    .pop();
  return { numbers, alphabets, highest_lowercase_alphabet };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { data, file_b64, email, roll_number } = req.body;
    const user_id = "john_doe_17091999"; // Replace with dynamic user_id format (fullname_dob)
    const { numbers, alphabets, highest_lowercase_alphabet } = parseData(data);

    let file_valid = false;
    let file_mime_type = '';
    let file_size_kb = '';

    if (file_b64) {
        try {
          const fileData = file_b64.replace(/^data:.+;base64,/, '');  // Remove base64 prefix
      
          // Create a reference in Firebase Storage
          const storageRef = ref(storage, `uploads/${user_id}`);
          
          // Upload the base64 string
          const snapshot = await uploadString(storageRef, fileData, 'base64');
          
          // Get the download URL of the uploaded file (optional if needed)
          const fileURL = await getDownloadURL(snapshot.ref);
      
          // You can decide whether you need this URL or not
          file_valid = true;
          // Remove file_mime_type and file_size_kb since you're no longer retrieving metadata
          file_mime_type = ''; 
          file_size_kb = ''; 
      
        } catch (error) {
          console.error('File upload failed:', error);
          file_valid = false;  // Mark the file as invalid in case of an error
        }
    } else {
        console.log('No file provided');
    }

    res.status(200).json({
      is_success: true,
      user_id,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_lowercase_alphabet,
      file_valid,
      file_mime_type,
      file_size_kb,
    });
  } else if (req.method === 'GET') {
    res.status(200).json({
      is_success: true,
      user_id: 'operation_code_1', // Hardcoded as per instructions
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}