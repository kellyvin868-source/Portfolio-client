import { useState } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';

export default function ProfilePage() {
  const { admin, setAdmin } = useAuth();
  const [form, setForm] = useState({
    email:    admin?.email                  || '',
    bio:      admin?.bio                    || '',
    github:   admin?.socialLinks?.github    || '',
    linkedin: admin?.socialLinks?.linkedin  || '',
    twitter:  admin?.socialLinks?.twitter   || '',
  });
  const [imgFile, setImgFile]       = useState(null);
  const [imgPreview, setImgPreview] = useState(admin?.profileImage || '');
  const [profileStatus, setProfileStatus] = useState({ msg: '', type: '' });
  const [pwForm, setPwForm]   = useState({ currentPassword: '', newPassword: '' });
  const [pwStatus, setPwStatus] = useState({ msg: '', type: '' });
  const [saving, setSaving]     = useState(false);
  const [savingPw, setSavingPw] = useState(false);

  const inp = 'w-full bg-[#0f0f24] border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-[#8888aa] focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-sm';

  const handleImg = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setImgFile(f);
    if (imgPreview.startsWith('blob:')) URL.revokeObjectURL(imgPreview);
    setImgPreview(URL.createObjectURL(f));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setProfileStatus({ msg: 'Invalid email address', type: 'error' }); return;
    }
    setSaving(true); setProfileStatus({ msg: '', type: '' });
    const fd = new FormData();
    fd.append('email', form.email);
    fd.append('bio',   form.bio);
    fd.append('socialLinks', JSON.stringify({ github: form.github, linkedin: form.linkedin, twitter: form.twitter }));
    if (imgFile) fd.append('profileImage', imgFile);
    try {
      const { data } = await api.put('/api/auth/profile', fd);
      setAdmin(data);
      if (data.profileImage) setImgPreview(data.profileImage);
      setImgFile(null);
      setProfileStatus({ msg: '✓ Profile updated successfully', type: 'success' });
    } catch (err) {
      setProfileStatus({ msg: err.response?.data?.message || 'Failed to update profile', type: 'error' });
    }
    setSaving(false);
  };

  const savePassword = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword.length < 6) {
      setPwStatus({ msg: 'Password must be at least 6 characters', type: 'error' }); return;
    }
    setSavingPw(true); setPwStatus({ msg: '', type: '' });
    try {
      const { data } = await api.put('/api/auth/change-password', pwForm);
      setPwStatus({ msg: data.message, type: 'success' });
      setPwForm({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setPwStatus({ msg: err.response?.data?.message || 'Failed to update password', type: 'error' });
    }
    setSavingPw(false);
  };

  return (
    <div className="max-w-xl">
      <form onSubmit={saveProfile} className="space-y-4 mb-10">
        <div className="flex items-center gap-5 mb-2">
          {imgPreview
            ? <img src={imgPreview} alt="avatar" className="w-20 h-20 rounded-full object-cover border-2 border-violet-500" />
            : <div className="w-20 h-20 rounded-full bg-[#12122a] border-2 border-violet-500 flex items-center justify-center text-3xl text-violet-400"><i className="fas fa-user" /></div>
          }
          <label className="inline-flex items-center gap-2 text-sm text-violet-400 border border-dashed border-violet-500/40 px-4 py-2 rounded-xl cursor-pointer hover:bg-violet-900/10 transition-all">
            <i className="fas fa-camera" /> Change Photo
            <input type="file" accept="image/*" className="hidden" onChange={handleImg} />
          </label>
        </div>
        <div><label className="block text-xs text-[#8888aa] mb-1.5">Email</label><input type="email" className={inp} value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
        <div><label className="block text-xs text-[#8888aa] mb-1.5">Bio</label><textarea className={`${inp} resize-y`} rows={4} placeholder="Tell visitors about yourself..." value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} /></div>
        <div><label className="block text-xs text-[#8888aa] mb-1.5">GitHub URL</label><input type="url" className={inp} placeholder="https://github.com/..." value={form.github} onChange={e => setForm({...form, github: e.target.value})} /></div>
        <div><label className="block text-xs text-[#8888aa] mb-1.5">LinkedIn URL</label><input type="url" className={inp} placeholder="https://linkedin.com/in/..." value={form.linkedin} onChange={e => setForm({...form, linkedin: e.target.value})} /></div>
        <div><label className="block text-xs text-[#8888aa] mb-1.5">Twitter URL</label><input type="url" className={inp} placeholder="https://twitter.com/..." value={form.twitter} onChange={e => setForm({...form, twitter: e.target.value})} /></div>
        <button type="submit" disabled={saving} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-bg text-white text-sm font-semibold hover:-translate-y-0.5 transition-all disabled:opacity-60">
          {saving ? <><i className="fas fa-spinner fa-spin" /> Saving...</> : <><i className="fas fa-save" /> Save Profile</>}
        </button>
        {profileStatus.msg && <p className={`text-sm ${profileStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{profileStatus.msg}</p>}
      </form>

      <hr className="border-white/5 mb-8" />

      <h3 className="font-bold text-lg mb-4">Change Password</h3>
      <form onSubmit={savePassword} className="space-y-4">
        <div><label className="block text-xs text-[#8888aa] mb-1.5">Current Password</label><input type="password" className={inp} value={pwForm.currentPassword} onChange={e => setPwForm({...pwForm, currentPassword: e.target.value})} required /></div>
        <div><label className="block text-xs text-[#8888aa] mb-1.5">New Password <span className="text-[#555577]">(min 6 characters)</span></label><input type="password" className={inp} value={pwForm.newPassword} onChange={e => setPwForm({...pwForm, newPassword: e.target.value})} required /></div>
        <button type="submit" disabled={savingPw} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-bg text-white text-sm font-semibold hover:-translate-y-0.5 transition-all disabled:opacity-60">
          {savingPw ? <><i className="fas fa-spinner fa-spin" /> Updating...</> : <><i className="fas fa-lock" /> Update Password</>}
        </button>
        {pwStatus.msg && <p className={`text-sm ${pwStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{pwStatus.msg}</p>}
      </form>
    </div>
  );
}
