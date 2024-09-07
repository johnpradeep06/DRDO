import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

export const Applicants:React.FC = () => {
  return (
    <Table>
  <TableCaption>A List of Candidates Information </TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">SI_NO</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Domain</TableHead>
      <TableHead className="text-right">Work Expirenece</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">S001</TableCell>
      <TableCell>Active</TableCell>
      <TableCell>AI/ML</TableCell>
      <TableCell className="text-right">5 Years</TableCell>
    </TableRow>
  </TableBody>
</Table>

  );
};
