import {useState} from 'react'
import TableComponent from "../Components/TableComponents/TableComponent"
import CreateNoteForm from "../Components/Forms/CreateNoteForm"
import {FC} from "react"
import Button from "../UIKit/Button/Button";

const Layout: FC = () => {
  const [isCreateFromOpen, setIsCreateFromOpen] = useState<boolean>(false)

  return (
    <>
      <TableComponent
        headers={[
          "Name",
          "Created",
          "Category",
          "Content",
          "Dates",
          " ",
          <div className="w-7 h-7 bg-archive-white"/>,
          <div className="w-7 h-7 bg-remove-white"/>
        ]}
        tableShowFor='unarchived'

      />
      <div className="flex justify-end my-1.5" >
        <Button
          className="cursor-pointer rounded-sm p-1 border-2 border-my-grey"
          type={'button'}
          label={'Create Note'}
          onClick={() => setIsCreateFromOpen(true)}/>
      </div>
      {isCreateFromOpen && <CreateNoteForm setIsCreateFromOpen={setIsCreateFromOpen}/>}

      <TableComponent
        headers={[
          "Name",
          "Created",
          "Category",
          "Content",
          "Dates",
          <div className="w-7 h-7 bg-unarchive"/>
        ]}
        tableShowFor='archived'
      />

      <TableComponent
        headers={[
          "Note Category",
          "Active",
          "Archived"
        ]}
        tableShowFor='summary'
      />

    </>
  )
}

export default Layout