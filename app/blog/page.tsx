import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const blogPosts = [
  {
    id: "1",
    title: "Introduction to Anonymous Reporting",
    author: "John Doe",
    publishDate: "2023-06-01",
    excerpt: "Learn about the importance of anonymous reporting in maintaining workplace integrity...",
  },
  {
    id: "2",
    title: "The Importance of Whistleblowing",
    author: "Jane Smith",
    publishDate: "2023-06-05",
    excerpt: "Whistleblowing plays a crucial role in exposing corruption and wrongdoing. In this post, we explore...",
  },
  {
    id: "3",
    title: "Protecting Whistleblowers: Best Practices",
    author: "Bob Johnson",
    publishDate: "2023-06-10",
    excerpt: "Ensuring the safety and anonymity of whistleblowers is paramount. Here are some best practices...",
  },
]

export default function BlogPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-10">Ghana Report Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center text-sm">
                <span>{post.author}</span>
                <span>{post.publishDate}</span>
              </div>
              <Link href={`/blog/${post.id}`} className="mt-4 inline-block text-blue-600 hover:underline">
                Read more
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

