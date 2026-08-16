import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma.service';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  async getHeroBanners(locale: string = 'EN_BD') {
    return [
      {
        id: 'banner-1',
        title: locale === 'BN_BD' ? 'উৎসব কালেকশন ২০২৬' : 'Festival Collection 2026',
        subtitle: locale === 'BN_BD' ? 'সেরা লাইফস্টাইল ও ফ্যাশন পোশাকে ৪০% পর্যন্ত ছাড়' : 'Up to 40% OFF on premium lifestyle & fashion',
        ctaText: locale === 'BN_BD' ? 'এখনই কিনুন' : 'Shop Now',
        ctaLink: '/categories/fashion',
        bgGradient: 'from-blue-600 to-indigo-900',
        badge: locale === 'BN_BD' ? 'ঈদ স্পেশাল' : 'Eid Exclusive',
      },
      {
        id: 'banner-2',
        title: locale === 'BN_BD' ? 'লেটেস্ট স্মার্টফোন গ্যাজেটস' : 'Next-Gen Smartphones',
        subtitle: locale === 'BN_BD' ? 'অফিসিয়াল ওয়ারেন্টি ও ০% ইএমআই সুবিধা' : '0% EMI & official brand warranty nationwide',
        ctaText: locale === 'BN_BD' ? 'এক্সপ্লোর করুন' : 'Explore',
        ctaLink: '/categories/electronics',
        bgGradient: 'from-amber-600 to-red-800',
        badge: locale === 'BN_BD' ? 'নতুন কালেকশন' : 'New Arrival',
      },
      {
        id: 'banner-3',
        title: locale === 'BN_BD' ? 'হোম ও কিচেন সামগ্রী' : 'Home & Kitchen Essentials',
        subtitle: locale === 'BN_BD' ? 'প্রতিদিনের প্রয়োজনীয় পণ্যে অতিরিক্ত ১৫% ক্যাশব্যাক' : 'Extra 15% instant cashback via bKash',
        ctaText: locale === 'BN_BD' ? 'অর্ডার করুন' : 'Order Today',
        ctaLink: '/categories/home-living',
        bgGradient: 'from-emerald-600 to-teal-900',
        badge: locale === 'BN_BD' ? 'সেরা ডিল' : 'Super Deals',
      },
    ];
  }

  async getFaqs(locale: string = 'EN_BD') {
    if (locale === 'BN_BD') {
      return [
        {
          q: 'ঢাকার ভেতরে ডেলিভারি কত দ্রুত হয়?',
          a: 'ঢাকার ভেতরে সাধারণত ২-৩ কার্যদিবসের মধ্যে ডেলিভারি সম্পন্ন হয়। জরুরি ডেলিভারির ক্ষেত্রে ২৪ ঘণ্টার এক্সপ্রেস সার্ভিস পাওয়া যায়।',
          category: 'ডেলিভারি',
        },
        {
          q: 'ক্যাশ অন ডেলিভারি (COD) কি সারাদেশে পাওয়া যাবে?',
          a: 'হ্যাঁ! বাংলাদেশের যেকোনো বিভাগ ও জেলায় ক্যাশ অন ডেলিভারি সুবিধা প্রযোজ্য।',
          category: 'পেমেন্ট',
        },
        {
          q: 'পণ্য ফেরত দেওয়ার নিয়ম কী?',
          a: 'পণ্য পাওয়ার ৭ দিনের মধ্যে যেকোনো ত্রুটিযুক্ত বা অমিল পণ্য রিটার্ন রিকোয়েস্ট করতে পারবেন।',
          category: 'রিটার্ন ও রিফান্ড',
        },
        {
          q: 'বিকাশ ও অন্যান্য গেটওয়েতে পেমেন্ট কি নিরাপদ?',
          a: 'হ্যাঁ, আমাদের পেমেন্ট সিস্টেম আন্তর্জাতিক SSL এনক্রিপশন ও বাংলাদেশ ব্যাংকের নিয়মানুযায়ী সম্পূর্ণ সুরক্ষিত।',
          category: 'নিরাপত্তা',
        },
      ];
    }

    return [
      {
        q: 'How fast is delivery inside Dhaka?',
        a: 'Orders inside Dhaka are typically delivered within 2-3 business days. Express next-day delivery is available for eligible pin codes.',
        category: 'Delivery',
      },
      {
        q: 'Is Cash on Delivery (COD) available nationwide?',
        a: 'Yes, we provide Cash on Delivery across all 64 districts and 495 upazilas in Bangladesh.',
        category: 'Payment',
      },
      {
        q: 'What is your return & refund policy?',
        a: 'We offer a hassle-free 7-day return policy for any damaged, defective, or incorrect items.',
        category: 'Returns',
      },
      {
        q: 'Are digital payments safe on Kenakata?',
        a: 'Yes, all digital transactions via bKash, Nagad, and Credit/Debit cards are 256-bit SSL encrypted and strictly comply with Bangladesh Bank regulations.',
        category: 'Security',
      },
    ];
  }
}
