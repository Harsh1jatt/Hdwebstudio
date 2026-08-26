import {
  Home,
  Mail,
  BarChart3,
  Layers,
  Sparkles,
  BookOpen,
  Play,
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
      { href: "/admin/seo", label: "SEO", icon: BarChart3 },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/blog", label: "Blog", icon: BookOpen },
      { href: "/admin/services", label: "Services", icon: Sparkles },
      { href: "/admin/projects", label: "Projects", icon: Layers },
      { href: "/admin/stories", label: "Stories", icon: Play },
    ],
  },
  {
    label: "Business",
    items: [
      { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
      { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
      { href: "/admin/pricing", label: "Pricing", icon: DollarSign },
      { href: "/admin/team", label: "Team", icon: Users },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/media", label: "Media", icon: ImageIcon },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export default adminNavGroups;
