'use client';

type SidebarProps = {
  isDesktopOpen: boolean;
  onDesktopClose: () => void;
  showMobileTrigger?: boolean;
};

export default function Sidebar({}: SidebarProps) {
  // Sidebar navigation is intentionally disabled across the site.
  return null;
}
