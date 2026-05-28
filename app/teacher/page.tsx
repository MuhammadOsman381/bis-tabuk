'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Check, Link2, LockKeyhole, LogOut, Pencil, Plus, Trash2, X } from 'lucide-react';
import PortalHeader from '@/components/layout/PortalHeader';
import { TEACHER_PROFILE_KEY, TEACHER_TOKEN_KEY } from '@/lib/storageKeys';

type TeacherProfile = {
  id: string;
  name: string;
  email: string;
  assignedClasses: string[];
};

type ChapterInput = {
  name: string;
  description: string;
  link: string;
};

type Material = {
  id: string;
  className: string;
  title: string;
  chapters: ChapterInput[];
};

type MaterialForm = {
  className: string;
  title: string;
  chapters: ChapterInput[];
};

const inputClass =
  'focus-ring w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-950/70 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:shadow-black/20';

const emptyChapter = (): ChapterInput => ({ name: '', description: '', link: '' });

function normalizeChapters(material: Material): ChapterInput[] {
  if (!Array.isArray(material.chapters)) return [];

  return material.chapters.map((item, index) => {
    return {
      name: item.name ?? `Chapter ${index + 1}`,
      description: item.description ?? '',
      link: item.link ?? '',
    };
  });
}

export default function TeacherPage() {
  const [token, setToken] = useState('');
  const [profile, setProfile] = useState<TeacherProfile | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [materials, setMaterials] = useState<Material[]>([]);
  const [editingMaterialId, setEditingMaterialId] = useState('');
  const [editForm, setEditForm] = useState<MaterialForm>({ className: '', title: '', chapters: [emptyChapter()] });
  const [form, setForm] = useState<MaterialForm>({ className: '', title: '', chapters: [emptyChapter()] });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadMaterials = useCallback(async (teacherToken = token) => {
    if (!teacherToken) return;
    try {
      const response = await fetch('/api/teacher/materials', { headers: { Authorization: `Bearer ${teacherToken}` } });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to load materials.');
      setMaterials(result.materials ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to load materials.');
    }
  }, [token]);

  useEffect(() => {
    const savedToken = window.localStorage.getItem(TEACHER_TOKEN_KEY);
    const savedProfile = window.localStorage.getItem(TEACHER_PROFILE_KEY);
    if (savedToken) setToken(savedToken);
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile) as TeacherProfile;
      setProfile(parsedProfile);
      setForm((current) => ({ ...current, className: parsedProfile.assignedClasses[0] ?? '' }));
    }
  }, []);

  useEffect(() => {
    if (!token || !profile) return;
    queueMicrotask(() => loadMaterials(token));
  }, [loadMaterials, profile, token]);

  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/teacher/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to login.');
      window.localStorage.setItem(TEACHER_TOKEN_KEY, result.token);
      window.localStorage.setItem(TEACHER_PROFILE_KEY, JSON.stringify(result.teacher));
      setToken(result.token);
      setProfile(result.teacher);
      setForm((current) => ({ ...current, className: result.teacher.assignedClasses[0] ?? '' }));
      await loadMaterials(result.token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to login.');
    } finally {
      setIsLoading(false);
    }
  };

  const submitMaterial = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/teacher/materials', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          className: form.className,
          title: form.title.trim(),
          chapters: form.chapters.map((chapter) => ({
            name: chapter.name.trim(),
            description: chapter.description.trim(),
            link: chapter.link.trim(),
          })),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to create material.');
      setMaterials((current) => [result.material, ...current].filter(Boolean));
      setForm({ className: profile?.assignedClasses[0] ?? '', title: '', chapters: [emptyChapter()] });
      setMessage('Material created successfully.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to create material.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    window.localStorage.removeItem(TEACHER_TOKEN_KEY);
    window.localStorage.removeItem(TEACHER_PROFILE_KEY);
    setToken('');
    setProfile(null);
    setMaterials([]);
  };

  const updateChapterField = (index: number, field: keyof ChapterInput, value: string) => {
    setForm((current) => ({
      ...current,
      chapters: current.chapters.map((chapter, chapterIndex) => (chapterIndex === index ? { ...chapter, [field]: value } : chapter)),
    }));
  };

  const addChapterBlock = () => {
    setForm((current) => ({ ...current, chapters: [...current.chapters, emptyChapter()] }));
  };

  const removeChapterBlock = (index: number) => {
    setForm((current) => ({
      ...current,
      chapters: current.chapters.length > 1 ? current.chapters.filter((_, chapterIndex) => chapterIndex !== index) : current.chapters,
    }));
  };

  const updateEditChapterField = (index: number, field: keyof ChapterInput, value: string) => {
    setEditForm((current) => ({
      ...current,
      chapters: current.chapters.map((chapter, chapterIndex) => (chapterIndex === index ? { ...chapter, [field]: value } : chapter)),
    }));
  };

  const addEditChapterBlock = () => {
    setEditForm((current) => ({ ...current, chapters: [...current.chapters, emptyChapter()] }));
  };

  const removeEditChapterBlock = (index: number) => {
    setEditForm((current) => ({
      ...current,
      chapters: current.chapters.length > 1 ? current.chapters.filter((_, chapterIndex) => chapterIndex !== index) : current.chapters,
    }));
  };

  const startEditingMaterial = (material: Material) => {
    setEditingMaterialId(material.id);
    setEditForm({
      className: material.className,
      title: material.title,
      chapters: normalizeChapters(material).length ? normalizeChapters(material) : [emptyChapter()],
    });
  };

  const cancelEditingMaterial = () => {
    setEditingMaterialId('');
    setEditForm({ className: '', title: '', chapters: [emptyChapter()] });
  };

  const updateMaterial = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingMaterialId) return;

    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch(`/api/teacher/materials/${editingMaterialId}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          className: editForm.className,
          title: editForm.title.trim(),
          chapters: editForm.chapters.map((chapter) => ({
            name: chapter.name.trim(),
            description: chapter.description.trim(),
            link: chapter.link.trim(),
          })),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to update material.');
      setMaterials((current) => current.map((material) => (material.id === editingMaterialId ? result.material : material)));
      cancelEditingMaterial();
      setMessage('Material updated successfully.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to update material.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMaterial = async (id: string) => {
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch(`/api/teacher/materials/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to delete material.');
      setMaterials((current) => current.filter((material) => material.id !== id));
      if (editingMaterialId === id) cancelEditingMaterial();
      setMessage('Material deleted successfully.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to delete material.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PortalHeader />
      <section className="min-h-screen bg-[#f6fbff] px-4 pb-12 pt-32 dark:bg-zinc-950 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8796B3] dark:text-zinc-500">BIST learning</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">Teacher Portal</h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400">Create a class material, then add chapters with descriptions and links.</p>
            </div>
            {profile && (
              <button type="button" onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-bold text-zinc-700 transition hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            )}
          </div>

          {message && <p className="mb-6 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-bold text-zinc-600 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">{message}</p>}

          {!profile ? (
            <form onSubmit={login} className="mx-auto max-w-xl rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-2xl shadow-zinc-900/8 dark:border-white/10 dark:bg-zinc-900/88 sm:p-8">
              <div className="mb-8">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/25">
                  <LockKeyhole className="h-7 w-7" />
                </div>
                <h2 className="text-3xl font-black text-zinc-950 dark:text-zinc-50">Teacher Login</h2>
              </div>
              <div className="space-y-5">
                <input className={inputClass} value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Teacher email" required />
                <input className={inputClass} value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" required />
                <button type="submit" disabled={isLoading} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C8102E] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#C8102E]/25 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] disabled:opacity-60">
                  {isLoading ? 'Please wait...' : 'Login'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <form onSubmit={submitMaterial} className="h-fit rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88">
                <h2 className="text-2xl font-black text-zinc-950 dark:text-zinc-50">Create Material</h2>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Example: Science for Year 7, then add Chapter 1, Chapter 2, and so on.</p>
                <div className="mt-6 space-y-4">
                  <select className={inputClass} value={form.className} onChange={(event) => setForm((current) => ({ ...current, className: event.target.value }))} required>
                    {profile.assignedClasses.map((className) => <option key={className} value={className}>{className}</option>)}
                  </select>
                  <input className={inputClass} value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Material name, e.g. Science" required />

                  <div className="space-y-4">
                    {form.chapters.map((chapter, index) => (
                      <motion.div key={index} layout className="rounded-3xl border border-zinc-200 bg-zinc-50/70 p-4 dark:border-white/10 dark:bg-white/[0.035]">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <div>
                            <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500">Chapter</p>
                            <p className="mt-1 text-sm font-black text-zinc-800 dark:text-zinc-100">{chapter.name.trim() || `Chapter ${index + 1}`}</p>
                          </div>
                          {form.chapters.length > 1 && (
                            <button type="button" onClick={() => removeChapterBlock(index)} title="Remove chapter" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition hover:border-red-200 hover:text-red-600 dark:border-white/10 dark:bg-zinc-950/60 dark:text-zinc-300">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <div className="space-y-3">
                          <input className={inputClass} value={chapter.name} onChange={(event) => updateChapterField(index, 'name', event.target.value)} placeholder="Chapter name, e.g. Chapter 1" required />
                          <textarea className={`${inputClass} min-h-28`} value={chapter.description} onChange={(event) => updateChapterField(index, 'description', event.target.value)} placeholder="Chapter description" required />
                          <input className={inputClass} value={chapter.link} onChange={(event) => updateChapterField(index, 'link', event.target.value)} placeholder="Chapter material link" required />
                        </div>
                      </motion.div>
                    ))}
                    <button type="button" onClick={addChapterBlock} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-black text-zinc-600 transition hover:-translate-y-0.5 hover:border-[#C8102E]/30 hover:text-[#C8102E] dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:border-[#C9A84C]/30 dark:hover:text-[#C9A84C]">
                      <Plus className="h-4 w-4" />
                      Add More Chapter
                    </button>
                  </div>
                  <button type="submit" disabled={isLoading} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C8102E] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#C8102E]/25 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] disabled:opacity-60">
                    Save Material
                  </button>
                </div>
              </form>

              <div className="space-y-4">
                {materials.map((material) => {
                  const chapters = normalizeChapters(material);

                  return (
                    <article key={material.id} className="rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-lg shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88">
                      {editingMaterialId === material.id ? (
                        <form onSubmit={updateMaterial} className="space-y-3">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">Edit material</p>
                            <button type="button" onClick={cancelEditingMaterial} title="Cancel edit" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition hover:bg-zinc-50 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/[0.04]">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <select className={inputClass} value={editForm.className} onChange={(event) => setEditForm((current) => ({ ...current, className: event.target.value }))} required>
                            {profile.assignedClasses.map((className) => <option key={className} value={className}>{className}</option>)}
                          </select>
                          <input className={inputClass} value={editForm.title} onChange={(event) => setEditForm((current) => ({ ...current, title: event.target.value }))} placeholder="Material name, e.g. Science" required />
                          <div className="space-y-3">
                            {editForm.chapters.map((chapter, index) => (
                              <div key={index} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3 dark:border-white/10 dark:bg-white/[0.035]">
                                <div className="mb-3 flex items-center justify-between gap-3">
                                  <p className="text-xs font-black uppercase tracking-[0.16em] text-zinc-400">Chapter {index + 1}</p>
                                  {editForm.chapters.length > 1 && (
                                    <button type="button" onClick={() => removeEditChapterBlock(index)} title="Remove chapter" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition hover:text-red-600 dark:border-white/10 dark:bg-zinc-950/60">
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  )}
                                </div>
                                <div className="space-y-2">
                                  <input className={inputClass} value={chapter.name} onChange={(event) => updateEditChapterField(index, 'name', event.target.value)} placeholder="Chapter name" required />
                                  <textarea className={`${inputClass} min-h-24`} value={chapter.description} onChange={(event) => updateEditChapterField(index, 'description', event.target.value)} placeholder="Chapter description" required />
                                  <input className={inputClass} value={chapter.link} onChange={(event) => updateEditChapterField(index, 'link', event.target.value)} placeholder="Chapter material link" required />
                                </div>
                              </div>
                            ))}
                            <button type="button" onClick={addEditChapterBlock} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-black text-zinc-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200">
                              <Plus className="h-4 w-4" />
                              Add Chapter
                            </button>
                          </div>
                          <button type="submit" disabled={isLoading} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C8102E] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#C8102E]/20 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] disabled:opacity-60">
                            <Check className="h-4 w-4" />
                            Save Changes
                          </button>
                        </form>
                      ) : (
                        <>
                          <div className="flex items-start justify-between gap-3">
                            <span className="rounded-full bg-[#C8102E]/10 px-3 py-1 text-xs font-black text-[#C8102E] dark:bg-[#C9A84C]/10 dark:text-[#C9A84C]">{material.className}</span>
                            <div className="flex gap-2">
                              <button type="button" onClick={() => startEditingMaterial(material)} title="Edit material" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition hover:-translate-y-0.5 hover:text-[#C8102E] dark:border-white/10 dark:text-zinc-300 dark:hover:text-[#C9A84C]">
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button type="button" onClick={() => deleteMaterial(material.id)} disabled={isLoading} title="Delete material" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition hover:-translate-y-0.5 hover:border-red-200 hover:text-red-600 disabled:opacity-60 dark:border-white/10 dark:text-zinc-300 dark:hover:border-red-400/30 dark:hover:text-red-300">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <h3 className="mt-4 text-xl font-black text-zinc-950 dark:text-zinc-50">{material.title}</h3>
                          <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-zinc-400">{chapters.length} chapter{chapters.length === 1 ? '' : 's'}</p>
                          <div className="mt-5 space-y-3">
                            {chapters.map((chapter, index) => (
                              <div key={`${material.id}-${index}-${chapter.link}`} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-white/10 dark:bg-white/[0.035]">
                                <h4 className="font-black text-zinc-900 dark:text-zinc-50">{chapter.name}</h4>
                                <p className="mt-1 text-sm leading-6 text-zinc-500 dark:text-zinc-400">{chapter.description}</p>
                                <a href={chapter.link} target="_blank" className="mt-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-black text-zinc-600 transition hover:text-[#C8102E] dark:border-white/10 dark:bg-zinc-950/50 dark:text-zinc-300">
                                  <Link2 className="h-3.5 w-3.5" />
                                  Open material
                                </a>
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </article>
                  );
                })}
                {!materials.length && (
                  <div className="rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-10 text-center dark:border-white/10 dark:bg-white/[0.04]">
                    <BookOpen className="mx-auto h-8 w-8 text-zinc-400" />
                    <p className="mt-3 text-sm font-bold text-zinc-500 dark:text-zinc-400">No materials yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </motion.main>
  );
}
