'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addPackage } from "@/services/packages";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/store/useStore";

export default function Add(){
  const router = useRouter()
  const increasePopulation = useStore(state => state.increasePopulation)
  const [loading, setLoading] = useState<boolean>()
  const [name, setName] = useState<string>()
  const [desc, setDesc] = useState<string>()
  const [price, setPrice] = useState<number>()
  const [duration, setDuration] = useState<number>()

  const handleAdd = async () => {
    try {
      setLoading(true)
      if(!name || !desc || !price || !duration) return
      const res = await addPackage({
        package_name: name,
        package_description: desc,
        package_duration: duration,
        package_price: price
      })
      if(res.responseResult){
        increasePopulation()
        router.push("/dashboard")
      }
      setLoading(false)
    } catch(e){
      console.log(e)
      setLoading(false)
    }
  }

  return(
    <div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">Add Packages</p>
        <Button onClick={handleAdd} disabled={loading}>{loading ? "Loading..." : "Save"}</Button>
      </div>
      <Card className="p-4 mt-4">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Input name..."
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="desc">Description</Label>
          <Input
            id="desc"
            type="text"
            placeholder="Input Description..."
            required
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            placeholder="Input Price..."
            required
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            type="number"
            placeholder="Input Duration..."
            required
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
          />
        </div>
      </Card>
    </div>
  )
}