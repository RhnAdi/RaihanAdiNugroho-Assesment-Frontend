'use client'

import TableContent from "@/components/moleculs/TableContent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { deletePackage, getPackagesList } from "@/services/packages";
import useStore from "@/store/useStore";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const columnHelper = createColumnHelper<BannerAdsPackage & { action: string }>()


export default function Packages(){
  const router = useRouter()
  const { bears, increasePopulation } = useStore()
  const { data } = useQuery({
    queryKey: ['BannerAdsPackage', bears],
    queryFn: getPackagesList
  })

  const handleDelete = async (id: string) => {
    try {
      const cekDelete = confirm(`Are you sure to delete package ${id}?`)
      if(cekDelete){
        await deletePackage(id)
        increasePopulation()
      }
    } catch(e) {
      console.log(e)
    }
  }
  
  const columns = [
    columnHelper.accessor('id_banner_ads_package', {
      cell: info => info.row.index + 1,
      header: '#'
    }),
    columnHelper.accessor('package_name', {
      cell: info => info.getValue(),
      header: 'Name'
    }),
    columnHelper.accessor('package_description', {
      cell: info => info.getValue(),
      header: 'Description'
    }),
    columnHelper.accessor('package_price', {
      cell: info => info.getValue(),
      header: 'Price'
    }),
    columnHelper.accessor('package_duration', {
      cell: info => info.getValue(),
      header: 'Duration'
    }),
    columnHelper.accessor('package_is_active', {
      cell: info => info.getValue() ? "Active" : "Non-Active",
      header: 'Active'
    }),
    columnHelper.accessor('created_at', {
      cell: info => info.getValue(),
      header: 'Created At'
    }),
    columnHelper.accessor('action', {
      cell: info => {
        return(
          <div className="flex gap-x-2">
            <Button className="bg-amber-400" onClick={() => router.push(`/edit/${info.row.original.id_banner_ads_package}`)}>
              <PencilIcon />
            </Button>
            <Button className="bg-red-500" onClick={() => handleDelete(info.row.original.id_banner_ads_package)}>
              <TrashIcon />
            </Button>
          </div>
        )
      },
      header: 'Action'
    }),
  ]
  
  return(
    <div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">Packages</p>
        <Button onClick={() => router.push('/add')}>+ Add</Button>
      </div>
      <Card className="p-4 mt-4">
        <TableContent 
          data={data?.data as []} 
          columns={columns}
        />
      </Card>
    </div>
  )
}