import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ProfilePage } from '../pages/ProfilePage';

const STORAGE_KEY = 'dishcovery_profiles';

const readProfiles = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const writeProfiles = (profiles) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
};

export const ProfileContainer = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser } = useAuth();

  const fallbackProfile = useMemo(
    () => ({
      firstName: user?.name?.split(' ')?.[0] || '',
      lastName: user?.name?.split(' ')?.slice(1).join(' ') || '',
      email: user?.email || '',
      dietaryOption: '',
      skillLevel: '',
      servingSize: '',
    }),
    [user]
  );

  const [profile, setProfile] = useState(fallbackProfile);
  const [initialProfile, setInitialProfile] = useState(fallbackProfile);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [editableFields, setEditableFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const profiles = readProfiles();
    const email = user?.email?.toLowerCase();
    const stored = email ? profiles[email] : null;
    const hydrated = stored || fallbackProfile;
    setProfile(hydrated);
    setInitialProfile(hydrated);
    setEditableFields({
      firstName: false,
      lastName: false,
      email: false,
    });
  }, [fallbackProfile, isAuthenticated, navigate, user]);

  const handleChange = (field, value) => {
    setStatus('');
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setStatus('');
    setProfile(initialProfile);
    setEditableFields({
      firstName: false,
      lastName: false,
      email: false,
    });
  };

  const handleSave = async () => {
    const trimmedEmail = (profile.email || '').trim();

    if (!trimmedEmail) {
      setStatus('Email is required.');
      return;
    }

    setSaving(true);
    setStatus('');

    const profiles = readProfiles();
    const prevEmailKey =
      (initialProfile.email || user?.email || '').trim().toLowerCase();
    const nextEmailKey = trimmedEmail.toLowerCase();

    if (prevEmailKey && prevEmailKey !== nextEmailKey) {
      delete profiles[prevEmailKey];
    }

    const nextProfile = { ...profile, email: trimmedEmail };
    profiles[nextEmailKey] = nextProfile;
    writeProfiles(profiles);

    // Update navbar/user display name immediately, including email changes
    const updatedName =
      `${nextProfile.firstName || ''} ${nextProfile.lastName || ''}`.trim() ||
      nextProfile.email;
    updateUser({
      name: updatedName,
      email: nextProfile.email,
    });

    setInitialProfile(nextProfile);
    setProfile(nextProfile);
    setEditableFields({
      firstName: false,
      lastName: false,
      email: false,
    });
    setStatus('Profile saved');
    setSaving(false);
  };

  const handleEnableEdit = (field) => {
    setEditableFields((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <ProfilePage
      profile={profile}
      onChange={handleChange}
      onCancel={handleCancel}
      onSave={handleSave}
      saving={saving}
      status={status}
      editableFields={editableFields}
      onEnableEdit={handleEnableEdit}
    />
  );
};
