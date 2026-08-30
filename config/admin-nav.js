import {
  Home,
  Mail,
  Layers,
  Sparkles,
  MessageSquare,
  HelpCircle,
  DollarSign,
  Users,
  ImageIcon,
  Settings,
} from "lucide-react";

const adminNavGroups = [
  {
    label: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: Home },
      { href: "/admin/leads", label: "Leads", icon: Mail },
    ],
  },
  {
    label: "Content Management",
    items: [
      { href: "/admin/services", label: "Services", icon: Sparkles },
      { href: "/admin/projects", label: "Work", icon: Layers },
      { href: "/admin/pricing", label: "Pricing", icon: DollarSign },
      { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
      { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
    ],
  },
  {
    label: "Studio System",
    items: [
      { href: "/admin/media", label: "Media Library", icon: ImageIcon },
      { href: "/admin/team", label: "Team", icon: Users },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export default adminNavGroups;
