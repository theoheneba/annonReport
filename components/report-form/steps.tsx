import { Shield, FileText, AlertCircle, Ban, Clock, Files, HelpCircle } from "lucide-react"

export const reportCategories = [
  {
    id: "corruption",
    label: "Corruption",
    icon: Shield,
  },
  {
    id: "fraud",
    label: "Fraud",
    icon: FileText,
  },
  {
    id: "misconduct",
    label: "Misconduct",
    icon: AlertCircle,
  },
  {
    id: "harassment",
    label: "Harassment",
    icon: Ban,
  },
  {
    id: "discrimination",
    label: "Discrimination",
    icon: Clock,
  },
  {
    id: "environmental",
    label: "Environmental",
    icon: Files,
  },
  {
    id: "other",
    label: "Other",
    icon: HelpCircle,
  },
] as const

export const formSteps = [
  { id: "category", label: "Category" },
  { id: "details", label: "Details" },
  { id: "evidence", label: "Evidence" },
  { id: "review", label: "Review" },
] as const

