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
  Bot,
  Activity,
  Search,
} from "lucide-react";

const adminNavGroups = [
  {
    label: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: Home },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/services", label: "Services", icon: Sparkles },
      { href: "/admin/blog", label: "Blog", icon: BookOpen },
      { href: "/admin/projects", label: "Work", icon: Layers },
      { href: "/admin/stories", label: "Stories", icon: Play },
      { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
      { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
    ],
  },
  {
    label: "Growth",
    items: [
      { href: "/admin/leads", label: "Leads", icon: Mail },
      { href: "/admin/seo", label: "SEO & Audits", icon: BarChart3 },
    ],
  },
  {
    label: "AI",
    items: [
      { href: "/admin/chat", label: "HD AI Command", icon: Bot },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/media", label: "Media", icon: ImageIcon },
      { href: "/admin/pricing", label: "Pricing", icon: DollarSign },
      { href: "/admin/team", label: "Team", icon: Users },
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export default adminNavGroups;
