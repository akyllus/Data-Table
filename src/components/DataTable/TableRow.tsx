import React from 'react';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { TableCell, TableRow as UITableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Column {
  key: string;
  label: string;
  visible: boolean;
}

interface DataItem {
  id: number;
  [key: string]: any;
}

interface TableRowProps {
  record: DataItem;
  columns: Column[];
  onEdit: (record: DataItem) => void;
  onDelete: (record: DataItem) => void;
}

export function TableRow({ record, columns, onEdit, onDelete }: TableRowProps) {
  const getStatusVariant = (status: string): 'default' | 'success' | 'warning' | 'destructive' => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'inactive':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <UITableRow>
      {columns
        .filter((col) => col.visible)
        .map((column) => (
          <TableCell key={`${record.id}-${column.key}`}>
            {column.key === 'status' ? (
              <Badge variant={getStatusVariant(record.status)}>
                {record.status}
              </Badge>
            ) : column.key === 'lastUpdated' ? (
              new Date(record.lastUpdated).toLocaleString()
            ) : (
              record[column.key]
            )}
          </TableCell>
        ))}
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(record)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(record)}
              className="text-destructive"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </UITableRow>
  );
}