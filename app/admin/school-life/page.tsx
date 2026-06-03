'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Edit3, ImagePlus, Loader2, LockKeyhole, LogOut, RefreshCw, Trash2, X } from 'lucide-react';
import AdminSidebar from '@/components/layout/AdminSidebar';
import PortalHeader from '@/components/layout/PortalHeader';
import RichTextEditor from '@/components/ui/RichTextEditor';
import { ADMIN_TOKEN_KEY } from '@/lib/storageKeys';

type SchoolLifeItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imagePublicId?: string | null;
  imageGallery?: GalleryImage[];
  updatedAt?: string;
};

type GalleryImage = {
  url: string;
  publicId?: string;
};

const inputClass =
  'focus-ring w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-950 placeholder:text-zinc-400 shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-950/70 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:shadow-black/20';
const MAX_UPLOAD_BYTES = 3.8 * 1024 * 1024;
const IMAGE_COMPRESSION_THRESHOLD_BYTES = 1.8 * 1024 * 1024;

async function readJsonResponse<T>(response: Response, fallbackMessage: string): Promise<T> {
  const text = await response.text();
  if (!text) return {} as T;

  try {
    return JSON.parse(text) as T;
  } catch {
    const cleanText = text.replace(/\s+/g, ' ').trim();
    const message = cleanText || fallbackMessage;
    throw new Error(message.startsWith('Request Entity Too Large') ? 'The selected image is too large. Please choose a smaller image.' : message);
  }
}

async function compressImageForUpload(file: File) {
  if (!file.type.startsWith('image/') || file.size <= IMAGE_COMPRESSION_THRESHOLD_BYTES) return file;

  const imageUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = document.createElement('img');
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Unable to prepare image for upload.'));
      img.src = imageUrl;
    });

    const maxDimension = 1800;
    const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));

    const context = canvas.getContext('2d');
    if (!context) return file;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.78));
    if (!blob || blob.size >= file.size) return file;

    const safeName = file.name.replace(/\.[^.]+$/, '') || 'school-life';
    return new File([blob], `${safeName}.jpg`, { type: 'image/jpeg', lastModified: Date.now() });
  } finally {
    URL.revokeObjectURL(imageUrl);
  }
}

export default function AdminSchoolLifePage() {
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [items, setItems] = useState<SchoolLifeItem[]>([]);
  const [form, setForm] = useState({ title: '', description: '', category: '' });
  const [editingItemId, setEditingItemId] = useState('');
  const [editingGallery, setEditingGallery] = useState<Array<GalleryImage | null>>([null, null, null]);
  const [imageFiles, setImageFiles] = useState<Array<File | null>>([null, null, null]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const authHeaders = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  const loadItems = useCallback(async (adminToken = token) => {
    if (!adminToken) return;

    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/admin/school-life', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to load school life items.');
      setItems(result.items ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to load school life items.');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    queueMicrotask(() => {
      const savedToken = window.localStorage.getItem(ADMIN_TOKEN_KEY);
      if (savedToken) setToken(savedToken);
    });
  }, []);

  useEffect(() => {
    if (!token) return;
    queueMicrotask(() => loadItems(token));
  }, [loadItems, token]);

  const loginAdmin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to login.');

      window.localStorage.setItem(ADMIN_TOKEN_KEY, result.token);
      setToken(result.token);
      await loadItems(result.token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to login.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    window.localStorage.removeItem(ADMIN_TOKEN_KEY);
    setToken('');
    setItems([]);
  };

  const uploadFile = async (file: File) => {
    const uploadableFile = await compressImageForUpload(file);
    if (uploadableFile.size > MAX_UPLOAD_BYTES) {
      throw new Error('The selected image is too large. Please choose a smaller image.');
    }

    const body = new FormData();
    body.append('file', uploadableFile);
    const response = await fetch('/api/upload', { method: 'POST', body });
    const result = await readJsonResponse<{ error?: string; url: string; publicId: string; name: string }>(response, 'Upload failed.');
    if (!response.ok) throw new Error(result.error ?? 'Upload failed.');
    return result as { url: string; publicId: string; name: string };
  };

  const resetForm = () => {
    setForm({ title: '', description: '', category: '' });
    setEditingItemId('');
    setEditingGallery([null, null, null]);
    setImageFiles([null, null, null]);
  };

  const editItem = (item: SchoolLifeItem) => {
    setForm({ title: item.title, description: item.description, category: item.category });
    setEditingItemId(item.id);
    setEditingGallery(normalizeGallerySlots(getItemGallery(item)));
    setImageFiles([null, null, null]);
    setMessage('');
  };

  const getItemGallery = (item?: SchoolLifeItem | null): GalleryImage[] => {
    if (!item) return [];
    if (Array.isArray(item.imageGallery) && item.imageGallery.length) return item.imageGallery.slice(0, 3);
    return item.imageUrl ? [{ url: item.imageUrl, publicId: item.imagePublicId ?? undefined }] : [];
  };

  const normalizeGallerySlots = (gallery: GalleryImage[]) => {
    return [0, 1, 2].map((index) => gallery[index] ?? null);
  };

  const saveItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentItem = editingItemId ? items.find((item) => item.id === editingItemId) : null;
    const existingGallery = editingItemId ? editingGallery : normalizeGallerySlots(getItemGallery(currentItem));

    if (!editingItemId && !imageFiles.some(Boolean)) {
      setMessage('Please select at least 1 image.');
      return;
    }

    setIsLoading(true);
    setMessage('');
    try {
      const gallerySlots = await Promise.all(
        imageFiles.map(async (file, index) => {
          if (file) {
            const upload = await uploadFile(file);
            return { url: upload.url, publicId: upload.publicId };
          }
          return existingGallery[index] ?? null;
        }),
      );
      const seenImages = new Set<string>();
      const gallery = gallerySlots
        .filter((image): image is GalleryImage => Boolean(image?.url))
        .filter((image) => {
          const key = image.publicId || image.url;
          if (seenImages.has(key)) return false;
          seenImages.add(key);
          return true;
        })
        .slice(0, 3);
      if (gallery.length < 1) throw new Error('Please select at least 1 image.');

      const response = await fetch(editingItemId ? `/api/admin/school-life/${editingItemId}` : '/api/admin/school-life', {
        method: editingItemId ? 'PATCH' : 'POST',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          category: form.category,
          imageUrl: gallery[0].url,
          imagePublicId: gallery[0].publicId,
          imageGallery: gallery,
        }),
      });
      const result = await readJsonResponse<{ error?: string; item: SchoolLifeItem }>(response, 'Unable to save school life item.');
      if (!response.ok) throw new Error(result.error ?? 'Unable to save school life item.');

      resetForm();
      setItems((current) => (editingItemId ? current.map((item) => (item.id === editingItemId ? result.item : item)) : [result.item, ...current]));
      setMessage(editingItemId ? 'School life card updated.' : 'School life card created.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save school life item.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    setIsLoading(true);
    setMessage('');
    try {
      const response = await fetch(`/api/admin/school-life/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to delete school life item.');
      setItems((current) => current.filter((item) => item.id !== id));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to delete school life item.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <PortalHeader />
      <section className="min-h-screen bg-[#f6fbff] px-4 pb-12 pt-32 dark:bg-zinc-950 sm:px-6 lg:px-10">
        <div className={token ? 'mx-auto grid max-w-7xl gap-6 lg:grid-cols-[16rem_1fr]' : 'mx-auto max-w-7xl'}>
          {token && <AdminSidebar active="school-life" />}
          <div>
            <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-[#8796B3] dark:text-zinc-500">BIST admin</p>
                <h1 className="mt-3 text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">School Life</h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600 dark:text-zinc-400">Create cards for the School Life section on the landing page.</p>
              </div>

              {token && (
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => loadItems()} title="Refresh" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                  </button>
                  <button type="button" onClick={logout} title="Logout" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-50 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100">
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {message && <p className="mb-6 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-bold text-zinc-600 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-300">{message}</p>}

            {!token ? (
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-xl rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-2xl shadow-zinc-900/8 dark:border-white/10 dark:bg-zinc-900/88 dark:shadow-black/35 sm:p-8">
                <div className="mb-8">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C8102E] text-white shadow-lg shadow-[#C8102E]/25">
                    <LockKeyhole className="h-7 w-7" />
                  </div>
                  <h2 className="text-3xl font-black text-zinc-950 dark:text-zinc-50">Admin Login</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">Login to manage School Life cards.</p>
                </div>
                <form onSubmit={loginAdmin} className="space-y-5">
                  <input className={inputClass} value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Admin email" required />
                  <input className={inputClass} value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" required />
                  <button type="submit" disabled={isLoading} className="inline-flex w-full items-center justify-center rounded-full bg-[#C8102E] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#C8102E]/25 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] disabled:cursor-not-allowed disabled:opacity-70">
                    {isLoading ? 'Please wait...' : 'Login'}
                  </button>
                </form>
              </motion.div>
            ) : (
              <div className="grid gap-6">
                <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88">
                  <div className="mb-5">
                    <h2 className="text-2xl font-black text-zinc-950 dark:text-zinc-50">{editingItemId ? 'Edit School Life Card' : 'Add School Life Card'}</h2>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{editingItemId ? 'Update the selected homepage card. Choose a new image only if you want to replace the current one.' : 'This card will appear on the homepage and open a full detail page when clicked.'}</p>
                  </div>
                  <form onSubmit={saveItem} className="grid gap-4">
                    <input className={inputClass} value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Title" required />
                    <input className={inputClass} value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} placeholder="Category" required />
                    <div>
                      <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-zinc-400">Description</span>
                      <RichTextEditor value={form.description} onChange={(description) => setForm((current) => ({ ...current, description }))} />
                    </div>
                    <div className="block">
                      <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-zinc-400">Gallery Images (1 to 3)</span>
                      <div className="grid gap-3 md:grid-cols-3">
                        {[0, 1, 2].map((index) => {
                          const currentImage = editingItemId ? editingGallery[index] : null;

                          return (
                            <div key={index} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3 dark:border-white/10 dark:bg-white/[0.04]">
                              {currentImage?.url && !imageFiles[index] && (
                                <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-xl">
                                  <Image src={currentImage.url} alt={`Current gallery image ${index + 1}`} fill sizes="220px" className="object-cover" />
                                </div>
                              )}
                              <input
                                className={inputClass}
                                type="file"
                                accept="image/*"
                                onChange={(event) => {
                                  const file = event.target.files?.[0] ?? null;
                                  setImageFiles((current) => current.map((item, itemIndex) => (itemIndex === index ? file : item)));
                                }}
                                required={!editingItemId && index === 0}
                              />
                              <p className="mt-2 text-xs font-bold text-zinc-500 dark:text-zinc-400">
                                {imageFiles[index]?.name || currentImage?.url ? `Image ${index + 1} ready` : `Optional image ${index + 1}`}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button type="submit" disabled={isLoading} className="inline-flex w-fit items-center gap-2 rounded-full bg-[#C8102E] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#C8102E]/20 transition hover:-translate-y-0.5 hover:bg-[#9B0D23] disabled:cursor-not-allowed disabled:opacity-60">
                        {editingItemId ? <Edit3 className="h-4 w-4" /> : <ImagePlus className="h-4 w-4" />}
                        {editingItemId ? 'Update Card' : 'Add Card'}
                      </button>
                      {editingItemId && (
                        <button type="button" onClick={resetForm} className="inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-sm font-black text-zinc-700 transition hover:-translate-y-0.5 hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100">
                          <X className="h-4 w-4" />
                          Cancel Edit
                        </button>
                      )}
                    </div>
                  </form>
                </section>

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((item) => (
                    <article key={item.id} className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-xl shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-900/88">
                      <div className="grid aspect-[4/3] grid-cols-3 gap-1 bg-zinc-100 p-1 dark:bg-zinc-950">
                        {getItemGallery(item).slice(0, 3).map((image, index) => (
                          <div key={`${image.url}-${index}`} className={`relative overflow-hidden rounded-2xl ${index === 0 ? 'col-span-2 row-span-2' : ''}`}>
                            <Image src={image.url} alt={`${item.title} gallery ${index + 1}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                          </div>
                        ))}
                      </div>
                      <div className="p-5">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#C8102E] dark:text-[#C9A84C]">{item.category}</p>
                        <h3 className="mt-2 text-xl font-black text-zinc-950 dark:text-zinc-50">{item.title}</h3>
                        <div className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:m-0 [&_ul]:list-disc [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: item.description }} />
                        <div className="mt-5 flex gap-2">
                          <button type="button" onClick={() => editItem(item)} disabled={isLoading} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition hover:border-[#C8102E]/30 hover:bg-[#C8102E]/5 hover:text-[#C8102E] disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:text-zinc-300 dark:hover:border-[#C9A84C]/30 dark:hover:bg-[#C9A84C]/10 dark:hover:text-[#C9A84C]" title="Edit card" aria-label="Edit card">
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button type="button" onClick={() => deleteItem(item.id)} disabled={isLoading} className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:text-zinc-300 dark:hover:border-red-400/20 dark:hover:bg-red-400/10 dark:hover:text-red-200" title="Delete card" aria-label="Delete card">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </section>
              </div>
            )}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
