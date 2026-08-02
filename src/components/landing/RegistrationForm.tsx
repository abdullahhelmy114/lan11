import { useState } from "react";
import { z } from "zod";
import { Check, Copy, Share2 } from "lucide-react";
import { LANGS, t, type Lang } from "@/lib/i18n";
import { SectionLabel } from "./shared";

// 🌍 قائمة شاملة لأهم رموز الدول مع الأعلام
const COUNTRIES = [
  { code: "+970", name: "فلسطين", flag: "🇵🇸" },
  { code: "+962", name: "الأردن", flag: "🇯🇴" },
  { code: "+90", name: "تركيا", flag: "🇹🇷" },
  { code: "+20", name: "مصر", flag: "🇪🇬" },
  { code: "+212", name: "المغرب", flag: "🇲🇦" },
  { code: "+966", name: "السعودية", flag: "🇸🇦" },
  { code: "+971", name: "الإمارات", flag: "🇦🇪" },
  { code: "+44", name: "المملكة المتحدة", flag: "🇬🇧" },
  { code: "+1", name: "الولايات المتحدة / كندا", flag: "🇺🇸" },
  { code: "+33", name: "فرنسا", flag: "🇫🇷" },
  { code: "+49", name: "ألمانيا", flag: "🇩🇪" },
  { code: "+39", name: "إيطاليا", flag: "🇮🇹" },
  { code: "+7", name: "روسيا", flag: "🇷🇺" },
  { code: "+81", name: "اليابان", flag: "🇯🇵" },
  { code: "+86", name: "الصين", flag: "🇨🇳" },
  { code: "+91", name: "الهند", flag: "🇮🇳" },
  { code: "+234", name: "نيجيريا", flag: "🇳🇬" },
  { code: "+27", name: "جنوب أفريقيا", flag: "🇿🇦" },
  { code: "+55", name: "البرازيل", flag: "🇧🇷" },
  { code: "+61", name: "أستراليا", flag: "🇦🇺" },
  { code: "+32", name: "بلجيكا", flag: "🇧🇪" },
  { code: "+46", name: "السويد", flag: "🇸🇪" },
  { code: "+47", name: "النرويج", flag: "🇳🇴" },
  { code: "+45", name: "الدنمارك", flag: "🇩🇰" },
  { code: "+31", name: "هولندا", flag: "🇳🇱" },
  { code: "+41", name: "سويسرا", flag: "🇨🇭" },
  { code: "+43", name: "النمسا", flag: "🇦🇹" },
  { code: "+34", name: "إسبانيا", flag: "🇪🇸" },
  { code: "+351", name: "البرتغال", flag: "🇵🇹" },
  { code: "+353", name: "أيرلندا", flag: "🇮🇪" },
  { code: "+48", name: "بولندا", flag: "🇵🇱" },
  { code: "+380", name: "أوكرانيا", flag: "🇺🇦" },
  { code: "+60", name: "ماليزيا", flag: "🇲🇾" },
  { code: "+62", name: "إندونيسيا", flag: "🇮🇩" },
  { code: "+63", name: "الفلبين", flag: "🇵🇭" },
  { code: "+66", name: "تايلاند", flag: "🇹🇭" },
  { code: "+84", name: "فيتنام", flag: "🇻🇳" },
  { code: "+92", name: "باكستان", flag: "🇵🇰" },
  { code: "+964", name: "العراق", flag: "🇮🇶" },
  { code: "+963", name: "سوريا", flag: "🇸🇾" },
  { code: "+961", name: "لبنان", flag: "🇱🇧" },
  { code: "+967", name: "اليمن", flag: "🇾🇪" },
  { code: "+968", name: "عمان", flag: "🇴🇲" },
  { code: "+965", name: "الكويت", flag: "🇰🇼" },
  { code: "+973", name: "البحرين", flag: "🇧🇭" },
  { code: "+974", name: "قطر", flag: "🇶🇦" },
  { code: "+216", name: "تونس", flag: "🇹🇳" },
  { code: "+213", name: "الجزائر", flag: "🇩🇿" },
  { code: "+218", name: "ليبيا", flag: "🇱🇾" },
  { code: "+249", name: "السودان", flag: "🇸🇩" },
  { code: "+252", name: "الصومال", flag: "🇸🇴" },
  { code: "+254", name: "كينيا", flag: "🇰🇪" },
  { code: "+256", name: "أوغندا", flag: "🇺🇬" },
  { code: "+255", name: "تنزانيا", flag: "🇹🇿" },
  { code: "+250", name: "رواندا", flag: "🇷🇼" },
  { code: "+257", name: "بوروندي", flag: "🇧🇮" },
  { code: "+224", name: "غينيا", flag: "🇬🇳" },
  { code: "+221", name: "السنغال", flag: "🇸🇳" },
  { code: "+225", name: "ساحل العاج", flag: "🇨🇮" },
  { code: "+233", name: "غانا", flag: "🇬🇭" },
  { code: "+229", name: "بنين", flag: "🇧🇯" },
  { code: "+235", name: "تشاد", flag: "🇹🇩" },
  { code: "+237", name: "الكاميرون", flag: "🇨🇲" },
  { code: "+241", name: "الغابون", flag: "🇬🇦" },
  { code: "+242", name: "الكونغو", flag: "🇨🇬" },
  { code: "+243", name: "جمهورية الكونغو الديمقراطية", flag: "🇨🇩" },
  { code: "+248", name: "سيشل", flag: "🇸🇨" },
  { code: "+230", name: "موريشيوس", flag: "🇲🇺" },
  { code: "+263", name: "زيمبابوي", flag: "🇿🇼" },
  { code: "+260", name: "زامبيا", flag: "🇿🇲" },
  { code: "+265", name: "مالاوي", flag: "🇲🇼" },
  { code: "+267", name: "بوتسوانا", flag: "🇧🇼" },
  { code: "+268", name: "إسواتيني", flag: "🇸🇿" },
  { code: "+266", name: "ليسوتو", flag: "🇱🇸" },
  { code: "+264", name: "ناميبيا", flag: "🇳🇦" },
  { code: "+244", name: "أنغولا", flag: "🇦🇴" },
  { code: "+258", name: "موزمبيق", flag: "🇲🇿" },
  { code: "+245", name: "غينيا بيساو", flag: "🇬🇼" },
  { code: "+238", name: "الرأس الأخضر", flag: "🇨🇻" },
  { code: "+239", name: "ساو تومي وبرينسيبي", flag: "🇸🇹" },
  { code: "+240", name: "غينيا الاستوائية", flag: "🇬🇶" },
  { code: "+236", name: "جمهورية أفريقيا الوسطى", flag: "🇨🇫" },
  { code: "+211", name: "جنوب السودان", flag: "🇸🇸" },
  { code: "+251", name: "إثيوبيا", flag: "🇪🇹" },
  { code: "+253", name: "جيبوتي", flag: "🇩🇯" },
  { code: "+291", name: "إريتريا", flag: "🇪🇷" },
  { code: "+261", name: "مدغشقر", flag: "🇲🇬" },
  { code: "+262", name: "ريونيون", flag: "🇷🇪" },
  { code: "+269", name: "جزر القمر", flag: "🇰🇲" },
  { code: "+223", name: "مالي", flag: "🇲🇱" },
  { code: "+227", name: "النيجر", flag: "🇳🇪" },
  { code: "+220", name: "غامبيا", flag: "🇬🇲" },
  { code: "+222", name: "موريتانيا", flag: "🇲🇷" },
  { code: "+228", name: "توغو", flag: "🇹🇬" },
  { code: "+232", name: "سيراليون", flag: "🇸🇱" },
  { code: "+231", name: "ليبيريا", flag: "🇱🇷" },
  { code: "+504", name: "هندوراس", flag: "🇭🇳" },
  { code: "+502", name: "غواتيمالا", flag: "🇬🇹" },
  { code: "+503", name: "السلفادور", flag: "🇸🇻" },
  { code: "+505", name: "نيكاراغوا", flag: "🇳🇮" },
  { code: "+506", name: "كوستاريكا", flag: "🇨🇷" },
  { code: "+507", name: "بنما", flag: "🇵🇦" },
  { code: "+509", name: "هايتي", flag: "🇭🇹" },
  { code: "+51", name: "بيرو", flag: "🇵🇪" },
  { code: "+52", name: "المكسيك", flag: "🇲🇽" },
  { code: "+53", name: "كوبا", flag: "🇨🇺" },
  { code: "+54", name: "الأرجنتين", flag: "🇦🇷" },
  { code: "+56", name: "تشيلي", flag: "🇨🇱" },
  { code: "+57", name: "كولومبيا", flag: "🇨🇴" },
  { code: "+58", name: "فنزويلا", flag: "🇻🇪" },
  { code: "+591", name: "بوليفيا", flag: "🇧🇴" },
  { code: "+592", name: "غيانا", flag: "🇬🇾" },
  { code: "+593", name: "الإكوادور", flag: "🇪🇨" },
  { code: "+594", name: "غويانا الفرنسية", flag: "🇬🇫" },
  { code: "+595", name: "باراغواي", flag: "🇵🇾" },
  { code: "+596", name: "مارتينيك", flag: "🇲🇶" },
  { code: "+597", name: "سورينام", flag: "🇸🇷" },
  { code: "+598", name: "أوروغواي", flag: "🇺🇾" },
  { code: "+599", name: "كوراساو", flag: "🇨🇼" },
  { code: "+93", name: "أفغانستان", flag: "🇦🇫" },
  { code: "+374", name: "أرمينيا", flag: "🇦🇲" },
  { code: "+994", name: "أذربيجان", flag: "🇦🇿" },
  { code: "+973", name: "البحرين", flag: "🇧🇭" },
  { code: "+880", name: "بنجلاديش", flag: "🇧🇩" },
  { code: "+975", name: "بوتان", flag: "🇧🇹" },
  { code: "+673", name: "بروناي", flag: "🇧🇳" },
  { code: "+95", name: "ميانمار", flag: "🇲🇲" },
  { code: "+855", name: "كمبوديا", flag: "🇰🇭" },
  { code: "+86", name: "الصين", flag: "🇨🇳" },
  { code: "+357", name: "قبرص", flag: "🇨🇾" },
  { code: "+995", name: "جورجيا", flag: "🇬🇪" },
  { code: "+91", name: "الهند", flag: "🇮🇳" },
  { code: "+62", name: "إندونيسيا", flag: "🇮🇩" },
  { code: "+98", name: "إيران", flag: "🇮🇷" },
  { code: "+964", name: "العراق", flag: "🇮🇶" },
  { code: "+81", name: "اليابان", flag: "🇯🇵" },
  { code: "+962", name: "الأردن", flag: "🇯🇴" },
  { code: "+7", name: "كازاخستان", flag: "🇰🇿" },
  { code: "+965", name: "الكويت", flag: "🇰🇼" },
  { code: "+996", name: "قيرغيزستان", flag: "🇰🇬" },
  { code: "+856", name: "لاوس", flag: "🇱🇦" },
  { code: "+961", name: "لبنان", flag: "🇱🇧" },
  { code: "+60", name: "ماليزيا", flag: "🇲🇾" },
  { code: "+960", name: "المالديف", flag: "🇲🇻" },
  { code: "+976", name: "منغوليا", flag: "🇲🇳" },
  { code: "+95", name: "ميانمار", flag: "🇲🇲" },
  { code: "+977", name: "نيبال", flag: "🇳🇵" },
  { code: "+968", name: "عمان", flag: "🇴🇲" },
  { code: "+92", name: "باكستان", flag: "🇵🇰" },
  { code: "+63", name: "الفلبين", flag: "🇵🇭" },
  { code: "+974", name: "قطر", flag: "🇶🇦" },
  { code: "+966", name: "السعودية", flag: "🇸🇦" },
  { code: "+65", name: "سنغافورة", flag: "🇸🇬" },
  { code: "+82", name: "كوريا الجنوبية", flag: "🇰🇷" },
  { code: "+94", name: "سريلانكا", flag: "🇱🇰" },
  { code: "+963", name: "سوريا", flag: "🇸🇾" },
  { code: "+992", name: "طاجيكستان", flag: "🇹🇯" },
  { code: "+66", name: "تايلاند", flag: "🇹🇭" },
  { code: "+993", name: "تركمانستان", flag: "🇹🇲" },
  { code: "+971", name: "الإمارات", flag: "🇦🇪" },
  { code: "+998", name: "أوزبكستان", flag: "🇺🇿" },
  { code: "+84", name: "فيتنام", flag: "🇻🇳" },
  { code: "+967", name: "اليمن", flag: "🇾🇪" },
  { code: "+376", name: "أندورا", flag: "🇦🇩" },
  { code: "+244", name: "أنغولا", flag: "🇦🇴" },
  { code: "+1", name: "الولايات المتحدة / كندا", flag: "🇺🇸" },
  { code: "+61", name: "أستراليا", flag: "🇦🇺" },
  { code: "+43", name: "النمسا", flag: "🇦🇹" },
  { code: "+973", name: "البحرين", flag: "🇧🇭" },
  { code: "+32", name: "بلجيكا", flag: "🇧🇪" },
  { code: "+591", name: "بوليفيا", flag: "🇧🇴" },
  { code: "+387", name: "البوسنة والهرسك", flag: "🇧🇦" },
  { code: "+55", name: "البرازيل", flag: "🇧🇷" },
  { code: "+359", name: "بلغاريا", flag: "🇧🇬" },
  { code: "+237", name: "الكاميرون", flag: "🇨🇲" },
  { code: "+56", name: "تشيلي", flag: "🇨🇱" },
  { code: "+86", name: "الصين", flag: "🇨🇳" },
  { code: "+57", name: "كولومبيا", flag: "🇨🇴" },
  { code: "+506", name: "كوستاريكا", flag: "🇨🇷" },
  { code: "+385", name: "كرواتيا", flag: "🇭🇷" },
  { code: "+357", name: "قبرص", flag: "🇨🇾" },
  { code: "+420", name: "جمهورية التشيك", flag: "🇨🇿" },
  { code: "+45", name: "الدنمارك", flag: "🇩🇰" },
  { code: "+593", name: "الإكوادور", flag: "🇪🇨" },
  { code: "+503", name: "السلفادور", flag: "🇸🇻" },
  { code: "+372", name: "إستونيا", flag: "🇪🇪" },
  { code: "+358", name: "فنلندا", flag: "🇫🇮" },
  { code: "+33", name: "فرنسا", flag: "🇫🇷" },
  { code: "+220", name: "غامبيا", flag: "🇬🇲" },
  { code: "+995", name: "جورجيا", flag: "🇬🇪" },
  { code: "+49", name: "ألمانيا", flag: "🇩🇪" },
  { code: "+233", name: "غانا", flag: "🇬🇭" },
  { code: "+30", name: "اليونان", flag: "🇬🇷" },
  { code: "+502", name: "غواتيمالا", flag: "🇬🇹" },
  { code: "+224", name: "غينيا", flag: "🇬🇳" },
  { code: "+509", name: "هايتي", flag: "🇭🇹" },
  { code: "+504", name: "هندوراس", flag: "🇭🇳" },
  { code: "+36", name: "هنغاريا", flag: "🇭🇺" },
  { code: "+354", name: "آيسلندا", flag: "🇮🇸" },
  { code: "+91", name: "الهند", flag: "🇮🇳" },
  { code: "+62", name: "إندونيسيا", flag: "🇮🇩" },
  { code: "+98", name: "إيران", flag: "🇮🇷" },
  { code: "+353", name: "أيرلندا", flag: "🇮🇪" },
  { code: "+39", name: "إيطاليا", flag: "🇮🇹" },
  { code: "+1", name: "جامايكا", flag: "🇯🇲" },
  { code: "+81", name: "اليابان", flag: "🇯🇵" },
  { code: "+962", name: "الأردن", flag: "🇯🇴" },
  { code: "+7", name: "كازاخستان", flag: "🇰🇿" },
  { code: "+254", name: "كينيا", flag: "🇰🇪" },
  { code: "+965", name: "الكويت", flag: "🇰🇼" },
  { code: "+996", name: "قيرغيزستان", flag: "🇰🇬" },
  { code: "+371", name: "لاتفيا", flag: "🇱🇻" },
  { code: "+961", name: "لبنان", flag: "🇱🇧" },
  { code: "+218", name: "ليبيا", flag: "🇱🇾" },
  { code: "+370", name: "ليتوانيا", flag: "🇱🇹" },
  { code: "+352", name: "لوكسمبورغ", flag: "🇱🇺" },
  { code: "+261", name: "مدغشقر", flag: "🇲🇬" },
  { code: "+265", name: "مالاوي", flag: "🇲🇼" },
  { code: "+60", name: "ماليزيا", flag: "🇲🇾" },
  { code: "+960", name: "المالديف", flag: "🇲🇻" },
  { code: "+223", name: "مالي", flag: "🇲🇱" },
  { code: "+356", name: "مالطا", flag: "🇲🇹" },
  { code: "+222", name: "موريتانيا", flag: "🇲🇷" },
  { code: "+230", name: "موريشيوس", flag: "🇲🇺" },
  { code: "+52", name: "المكسيك", flag: "🇲🇽" },
  { code: "+377", name: "موناكو", flag: "🇲🇨" },
  { code: "+976", name: "منغوليا", flag: "🇲🇳" },
  { code: "+382", name: "الجبل الأسود", flag: "🇲🇪" },
  { code: "+212", name: "المغرب", flag: "🇲🇦" },
  { code: "+258", name: "موزمبيق", flag: "🇲🇿" },
  { code: "+264", name: "ناميبيا", flag: "🇳🇦" },
  { code: "+977", name: "نيبال", flag: "🇳🇵" },
  { code: "+31", name: "هولندا", flag: "🇳🇱" },
  { code: "+64", name: "نيوزيلندا", flag: "🇳🇿" },
  { code: "+505", name: "نيكاراغوا", flag: "🇳🇮" },
  { code: "+227", name: "النيجر", flag: "🇳🇪" },
  { code: "+234", name: "نيجيريا", flag: "🇳🇬" },
  { code: "+389", name: "مقدونيا الشمالية", flag: "🇲🇰" },
  { code: "+47", name: "النرويج", flag: "🇳🇴" },
  { code: "+968", name: "عمان", flag: "🇴🇲" },
  { code: "+92", name: "باكستان", flag: "🇵🇰" },
  { code: "+507", name: "بنما", flag: "🇵🇦" },
  { code: "+675", name: "بابوا غينيا الجديدة", flag: "🇵🇬" },
  { code: "+595", name: "باراغواي", flag: "🇵🇾" },
  { code: "+51", name: "بيرو", flag: "🇵🇪" },
  { code: "+63", name: "الفلبين", flag: "🇵🇭" },
  { code: "+48", name: "بولندا", flag: "🇵🇱" },
  { code: "+351", name: "البرتغال", flag: "🇵🇹" },
  { code: "+974", name: "قطر", flag: "🇶🇦" },
  { code: "+40", name: "رومانيا", flag: "🇷🇴" },
  { code: "+7", name: "روسيا", flag: "🇷🇺" },
  { code: "+250", name: "رواندا", flag: "🇷🇼" },
  { code: "+966", name: "السعودية", flag: "🇸🇦" },
  { code: "+221", name: "السنغال", flag: "🇸🇳" },
  { code: "+381", name: "صربيا", flag: "🇷🇸" },
  { code: "+65", name: "سنغافورة", flag: "🇸🇬" },
  { code: "+421", name: "سلوفاكيا", flag: "🇸🇰" },
  { code: "+386", name: "سلوفينيا", flag: "🇸🇮" },
  { code: "+252", name: "الصومال", flag: "🇸🇴" },
  { code: "+27", name: "جنوب أفريقيا", flag: "🇿🇦" },
  { code: "+82", name: "كوريا الجنوبية", flag: "🇰🇷" },
  { code: "+34", name: "إسبانيا", flag: "🇪🇸" },
  { code: "+94", name: "سريلانكا", flag: "🇱🇰" },
  { code: "+249", name: "السودان", flag: "🇸🇩" },
  { code: "+46", name: "السويد", flag: "🇸🇪" },
  { code: "+41", name: "سويسرا", flag: "🇨🇭" },
  { code: "+963", name: "سوريا", flag: "🇸🇾" },
  { code: "+886", name: "تايوان", flag: "🇹🇼" },
  { code: "+992", name: "طاجيكستان", flag: "🇹🇯" },
  { code: "+255", name: "تنزانيا", flag: "🇹🇿" },
  { code: "+66", name: "تايلاند", flag: "🇹🇭" },
  { code: "+228", name: "توغو", flag: "🇹🇬" },
  { code: "+1", name: "ترينيداد وتوباغو", flag: "🇹🇹" },
  { code: "+216", name: "تونس", flag: "🇹🇳" },
  { code: "+90", name: "تركيا", flag: "🇹🇷" },
  { code: "+993", name: "تركمانستان", flag: "🇹🇲" },
  { code: "+256", name: "أوغندا", flag: "🇺🇬" },
  { code: "+380", name: "أوكرانيا", flag: "🇺🇦" },
  { code: "+971", name: "الإمارات", flag: "🇦🇪" },
  { code: "+44", name: "المملكة المتحدة", flag: "🇬🇧" },
  { code: "+1", name: "الولايات المتحدة", flag: "🇺🇸" },
  { code: "+598", name: "أوروغواي", flag: "🇺🇾" },
  { code: "+998", name: "أوزبكستان", flag: "🇺🇿" },
  { code: "+58", name: "فنزويلا", flag: "🇻🇪" },
  { code: "+84", name: "فيتنام", flag: "🇻🇳" },
  { code: "+967", name: "اليمن", flag: "🇾🇪" },
  { code: "+260", name: "زامبيا", flag: "🇿🇲" },
  { code: "+263", name: "زيمبابوي", flag: "🇿🇼" },
];

export function RegistrationForm({
  lang,
  selected,
  setSelected,
}: {
  lang: Lang;
  selected: Lang;
  setSelected: (l: Lang) => void;
}) {
  const tr = t[lang];
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("+90");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const schema = z.object({
    name: z.string().trim().min(2, tr.form.errName).max(100),
    email: z.string().trim().email(tr.form.errEmail).max(255),
    phone: z.string().trim().regex(/^[0-9]{6,15}$/, tr.form.errPhone),
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, email, phone });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: parsed.data.name,
          email: parsed.data.email,
          whatsapp_number: `${code}${parsed.data.phone}`,
          selected_language: selected,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      setStep(2);
    } catch (err) {
      setErrors({ form: 'Failed to register. Please try again.' });
      console.error(err);
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `${tr.brand} — ${tr.tagline}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gold/25 bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-gold";

  return (
    <section id="register" className="mx-auto max-w-3xl scroll-mt-20 px-4 py-14 sm:px-8 sm:py-24">
      <div className="text-center">
        <div className="flex justify-center">
          <SectionLabel>{tr.form.label}</SectionLabel>
        </div>
        <h2 className="text-3xl font-semibold text-primary sm:text-4xl">{tr.form.title}</h2>
      </div>

      <ol className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {tr.form.steps.map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <span
              className={`grid h-8 w-8 place-items-center rounded-full text-xs transition-colors ${
                i <= step
                  ? "bg-primary text-primary-foreground"
                  : "border border-gold/30 text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <span className="hidden text-xs tracking-wide text-muted-foreground sm:inline">{s}</span>
            {i < tr.form.steps.length - 1 && <span className="h-px w-5 gold-rule sm:w-8" />}
          </li>
        ))}
      </ol>

      <div className="glass mt-8 rounded-2xl p-5 sm:p-9">
        {step === 0 && (
          <div>
            <p className="text-sm text-muted-foreground">{tr.form.lang}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setSelected(l.code)}
                  className={`rounded-2xl border px-4 py-5 text-center transition-colors ${
                    selected === l.code
                      ? "border-gold bg-secondary text-primary"
                      : "border-gold/25 text-muted-foreground hover:text-primary"
                  }`}
                >
                  <span className="block font-serif text-xl">{l.native}</span>
                  <span className="mt-1 block text-[10px] tracking-[0.2em]">{l.label}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mt-7 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02]"
            >
              {tr.form.next}
            </button>
          </div>
        )}

        {step === 1 && (
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="text-xs tracking-wide text-muted-foreground" htmlFor="rq-name">
                {tr.form.name}
              </label>
              <input
                id="rq-name"
                className={`mt-2 ${inputClass}`}
                value={name}
                maxLength={100}
                onChange={(e) => setName(e.target.value)}
              />
              {errors["name"] && <p className="mt-1 text-xs text-destructive">{errors["name"]}</p>}
            </div>
            <div>
              <label className="text-xs tracking-wide text-muted-foreground" htmlFor="rq-email">
                {tr.form.email}
              </label>
              <input
                id="rq-email"
                type="email"
                dir="ltr"
                className={`mt-2 ${inputClass}`}
                value={email}
                maxLength={255}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors["email"] && <p className="mt-1 text-xs text-destructive">{errors["email"]}</p>}
            </div>
            <div>
              <label className="text-xs tracking-wide text-muted-foreground" htmlFor="rq-phone">
                {tr.form.whatsapp}
              </label>
              <div className="mt-2 flex gap-2" dir="ltr">
                {/* حقل إدخال رمز الدولة مع Datalist للبحث */}
                <input
                  id="rq-code"
                  list="country-list"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-32 shrink-0 rounded-xl border border-gold/25 bg-background px-3 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-gold"
                  placeholder="+90"
                />
                <datalist id="country-list">
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code} – {c.name}
                    </option>
                  ))}
                </datalist>

                <input
                  id="rq-phone"
                  inputMode="numeric"
                  className={`flex-1 ${inputClass}`}
                  value={phone}
                  maxLength={15}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                />
              </div>
              {errors["phone"] && <p className="mt-1 text-xs text-destructive">{errors["phone"]}</p>}
            </div>            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02]"
              >
                {tr.form.submit}
              </button>
              <button
                type="button"
                onClick={() => setStep(0)}
                className="rounded-full border border-gold/30 px-6 py-3.5 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {tr.form.back}
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div className="text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full gradient-emerald shadow-elegant">
              <Check className="h-6 w-6 text-primary-foreground" />
            </span>
            <h3 className="mt-5 text-2xl font-semibold text-primary">{tr.form.successTitle}</h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              {tr.form.successBody}
            </p>
            <span className="mx-auto mt-7 block h-px w-24 gold-rule" />
            <p className="mt-6 text-xs uppercase tracking-[0.22em] text-gold">{tr.form.share}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground"
              >
                <Share2 className="h-4 w-4" /> WhatsApp
              </a>
              <a
                href={`https://telegram.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-5 py-2.5 text-sm text-primary"
              >
                <Share2 className="h-4 w-4" /> Telegram
              </a>
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-5 py-2.5 text-sm text-primary"
              >
                <Copy className="h-4 w-4" /> {copied ? tr.form.copied : tr.form.copy}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}