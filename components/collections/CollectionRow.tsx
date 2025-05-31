// Bu bileşen, bir koleksiyon tablosundaki tek bir satırı temsil eder ve koleksiyon bilgilerini görüntüler.
import Link from "next/link"
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Collection } from '../../types/collection';

export default function CollectionRow({ col }: { col: Collection }) {
  return (
    <TableRow 
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        '&:hover': { backgroundColor: '#f5f5f5' } 
      }}
    >
      <TableCell component="th" scope="row">
        {col.info?.name}
      </TableCell>
      <TableCell dangerouslySetInnerHTML={{ __html: col.info?.description || "" }} />
      <TableCell>Satış Kanalı - {col.salesChannelId || "-"}</TableCell>
      <TableCell>
        <Link href={`/edit?id=${col.id}`} className="text-blue-600 hover:underline">🖉</Link>
      </TableCell>
    </TableRow>
  )
}
