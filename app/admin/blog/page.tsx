"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const blogPosts = [
  { id: "1", title: "Introduction to Anonymous Reporting", author: "John Doe", publishDate: "2023-06-01" },
  { id: "2", title: "The Importance of Whistleblowing", author: "Jane Smith", publishDate: "2023-06-05" },
  { id: "3", title: "Protecting Whistleblowers: Best Practices", author: "Bob Johnson", publishDate: "2023-06-10" },
]

export default function AdminBlog() {
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

  const sortedPosts = [...blogPosts].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <div className="flex items-center space-x-2">
          <Input placeholder="Search posts..." className="w-64" />
          <Button asChild>
            <Link href="/admin/blog/new">New Post</Link>
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort("id")} className="cursor-pointer">
              ID <ArrowUpDown className="ml-2 h-4 w-4" />
            </TableHead>
            <TableHead onClick={() => handleSort("title")} className="cursor-pointer">
              Title <ArrowUpDown className="ml-2 h-4 w-4" />
            </TableHead>
            <TableHead onClick={() => handleSort("author")} className="cursor-pointer">
              Author <ArrowUpDown className="ml-2 h-4 w-4" />
            </TableHead>
            <TableHead onClick={() => handleSort("publishDate")} className="cursor-pointer">
              Publish Date <ArrowUpDown className="ml-2 h-4 w-4" />
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPosts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>{post.publishDate}</TableCell>
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
                    <DropdownMenuItem>Edit post</DropdownMenuItem>
                    <DropdownMenuItem>View post</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Delete post</DropdownMenuItem>
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

