import {
  // Bottom Navigation
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  HeartIcon,
  UserIcon,
  
  // Top Navigation
  Bars3Icon,
  ArrowLeftIcon,
  EllipsisHorizontalIcon,
  ShareIcon,
  BellIcon,
  
  // Tab Navigation
  PhotoIcon,
  VideoCameraIcon,
  BookmarkIcon,
  QueueListIcon,
  TagIcon
} from '@heroicons/vue/24/outline';

export const navigationIcons = {
  bottom: {
    name: 'Bottom Navigation',
    icons: {
      'Home': HomeIcon,
      'Search': MagnifyingGlassIcon,
      'Add': PlusCircleIcon,
      'Likes': HeartIcon,
      'Profile': UserIcon
    }
  },
  top: {
    name: 'Top Navigation',
    icons: {
      'Menu': Bars3Icon,
      'Back': ArrowLeftIcon,
      'More': EllipsisHorizontalIcon,
      'Share': ShareIcon,
      'Notifications': BellIcon
    }
  },
  tabs: {
    name: 'Tab Navigation',
    icons: {
      'Photos': PhotoIcon,
      'Videos': VideoCameraIcon,
      'Saved': BookmarkIcon,
      'List': QueueListIcon,
      'Tags': TagIcon
    }
  }
};