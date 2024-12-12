"use client"

import { useState , useEffect} from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import TeamModal from "@/components/Modal/AuthModal/TeamModal"
import { useModalTeam } from "@/hooks/useModalTeam"
import { FiPlus } from "react-icons/fi";
import { collection, getDocs, onSnapshot } from "firebase/firestore"
import { db } from "@/firebase/clientApp"

type Team = {
  id: string,
  name: string,
  image: string,
  description: string,
}
export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]



function Page({ params }: { params: { uid: string } }) {

  const { uid } = params;
  const [teams, setTeams] = useState<Team[]>([]);
  const { onOpen } = useModalTeam();

  useEffect(() => {
    const teamRef = collection(db, `Teams/users/${uid}`);

    // Écoute en temps réel
    const unsubscribe = onSnapshot(teamRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Team[];
      setTeams(data);
    });

    // Nettoyer l'abonnement pour éviter les fuites de mémoire
    return () => unsubscribe();
  }, [uid]);

  return (
    <main className="w-full overflow-x-auto p-4">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <Input
          placeholder="Search..."
          className="w-full sm:w-1/2 bg-white border border-gray-300 rounded-lg p-2"
        />
        <Button
          variant="outline"
          className="w-full sm:w-auto text-white bg-blue-400 hover:bg-blue-500 hover:brightness-110 
                   hover:text-white border-none text-center p-2 rounded-lg"
          onClick={onOpen}
        >
          <FiPlus />
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-white rounded-lg border-collapse text-gray-800">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-4 text-left uppercase">Name</th>
              <th className="p-4 text-left uppercase">Description</th>
              <th className="p-4 text-left uppercase">Image</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr
                key={team.id}
                className="border-b last:border-none hover:bg-gray-100"
              >
                <td className="p-4">{team.name}</td>
                <td className="p-4">{team.description}</td>
                <td className="p-4">
                  <img
                    src={team.image}
                    alt={team.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TeamModal />
    </main>
  );
}

export default Page;
