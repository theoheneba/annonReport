"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

const reports = [
  {
    id: "1",
    category: "Workplace Harassment",
    status: "Pending",
    dateSubmitted: "2023-06-01",
  },
  {
    id: "2",
    category: "Financial Fraud",
    status: "Investigating",
    dateSubmitted: "2023-06-02",
  },
  {
    id: "3",
    category: "Corruption",
    status: "Resolved",
    dateSubmitted: "2023-06-03",
  },
  // Add more mock data as needed
]

export default function AdminReports() {
  const [sortColumn, setSortColumn] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedReports = [...reports].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reports</h1>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search reports..." className="w-64" />
          <Button>Export</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort("id")} className="cursor-pointer">
              ID <ArrowUpDown className="ml-2 h-4 w-4" />
            </TableHead>
            <TableHead onClick={() => handleSort("category")} className="cursor-pointer">
              Category <ArrowUpDown className="ml-2 h-4 w-4" />
            </TableHead>
            <TableHead onClick={() => handleSort("status")} className="cursor-pointer">
              Status <ArrowUpDown className="ml-2 h-4 w-4" />
            </TableHead>
            <TableHead onClick={() => handleSort("dateSubmitted")} className="cursor-pointer">
              Date Submitted <ArrowUpDown className="ml-2 h-4 w-4" />
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedReports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.id}</TableCell>
              <TableCell>{report.category}</TableCell>
              <TableCell>{report.status}</TableCell>
              <TableCell>{report.dateSubmitted}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Update status</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Delete report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

