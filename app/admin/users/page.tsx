"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const users = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", lastLogin: "2023-06-01" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Moderator", lastLogin: "2023-06-02" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "User", lastLogin: "2023-06-03" },
  { id: "4", name: "Alice Brown", email: "alice@example.com", role: "Moderator", lastLogin: "2023-06-04" },
  { id: "5", name: "Charlie Davis", email: "charlie@example.com", role: "User", lastLogin: "2023-06-05" },
]

export default function AdminUsers() {
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

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search users..." className="w-64" />
          <Button>Add User</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort("id")} className="cursor-pointer">
              ID <ArrowUpDown className="ml-2 h-4 w-4" />
            </TableHead>
            <TableHead onClick={() => handleSort("name")} className="cursor-pointer">
              Name <ArrowUpDown className="ml-2 h-4 w-4" />
            </TableHead>
            <TableHead onClick={() => handleSort("email")} className="cursor-pointer">
              Email <ArrowUpDown className="ml-2 h-4 w-4" />
            </TableHead>
            <TableHead onClick={() => handleSort("role")} className="cursor-pointer">
              Role <ArrowUpDown className="ml-2 h-4 w-4" />
            </TableHead>
            <TableHead onClick={() => handleSort("lastLogin")} className="cursor-pointer">
              Last Login <ArrowUpDown className="ml-2 h-4 w-4" />
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.lastLogin}</TableCell>
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
                    <DropdownMenuItem>Edit user</DropdownMenuItem>
                    <DropdownMenuItem>Change role</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Delete user</DropdownMenuItem>
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

