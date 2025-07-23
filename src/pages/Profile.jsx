import React, { useEffect, useState } from 'react';
import './CSS/Profile.css';

const API_BASE = 'https://quickpick-backend-6hkt.onrender.com/api/auth';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(data);
        setForm({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || ''
        });
      } else {
        setMessage(data.message || 'Failed to load profile.');
      }
    } catch (err) {
      setMessage('Network error.');
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          address: form.address
        })
      });
      const data = await res.json();
      if (res.ok) {
        setProfile(data);
        setEditMode(false);
        setMessage('Profile updated!');
        localStorage.setItem('currentUser', JSON.stringify(data));
        window.location.reload(); // Reload to update user info everywhere
      } else {
        setMessage(data.message || 'Update failed.');
      }
    } catch {
      setMessage('Network error.');
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <form key={editMode ? 'edit' : 'view'} className="profile-form" onSubmit={handleSave}>
        <div className="profile-field">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={!editMode}
            required
          />
        </div>
        <div className="profile-field">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            disabled
          />
        </div>
        <div className="profile-field">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div className="profile-field">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div className="profile-actions">
          {editMode ? (
            <>
              <button type="submit" className="profile-btn">Save</button>
              <button type="button" className="profile-btn profile-btn-cancel" onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <button type="button" className="profile-btn" onClick={() => { console.log('Edit clicked'); setEditMode(true); }}>Edit Profile</button>
          )}
        </div>
        {message && <div className="profile-message">{message}</div>}
      </form>
    </div>
  );
} 