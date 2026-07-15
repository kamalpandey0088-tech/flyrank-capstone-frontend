import React, { useState } from 'react';

const DEFAULT_SETTINGS = {
    theme: 'system',
    notifications: true,
    emailUpdates: false,
    refreshInterval: '10',
    language: 'en',
};

function SettingsForm({ initialSettings = DEFAULT_SETTINGS, onSave, onCancel }) {
    const [settings, setSettings] = useState({ ...DEFAULT_SETTINGS, ...initialSettings });
    const [saved, setSaved] = useState(false);

    const handleChange = (event) => {
        const { name, type, value, checked } = event.target;
        setSettings((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        setSaved(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (onSave) {
            onSave(settings);
        }
        setSaved(true);
    };

    const handleCancel = () => {
        setSettings({ ...DEFAULT_SETTINGS, ...initialSettings });
        setSaved(false);
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <form className="settings-form" onSubmit={handleSubmit}>
            <h2>App Settings</h2>

            <label className="form-field">
                Theme
                <select name="theme" value={settings.theme} onChange={handleChange}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                </select>
            </label>

            <label className="form-field checkbox-field">
                <input
                    type="checkbox"
                    name="notifications"
                    checked={settings.notifications}
                    onChange={handleChange}
                />
                Enable notifications
            </label>

            <label className="form-field checkbox-field">
                <input
                    type="checkbox"
                    name="emailUpdates"
                    checked={settings.emailUpdates}
                    onChange={handleChange}
                />
                Receive email updates
            </label>

            <label className="form-field">
                Refresh interval
                <select name="refreshInterval" value={settings.refreshInterval} onChange={handleChange}>
                    <option value="5">Every 5 minutes</option>
                    <option value="10">Every 10 minutes</option>
                    <option value="15">Every 15 minutes</option>
                    <option value="30">Every 30 minutes</option>
                </select>
            </label>

            <label className="form-field">
                Language
                <select name="language" value={settings.language} onChange={handleChange}>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                </select>
            </label>

            <div className="form-actions">
                <button type="submit">Save Settings</button>
                <button type="button" onClick={handleCancel} className="secondary">
                    Cancel
                </button>
            </div>

            {saved && <p className="saved-message">Settings saved successfully.</p>}
        </form>
    );
}

export default SettingsForm;
