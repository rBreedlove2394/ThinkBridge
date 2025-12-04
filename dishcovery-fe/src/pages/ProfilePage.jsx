import React from 'react';
import { useEffect, useRef } from 'react';

const dietaryOptions = ['None', 'Vegetarian', 'Vegan', 'Gluten-free'];
const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];
const servingSizes = ['1 person', '2 people', '4 people', '6 people'];

export const ProfilePage = ({
  profile,
  onChange,
  onCancel,
  onSave,
  saving,
  status,
  editableFields = {},
  onEnableEdit = () => {},
}) => {
  const inputRefs = useRef({});

  useEffect(() => {
    Object.entries(editableFields).forEach(([field, isEditable]) => {
      if (isEditable) {
        inputRefs.current[field]?.focus();
      }
    });
  }, [editableFields]);

  return (
    <div className="profile-page">
      <h1 className="profile-title">Profile</h1>

      <section className="profile-main">
        {/* Left: avatar */}
        <div className="profile-avatar-wrapper">
          <img
            className="profile-avatar"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80"
            alt="User avatar"
          />
        </div>

        {/* Middle: name / email fields */}
        <div className="profile-form">
          {/* First name */}
          <div className="profile-input-group">
            <label className="profile-input-label" htmlFor="firstName">
              First Name
            </label>
            <div className="profile-input-pill">
              <input
                id="firstName"
                type="text"
                value={profile.firstName}
                readOnly={!editableFields.firstName}
                ref={(el) => {
                  inputRefs.current.firstName = el;
                }}
                onChange={(e) => onChange('firstName', e.target.value)}
              />
              <button
                type="button"
                className="profile-input-icon"
                onClick={() => onEnableEdit('firstName')}
                aria-label="Edit first name"
              >
                ✎
              </button>
            </div>
          </div>

          {/* Last name */}
          <div className="profile-input-group">
            <label className="profile-input-label" htmlFor="lastName">
              Last Name
            </label>
            <div className="profile-input-pill">
              <input
                id="lastName"
                type="text"
                value={profile.lastName}
                readOnly={!editableFields.lastName}
                ref={(el) => {
                  inputRefs.current.lastName = el;
                }}
                onChange={(e) => onChange('lastName', e.target.value)}
              />
              <button
                type="button"
                className="profile-input-icon"
                onClick={() => onEnableEdit('lastName')}
                aria-label="Edit last name"
              >
                ✎
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="profile-input-group">
            <label className="profile-input-label" htmlFor="email">
              Email
            </label>
            <div className="profile-input-pill">
              <input
                id="email"
                type="email"
                value={profile.email}
                readOnly={!editableFields.email}
                ref={(el) => {
                  inputRefs.current.email = el;
                }}
                onChange={(e) => onChange('email', e.target.value)}
              />
              <button
                type="button"
                className="profile-input-icon"
                onClick={() => onEnableEdit('email')}
                aria-label="Edit email"
              >
                ✎
              </button>
            </div>
          </div>
        </div>

        {/* Right: preference selects */}
        <div className="profile-preferences">
          <div className="profile-preference-group">
            <p className="profile-preference-label">Edit Dietary Options</p>
            <div className="profile-select-pill">
              <select
                value={profile.dietaryOption}
                onChange={(e) => onChange('dietaryOption', e.target.value)}
              >
                <option value="">Dietary options</option>
                {dietaryOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="profile-preference-group">
            <p className="profile-preference-label">Edit skill level</p>
            <div className="profile-select-pill">
              <select
                value={profile.skillLevel}
                onChange={(e) => onChange('skillLevel', e.target.value)}
              >
                <option value="">Skill level</option>
                {skillLevels.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="profile-preference-group">
            <p className="profile-preference-label">Serving size</p>
            <div className="profile-select-pill">
              <select
                value={profile.servingSize}
                onChange={(e) => onChange('servingSize', e.target.value)}
              >
                <option value="">Serving size</option>
                {servingSizes.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom buttons */}
      <section className="profile-actions">
        <button
          type="button"
          className="btn-dark profile-btn-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn-dark profile-btn-primary"
          onClick={onSave}
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </section>

      {status && <p className="profile-status">{status}</p>}
    </div>
  );
};
