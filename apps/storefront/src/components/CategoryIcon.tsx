'use client';

import React from 'react';
import {
  Lightning,
  House,
  Camera,
  Headphones,
  DeviceMobile,
  SpeakerHigh,
  Wind,
  Lightbulb,
  Printer,
  DeviceMobileCamera,
  Keyboard,
  BatteryCharging,
  Bed,
  Sparkle,
  Lamp,
  Broom,
  Suitcase,
  CookingPot,
  Armchair,
  SquaresFour,
  IconProps
} from '@phosphor-icons/react';

interface CategoryIconProps {
  slug?: string;
  className?: string;
  weight?: IconProps['weight'];
  size?: number | string;
}

export default function CategoryIcon({
  slug = '',
  className = 'w-6 h-6',
  weight = 'duotone',
  size
}: CategoryIconProps) {
  const normalized = (slug || '').toLowerCase().trim();

  switch (normalized) {
    case 'gadgets':
      return <Lightning className={className} weight={weight} size={size} />;
    case 'home-appliance':
    case 'home-living':
      return <House className={className} weight={weight} size={size} />;
    case 'camera':
    case 'cameras':
      return <Camera className={className} weight={weight} size={size} />;
    case 'earbuds':
    case 'audio':
    case 'headphones':
      return <Headphones className={className} weight={weight} size={size} />;
    case 'mobile-accessories':
      return <DeviceMobile className={className} weight={weight} size={size} />;
    case 'speaker':
    case 'speakers':
      return <SpeakerHigh className={className} weight={weight} size={size} />;
    case 'fan':
    case 'fans':
      return <Wind className={className} weight={weight} size={size} />;
    case 'light':
    case 'lights':
      return <Lightbulb className={className} weight={weight} size={size} />;
    case 'printer':
    case 'printers':
      return <Printer className={className} weight={weight} size={size} />;
    case 'mobile-phone':
    case 'phones':
      return <DeviceMobileCamera className={className} weight={weight} size={size} />;
    case 'mouse-keyboard':
    case 'keyboard':
      return <Keyboard className={className} weight={weight} size={size} />;
    case 'ups':
    case 'power':
      return <BatteryCharging className={className} weight={weight} size={size} />;
    case 'bed-sheets':
    case 'bedding':
      return <Bed className={className} weight={weight} size={size} />;
    case 'smart-gadgets':
      return <Sparkle className={className} weight={weight} size={size} />;
    case 'smart-lighting':
      return <Lamp className={className} weight={weight} size={size} />;
    case 'cleaning':
      return <Broom className={className} weight={weight} size={size} />;
    case 'travel':
      return <Suitcase className={className} weight={weight} size={size} />;
    case 'kitchen':
      return <CookingPot className={className} weight={weight} size={size} />;
    case 'pillow':
      return <Armchair className={className} weight={weight} size={size} />;
    default:
      return <SquaresFour className={className} weight={weight} size={size} />;
  }
}
