'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editPackage, getPackages } from "@/services/packages";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/store/useStore";

export default function Edit({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const increasePopulation = useStore((state) => state.increasePopulation);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    getPackages(id)
      .then((res) => {
        setName(res.data?.package_name ?? "");
        setDesc(res.data?.package_description ?? "");
        setPrice(res.data?.package_price ?? 0);
        setDuration(res.data?.package_duration ?? 0);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleEdit = async () => {
    try {
      setLoading(true);
      // Validasi input tidak boleh kosong
      if (!name.trim()) {
        alert("Name cannot be empty");
        setLoading(false);
        return;
      }

      if (!desc.trim()) {
        alert("Description cannot be empty");
        setLoading(false);
        return;
      }

      if (price <= 0) {
        alert("Price must be greater than 0");
        setLoading(false);
        return;
      }

      if (duration <= 0) {
        alert("Duration must be greater than 0");
        setLoading(false);
        return;
      }
      const res = await editPackage(id, {
        package_name: name,
        package_description: desc,
        package_duration: duration,
        package_price: price,
      });
      if (res.responseResult) {
        increasePopulation();
        router.push("/dashboard");
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg">Edit Packages</p>
        <Button onClick={handleEdit} disabled={loading}>
          {loading ? "Loading..." : "Save"}
        </Button>
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
            onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
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
            onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
          />
        </div>
      </Card>
    </div>
  );
}
