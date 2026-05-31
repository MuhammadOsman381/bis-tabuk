'use client';

import { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const toolbarButtons = [
  { label: 'B', action: 'bold' },
  { label: 'I', action: 'italic' },
  { label: 'H2', action: 'heading' },
  { label: 'List', action: 'bulletList' },
  { label: '1.', action: 'orderedList' },
] as const;

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '<p></p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'min-h-40 rounded-b-2xl bg-white px-4 py-3 text-sm leading-7 text-zinc-950 outline-none dark:bg-zinc-950/70 dark:text-zinc-100 [&_h2]:text-xl [&_h2]:font-black [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-6',
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== (value || '<p></p>')) {
      editor.commands.setContent(value || '<p></p>', { emitUpdate: false });
    }
  }, [editor, value]);

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm shadow-zinc-900/5 dark:border-white/10 dark:bg-zinc-950/70 dark:shadow-black/20">
      <div className="flex flex-wrap gap-2 border-b border-zinc-200 bg-zinc-50 p-2 dark:border-white/10 dark:bg-white/[0.04]">
        {toolbarButtons.map((button) => {
          const isActive =
            button.action === 'heading'
              ? editor?.isActive('heading', { level: 2 })
              : editor?.isActive(button.action);

          return (
            <button
              key={button.action}
              type="button"
              onClick={() => {
                if (button.action === 'bold') editor?.chain().focus().toggleBold().run();
                if (button.action === 'italic') editor?.chain().focus().toggleItalic().run();
                if (button.action === 'heading') editor?.chain().focus().toggleHeading({ level: 2 }).run();
                if (button.action === 'bulletList') editor?.chain().focus().toggleBulletList().run();
                if (button.action === 'orderedList') editor?.chain().focus().toggleOrderedList().run();
              }}
              className={`rounded-xl px-3 py-2 text-xs font-black transition ${
                isActive
                  ? 'bg-[#C8102E] text-white dark:bg-[#C9A84C] dark:text-zinc-950'
                  : 'bg-white text-zinc-600 hover:text-[#C8102E] dark:bg-zinc-950/70 dark:text-zinc-300 dark:hover:text-[#C9A84C]'
              }`}
            >
              {button.label}
            </button>
          );
        })}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
