import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Category, { ICategory } from "@/lib/database/models/category.model"
import { startTransition, useEffect, useState } from "react"
import { Input } from "../ui/input"
import {
  createdCategory,
  getAllCategories,
} from "@/lib/actions/category.actions"

type DropdownProps = {
  value?: string
  onChangeHandler?: () => void
}

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [newCategory, setNewCategory] = useState("")

  const handleAddCategory = () => {
    createdCategory({
      categoryName: newCategory.trim(),
    }).then((category) => {
      setCategories((prevState) => [...prevState, category])
    })
  }

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories()
      categoryList && setCategories(categoryList as ICategory[])
    }
    getCategories()
  }, [])

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="bg-gray-50">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id}
              className="bg-gray-50 p-regular-14"
            >
              {category.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-purple-700 hover:bg-primary-50 focus:text-purple-700">
            Add New Category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  className="bg-gray-50 mt-3"
                  type="text"
                  placeholder="Category Name"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  )
}

export default Dropdown
