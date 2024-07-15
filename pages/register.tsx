import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { DATABASE_ID, CONSUMER_COLLECTION_ID, users, databases } from '../lib/appwrite.config';

const CreateUserPage: React.FC = () => {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [createon, setCreateon] = useState(new Date().toISOString());
  const [bookings, setBookings] = useState<string[]>([]);
  const [userType, setUserType] = useState<'Consumer'>('Consumer');
  const [profileImg, setProfileImg] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isUserCreated, setIsUserCreated] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Creating new user auth on Appwrite
      const newUser = await users.create('unique()', email, phone, password, name);
      // users.updatePhone(newUser.$id, phone);
      await users.updateLabels(newUser.$id, [userType]);

      // Creating new consumer document in Appwrite
      const consumer = await databases.createDocument(
        'DATABASE_ID',//DBID
        'CONSUMER_COLLECTION_ID',//Collection ID
        'unique()', 
        {
          userId: newUser.$id,
          email,
          phone,
          name,
          address,
          city,
          state,
          zipcode,
          createon,
          bookings,
          userType,
          profileImg,
        }
      );

      setMessage(`User ${newUser.name} created successfully with consumer data`);
      setIsUserCreated(true);
    } catch (error:any) {
      console.error('Error creating user or consumer:', error);
      console.log(error.code+":"+error.type);
      setMessage('Error creating user or consumer');
    }
  };

  const handleGoBack = () => {
    router.push('/');
  };

  return (
    <div>
      <h1>Create New User Account</h1>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label htmlFor="userId">UserName <span style={{ color: 'red' }}>*</span>:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div> */}
        <div>
          <label htmlFor="email"><span style={{ color: 'red' }}>*</span>Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password"><span style={{ color: 'red' }}>*</span>Password :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone"><span style={{ color: 'red' }}>*</span>Phone :</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name"><span style={{ color: 'red' }}>*</span>Name :</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address :</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="city">City :</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="state">State :</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="zipcode">Zipcode :</label>
          <input
            type="text"
            id="zipcode"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="profileImg">Profile Image URL :</label>
          <input
            type="url"
            id="profileImg"
            value={profileImg}
            onChange={(e) => setProfileImg(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="userType">User Type :</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value as 'Consumer')}
            required
          >
            <option value="Consumer">Consumer</option>
            {/* <option value="Provider">Provider</option>
            <option value="Admin">Admin</option> */}
          </select>
        </div>

        {!isUserCreated && <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600" type="submit">Create User</button>}
      </form>
      {message && <p>{message}</p>}
      <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={handleGoBack}>Go Back to Login Page</button>
    </div>
  );
};

export default CreateUserPage;