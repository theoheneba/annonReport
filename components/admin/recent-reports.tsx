import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const recentReports = [
  {
    id: "1",
    category: "Corruption",
    status: "Pending",
    date: "2023-06-01",
  },
  {
    id: "2",
    category: "Fraud",
    status: "Investigating",
    date: "2023-06-02",
  },
  {
    id: "3",
    category: "Misconduct",
    status: "Resolved",
    date: "2023-06-03",
  },
  {
    id: "4",
    category: "Harassment",
    status: "Pending",
    date: "2023-06-04",
  },
  {
    id: "5",
    category: "Discrimination",
    status: "Investigating",
    date: "2023-06-05",
  },
]

export function RecentReports() {
  return (
    <div className="space-y-8">
      {recentReports.map((report) => (
        <div key={report.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{report.category[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{report.category}</p>
            <p className="text-sm text-muted-foreground">
              {report.status} - {report.date}
            </p>
          </div>
          <div className="ml-auto font-medium">#{report.id}</div>
        </div>
      ))}
    </div>
  )
}

