import {
  // Communication
  ChatBubbleLeftIcon,
  EnvelopeIcon,
  PhoneIcon,
  BellIcon,
  MegaphoneIcon,
  
  // Media
  CameraIcon,
  PhotoIcon,
  VideoCameraIcon,
  MusicalNoteIcon,
  SpeakerWaveIcon,
  
  // UI Elements
  Cog6ToothIcon,
  CommandLineIcon,
  CursorArrowRaysIcon,
  WindowIcon,
  SwatchIcon,
  
  // Business
  BriefcaseIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  DocumentIcon,
  PresentationChartLineIcon,
  
  // General
  HeartIcon,
  HomeIcon,
  StarIcon,
  BookmarkIcon,
  GlobeAltIcon,
  
  // Education
  AcademicCapIcon,
  BookOpenIcon,
  PencilIcon,
  CalculatorIcon,
  ClipboardDocumentIcon
} from '@heroicons/vue/24/outline';

import { navigationIcons } from './navigationIcons';

export interface IconCategory {
  name: string;
  icons: Record<string, any>;
}

export const iconCategories: IconCategory[] = [
  {
    name: 'Bottom Navigation',
    icons: navigationIcons.bottom.icons
  },
  {
    name: 'Top Navigation',
    icons: navigationIcons.top.icons
  },
  {
    name: 'Tab Navigation',
    icons: navigationIcons.tabs.icons
  },
  {
    name: 'Communication',
    icons: {
      'Chat': ChatBubbleLeftIcon,
      'Email': EnvelopeIcon,
      'Phone': PhoneIcon,
      'Bell': BellIcon,
      'Megaphone': MegaphoneIcon
    }
  },
  {
    name: 'Media',
    icons: {
      'Camera': CameraIcon,
      'Photo': PhotoIcon,
      'Video': VideoCameraIcon,
      'Music': MusicalNoteIcon,
      'Speaker': SpeakerWaveIcon
    }
  },
  {
    name: 'UI Elements',
    icons: {
      'Settings': Cog6ToothIcon,
      'Command': CommandLineIcon,
      'Cursor': CursorArrowRaysIcon,
      'Window': WindowIcon,
      'Color Swatch': SwatchIcon
    }
  },
  {
    name: 'Business',
    icons: {
      'Briefcase': BriefcaseIcon,
      'Office': BuildingOfficeIcon,
      'Chart': ChartBarIcon,
      'Document': DocumentIcon,
      'Presentation': PresentationChartLineIcon
    }
  },
  {
    name: 'General',
    icons: {
      'Heart': HeartIcon,
      'Home': HomeIcon,
      'Star': StarIcon,
      'Bookmark': BookmarkIcon,
      'Globe': GlobeAltIcon
    }
  },
  {
    name: 'Education',
    icons: {
      'Academic Cap': AcademicCapIcon,
      'Book': BookOpenIcon,
      'Pencil': PencilIcon,
      'Calculator': CalculatorIcon,
      'Clipboard': ClipboardDocumentIcon
    }
  }
];